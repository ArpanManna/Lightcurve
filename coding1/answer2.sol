// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract VulnerableContract{
    mapping(address => uint256) public balances;
    address public owner;
    bool internal locked;
    modifier onlyOwner{
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier nonReentrant{
        require(!locked, "No reentranct");
        locked = true;
        _;
        locked = false;
    }
    event Deposit(address indexed depositor, uint amount);
    event Wihdraw(address indexed addr, uint amount);
    event OwnerUpdated(address indexed oldOwner, address indexed newOwner);
    
    function deposit() public payable{
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    function withdraw(uint256 amount) public nonReentrant{
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(amount > 0, "Transfer amount is too low!");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        emit Wihdraw(msg.sender, amount);
    }
    function transferOwnership(address newOwner) public  onlyOwner{
        require(newOwner != address(0), "Null address cannot be owner");
        owner = newOwner;
        emit OwnerUpdated(owner, newOwner);
    }
}