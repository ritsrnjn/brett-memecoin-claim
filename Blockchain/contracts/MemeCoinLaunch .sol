// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeCoinLaunch is ERC20, Ownable {

    uint256 public constant MINT_AMOUNT = 1_000_000 * 10**18;

    event TokensMinted(address indexed to, uint256 amount);
    
    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC20(name, symbol) Ownable(initialOwner) {}
    
    function mintTokens(address to) public onlyOwner {        
        _mint(to, MINT_AMOUNT);
        
        emit TokensMinted(to, MINT_AMOUNT);
    }

    function getMintAmount() public pure returns (uint256) {
        return MINT_AMOUNT;
    }
}