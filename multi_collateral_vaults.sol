// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JanusMultiVault is Ownable {
    struct Vault {
        address user;
        address collateralToken;
        uint256 collateralAmount;
        uint256 mintedAlpha;
        uint256 mintedOmega;
    }

    mapping(address => Vault) public userVaults;
    IERC20 public alphaToken;
    IERC20 public omegaToken;

  construct(address _alphaToken, address _omegaToken){
        alphaToken = IERC20(_alphaToken);
        omegaToken = IERC20(_omegaToken);
    }

  
    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Cannot stake 0 tokens");
        alphaToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] += _amount;
        lastClaimTime[msg.sender] = block.timestamp;
    }

    function claimRewards() external {
        require(stakingBalance[msg.sender] > 0, "No staked balance");

        uint256 timeElapsed = block.timestamp - lastClaimTime[msg.sender];
        uint256 reward = (stakingBalance[msg.sender] * timeElapsed) / 86400; // Daily rewards

        omegaToken.transfer(msg.sender, reward);
        lastClaimTime[msg.sender] = block.timestamp;
    }
}
