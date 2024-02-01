// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract NonVulnerableContract{
    mapping(address => uint256) public balances;
    address public owner;

    modifier onlyOwner{
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // add events
    event Deposit(address indexed depositor, uint amount);
    event Wihdraw(address indexed addr, uint amount);
    event OwnerUpdated(address indexed oldOwner, address indexed newOwner);
    
    // emit Deposit events
    function deposit() public payable{
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // update balance before transaction
    // emit Withdraw event
    function withdraw(uint256 amount) public{
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(amount > 0, "Transfer amount is too low!");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        emit Wihdraw(msg.sender, amount);
    }

    // add check newOwner cannot be NULL address
    // emit OwnerUpdated event
    function transferOwnership(address newOwner) public  onlyOwner{
        require(newOwner != address(0), "Null address cannot be owner");
        owner = newOwner;
        emit OwnerUpdated(owner, newOwner);
    }
}