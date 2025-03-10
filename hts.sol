// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JanusAlpha is ERC20 {
    constructor() ERC20("Janus Alpha", "JAN-A") {
        _mint(msg.sender, 1000000 * 10**18); // Initial supply
    }
}

contract JanusOmega is ERC20 {
    constructor() ERC20("Janus Omega", "JAN-O") {
        _mint(msg.sender, 1000000 * 10**18); // Initial supply
    }
}
