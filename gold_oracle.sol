// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GoldPriceOracle {
    AggregatorV3Interface internal goldPriceFeed;


construct(address _goldOracleAddress) {
        goldPriceFeed = AggregatorV3Interface(_goldOracleAddress);
    }

    function getGoldPrice() public view returns (int) {
        (,int price,,,) = goldPriceFeed.latestRoundData();
        return price;
    }
}
