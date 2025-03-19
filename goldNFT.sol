// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldNFT is ERC721, Ownable {
    uint256 public tokenCounter;
    mapping(uint256 => uint256) public goldBacking; // NFT ID → Gold amount in grams

    constructor() ERC721("Janus Gold Ownership", "JGLD-NFT") {
        tokenCounter = 1;
    }

    function mintNFT(address to, uint256 goldAmount) external onlyOwner {
        _safeMint(to, tokenCounter);
        goldBacking[tokenCounter] = goldAmount;
        tokenCounter++;
    }

    function getGoldAmount(uint256 tokenId) public view returns (uint256) {
        return goldBacking[tokenId];
    }
}
