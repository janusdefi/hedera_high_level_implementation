// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldNFTMarketplace is Ownable {
    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    IERC721 public goldNFT;
    mapping(uint256 => Listing) public listings;

    event NFTListed(address seller, uint256 tokenId, uint256 price);
    event NFTSold(address buyer, uint256 tokenId, uint256 price);

    constructor(address _goldNFT) {
        goldNFT = IERC721(_goldNFT);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(goldNFT.ownerOf(tokenId) == msg.sender, "Not NFT owner");
        require(price > 0, "Invalid price");

        goldNFT.transferFrom(msg.sender, address(this), tokenId);
        listings[tokenId] = Listing(msg.sender, tokenId, price, true);

        emit NFTListed(msg.sender, tokenId, price);
    }

    function buyNFT(uint256 tokenId) external payable {
        require(listings[tokenId].active, "NFT not listed");
        require(msg.value >= listings[tokenId].price, "Insufficient funds");

        address seller = listings[tokenId].seller;
        goldNFT.transferFrom(address(this), msg.sender, tokenId);
        payable(seller).transfer(msg.value);
        
        listings[tokenId].active = false;
        emit NFTSold(msg.sender, tokenId, listings[tokenId].price);
    }

    function cancelListing(uint256 tokenId) external {
        require(listings[tokenId].seller == msg.sender, "Not seller");
        require(listings[tokenId].active, "Not active");

        goldNFT.transferFrom(address(this), msg.sender, tokenId);
        listings[tokenId].active = false;
    }
}
