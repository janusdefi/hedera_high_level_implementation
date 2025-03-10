// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JanusGold is ERC20 {
    address public admin;
    uint256 public goldBacking; // Total gold backing in grams

 construct() ERC20("Janus Gold", "JGLD") {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == admin, "Only admin can burn");
        _burn(from, amount);
    }

    function updateGoldBacking(uint256 newGoldBacking) external {
        require(msg.sender == admin, "Only admin can update gold backing");
        goldBacking = newGoldBacking;
    }
}
