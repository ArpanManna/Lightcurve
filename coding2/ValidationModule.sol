// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {BaseAuthorizationModule} from "./BaseAuthorizationModule.sol";

contract ValidationModule is BaseAuthorizationModule {
    string public constant NAME = "Validation Module";
    string public constant VERSION = "0.0.1";
    uint256 public ONE_DAY = 24 hours;

    // Maintain Spending limit of each token associated with the Smart Account 
    struct Limit {
        uint256 limit;              // total spend limit
        uint256 availableToSpend;   // token available to spend
        bool isEnabled;             // spending featute enabled or disabled
    }

    // Maintain Transacition limit of Smart Account in 24 hour duration
    struct Tx{
        uint limit;                 // total transaction limit
        uint txAvailable;           // remaining transaction count
        uint resetTime;             // UNIX time after which counter reset
        bool isEnabled;             // keep track of contract Initializaion
    }

    mapping(address => Tx) internal _transactionLimits;
    mapping(address => mapping(address => uint)) internal _spendingLimits;

    error AlreadyInitedForSmartAccount(address smartAccount);


    /**
        Smart contract account calls this function with msg.sender as smart account address
        It updates the relevant storage for the msg sender, It could be ownership information as mentioned in ECDSAOwnsership Module.
        The function signature of this method will be used as moduleSetupData in Account Factory
    */
    function initForSmartAccount(uint transactionLimit) {
        if (_transactionLimits[msg.sender].isEnabled){
            revert AlreadyInitedForSmartAccount(msg.sender);
        }
        _transactionLimits[msg.sender].isEnabled = true;
        _transactionLimits[msg.sender].Limit = transactionLimit;
        _transactionLimits[msg.sender].txAvailable = transactionLimit;
        return address(this);
    }


    function setSpendLimit( address smartAccount, address tokenAddress, uint256 amount) public {
        require(amount > 0, "Invalid amount");
        if(_spendingLimits[smartAccount][tokenAddress].isEnabled){
            _updateLimit(_token, _amount, _amount, resetTime, true);
        }
        else{
            _spendingLimits storage spendLimit = _spendingLimits[smartAccount][tokenAddress];
            spendLimit.limit = amount;
            spendLimit.availableToSpend = amount;
            _spendingLimits[smartAccount][tokenAddress].isEnabled = true;
        }
    }


    function _updateLimit(address smartAccount, address tokenAddress, uint256 _limit) {
        _spendingLimits storage spendLimit = _spendingLimits[smartAccount][tokenAddress];
        uint spendAdded = _limit - spendLimit.limit;
        spendLimit.limit = _limit;
        spendLimit.availableToSpend += spendAdded;
    }

    /**
        validateUserOp() calls this function with userOp.sender as smart account address
        It validates the spending limit of that token transfer allowed with the smart account
        If spend limit exceeds, validation fails and execution reverted
    */
    function validateSpendLimit(address smartAccount, address tokenAddress, uint256 _amount) public {
        _spendingLimits memory spendLimit = _spendingLimits[smartAccount][tokenAddress];
        // return if spending limit hasn't been enabled yet
        if (!spendLimit.isEnabled) return;
        // reverts if the amount exceeds the remaining available amount.
        require(spendLimit.availableToSpend >= _amount, "Exceed Spend limit");
        // decrement `available`
        spendLimit.availableToSpend -= _amount;
    }


    /**
        validateUserOp() calls this function with userOp.sender as smart account address
        It validates the transaction count of the smart account in the 24 houer interval.
        If transaction count exceeds, validation fails and execution reverted
    */
    function validateTransactionCounts(address smartAccount) public {
        _transactionLimits memory txLimit = li_transactionLimitsmits[smartAccount];
        if (!txLimit.isEnabled) return;
        uint256 timestamp = block.timestamp; // L1 batch timestamp
        // Renew resetTime and available amount, which is only performed
        // if a day has already passed since the last update: timestamp > resetTime
        if (txLimit.limit != txLimit.txAvailable && timestamp > txLimit.resetTime) {
            txLimit.resetTime = timestamp + ONE_DAY;
            txLimit.txAvailable = txLimit.limit;

            // Or only resetTime is updated if it's the first spending after enabling limit
        } else if (txLimit.limit == txLimit.txAvailable) {
            txLimit.resetTime = timestamp + ONE_DAY;
        }
        require(txLimit.txAvailable <= txLimit.limit, "Exceed daily limit");
        // decrement `available`
        txLimit.txAvailable -= 1;
    }

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash) external view virtual override returns (uint256){
        // in the userOp.signature field  append the moduleSignature with
        // the Validation Module address

        // extract the moduleSignature
        (bytes memory moduleSignature, ) = abi.decode(userOp.signature, (bytes, address));
        (address token, uint256 txAmount) = abi.decode(moduleSignature, (address, uint256));

        validateTransactionCounts(userOp.sender);
        validateSpendLimit(userOp.sender, token, txAmount);

        // implement _verifySignature as per the module functionality
        if (_verifySignature(userOpHash, moduleSignature, userOp.sender)) {
            return VALIDATION_SUCCESS;
        }
        return SIG_VALIDATION_FAILED;
    }


    function _verifySignature(
        bytes32 _dataHash,
        bytes memory _signature
    ) public view override returns (bytes4) {
        (_dataHash, _signature);
        return 0xffffffff; // do not support it here
    }



}
