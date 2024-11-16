// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Store {
 uint256 public shamuu;

 function store(uint256 _shamuu) public returns (uint256 ) {
    shamuu = _shamuu;
    return shamuu;
 }

}
