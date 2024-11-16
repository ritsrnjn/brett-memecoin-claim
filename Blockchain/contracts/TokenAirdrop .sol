// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenAirdrop is Ownable {
    using SafeERC20 for IERC20;
    
    // Events
    event AirdropExecuted(address indexed token, uint256 totalAmount, uint256 recipientsCount);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Execute airdrop of tokens to multiple recipients
     * @param token The ERC20 token to airdrop
     * @param recipients Array of recipient addresses
     * @param amounts Array of token amounts corresponding to each recipient
     */
    function executeAirdrop(
        address token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(recipients.length > 0, "Empty recipients list");
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        IERC20 tokenContract = IERC20(token);
        uint256 totalAmount = 0;
        
        // Calculate total amount needed
        for(uint i = 0; i < amounts.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient address");
            require(amounts[i] > 0, "Amount must be greater than 0");
            totalAmount += amounts[i];
        }
        
        // Check contract balance
        require(
            tokenContract.balanceOf(address(this)) >= totalAmount,
            "Insufficient token balance"
        );
        
        // Execute transfers
        for(uint i = 0; i < recipients.length; i++) {
            tokenContract.safeTransfer(recipients[i], amounts[i]);
        }
        
        emit AirdropExecuted(token, totalAmount, recipients.length);
    }
    
    /**
     * @dev Check the balance of a specific token in this contract
     * @param token The ERC20 token address to check
     */
    function getTokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
    
    /**
     * @dev Emergency withdraw function to recover tokens
     * @param token The ERC20 token to withdraw
     * @param recipient The address to receive the tokens
     * @param amount The amount of tokens to withdraw
     */
    function emergencyWithdraw(
        address token,
        address recipient,
        uint256 amount
    ) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        IERC20(token).safeTransfer(recipient, amount);
    }
}