// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GoldRevenueDistributor {
    IERC20 public jgldToken;
    mapping(address => uint256) public shares;
    uint256 public totalShares;
    address public miningCompany;

    construct(address _jgldToken, address _miningCompany) {
        jgldToken = IERC20(_jgldToken);
        miningCompany = _miningCompany;
    }

    function depositRevenue() external payable {
        require(msg.sender == miningCompany, "Only mining company can deposit revenue");
    }

    function claimRevenue() external {
        uint256 userShare = (jgldToken.balanceOf(msg.sender) * address(this).balance) / totalShares;
        payable(msg.sender).transfer(userShare);
    }
}
