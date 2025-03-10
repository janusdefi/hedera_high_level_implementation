// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract InflationOracle {
    AggregatorV3Interface internal inflationFeed;

    construct (address _inflationOracleAddress) {
     inflationFeed = AggregatorV3Interface(_inflationOracleAddress);
    }

    function getInflationRate() public view returns (int) {
        (,int price,,,) = inflationFeed.latestRoundData();
        return price;
    }
}
