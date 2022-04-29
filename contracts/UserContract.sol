// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract UserContract {
    struct User {
        string name;
        string position;
    }

    function getUser() public view onlyOwner returns (User memory) {
       return user;
    }

    function setUser(string memory _name, string memory _position) public onlyOwner {
        user = User(_name, _position);
    }

    // State variable stored permanently in smart contract storage
    address payable public owner;
    User public user;

    constructor() payable {
      owner = payable(msg.sender);
    }

     modifier onlyOwner () {
       require(msg.sender == owner, "This can only be called by the contract owner!");
       _;
     }
}
