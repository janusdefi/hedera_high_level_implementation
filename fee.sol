// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract JanusDynamicFees is Ownable {
    uint256 public tradingFee = 10; // Default: 0.1%
    uint256 public minFee = 5; // 0.05%
    uint256 public maxFee = 50; // 0.5%

    function adjustFees(uint256 marketVolatility) external onlyOwner {
        if (marketVolatility > 50) {
            tradingFee = maxFee;
        } else if (marketVolatility < 10) {
            tradingFee = minFee;
        } else {
            tradingFee = marketVolatility;
        }
    }
}
