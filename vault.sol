// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JanusVault is Ownable {

IERC20 public alphaToken;
IERC20 public omegaToken;

mapping(address => uint256) public collateralDeposits;
    mapping(address => uint256) public vaultTokensMinted;



construct(address _alphaToken, address _omegaToken){

 alphaToken = IERC20(_alphaToken);
        omegaToken = IERC20(_omegaToken);
}


    function depositCollateral(uint256 _amount) external {
        require(_amount > 0, "Must deposit more than 0");
        alphaToken.transferFrom(msg.sender, address(this), _amount);
        collateralDeposits[msg.sender] += _amount;

        // Mint Vault Tokens (1:1 ratio for now)
        vaultTokensMinted[msg.sender] += _amount;
    }

    function withdrawCollateral(uint256 _amount) external {
        require(collateralDeposits[msg.sender] >= _amount, "Insufficient balance");
        alphaToken.transfer(msg.sender, _amount);
        collateralDeposits[msg.sender] -= _amount;
    }
  }
