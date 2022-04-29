// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CertificatesContract {
    struct Certificate {
        address user; // The address of the user who added a certificate.
        string name; // Certificate name
        string number; // Certificate number
        uint256 timestamp; // The timestamp when the user added a certificate.
        string issueDate;
        string expiryDate;
        uint256 category;
        bool isRenewable;
        uint256 daysRequiredToRenew;
    }

    event NewCertificateCreated(
        address indexed from,
        Certificate certificate,
        uint256 timestamp
    );

    event CertificateRemoved(
        address indexed from,
        uint256 timestamp
    );

    function getCertificates() public view returns (Certificate[] memory) {
       return certificates;
    }

    function addCertificate(
        string memory _name,
        string memory _number,
        string memory _issueDate,
        string memory _expiryDate,
        uint256 _category,
        bool _isRenewable,
        uint256 _daysRequiredToRenew
    ) public {
        Certificate memory newCertificate = Certificate(
            msg.sender,
            _name,
            _number,
            block.timestamp,
            _issueDate,
            _expiryDate,
            _category,
            _isRenewable,
            _daysRequiredToRenew
        );

        certificates.push(newCertificate);

        emit NewCertificateCreated(msg.sender, newCertificate, block.timestamp);
    }


    function findCertificateByTimestamp(uint256 timestamp) public view returns (uint256) {
        uint256 i = 0;

        while (certificates[i].timestamp != timestamp) {
            i++;
        }

        return i;
    }

    function removeCertificate(uint256 timestamp) public {
        uint256 index = findCertificateByTimestamp(timestamp);

        while (index < certificates.length-1) {
            certificates[index] = certificates[index+1];
            index++;
        }

        certificates.pop();

        emit CertificateRemoved(msg.sender, block.timestamp);
    }

    // State variable stored permanently in smart contract storage
    Certificate[] public certificates;
    address payable public owner;

    constructor() payable {
      owner = payable(msg.sender);
    }

     modifier onlyOwner () {
       require(msg.sender == owner, "This can only be called by the contract owner!");
       _;
     }
}
