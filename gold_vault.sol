// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldVault is Ownable {
    IERC20 public jgldToken;
    uint256 public totalGoldDeposited; // Gold in grams

    mapping(address => uint256) public userGoldDeposits;

    construct(address _jgldToken) {
        jgldToken = IERC20(_jgldToken);
    }

    function depositGold(uint256 _grams) external onlyOwner {
        totalGoldDeposited += _grams;
        jgldToken.mint(msg.sender, _grams);
    }

    function withdrawGold(uint256 _grams) external {
        require(userGoldDeposits[msg.sender] >= _grams, "Insufficient balance");
        
        totalGoldDeposited -= _grams;
        userGoldDeposits[msg.sender] -= _grams;
        
        jgldToken.burn(msg.sender, _grams);
    }
}
