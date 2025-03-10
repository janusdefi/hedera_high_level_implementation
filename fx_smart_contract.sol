// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JanusFXPool is Ownable {
    IERC20 public alphaToken;
    IERC20 public omegaToken;
    IERC20 public stablecoin; // USDC, DAI, etc.

    mapping(address => uint256) public liquidityProviders;
    uint256 public totalLiquidity;

    constructor(address _alphaToken, address _omegaToken, address _stablecoin) {
        alphaToken = IERC20(_alphaToken);
        omegaToken = IERC20(_omegaToken);
        stablecoin = IERC20(_stablecoin);
    }

    function provideLiquidity(uint256 _alphaAmount, uint256 _omegaAmount) external {
        require(_alphaAmount > 0 && _omegaAmount > 0, "Invalid amounts");

        alphaToken.transferFrom(msg.sender, address(this), _alphaAmount);
        omegaToken.transferFrom(msg.sender, address(this), _omegaAmount);

        liquidityProviders[msg.sender] += _alphaAmount + _omegaAmount;
        totalLiquidity += _alphaAmount + _omegaAmount;
    }

    function swapAlphaForOmega(uint256 _alphaAmount) external {
        require(_alphaAmount > 0, "Invalid swap amount");
        uint256 omegaAmount = (_alphaAmount * getExchangeRate()) / 1e18;

        alphaToken.transferFrom(msg.sender, address(this), _alphaAmount);
        omegaToken.transfer(msg.sender, omegaAmount);
    }

    function getExchangeRate() public view returns (uint256) {
        return (alphaToken.balanceOf(address(this)) * 1e18) / omegaToken.balanceOf(address(this));
    }
}
