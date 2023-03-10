// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AgroNft2 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    uint256 private _totalTokensMinted;
    mapping(uint256 => bool) private _inEscrow;

    constructor() ERC721("Agroblockchain NFT2", "AGB2") {}

    function mintNft(
        address ownerNft,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        _totalTokensMinted++;

        uint256 newTokenId = _tokenIds.current();
        _mint(ownerNft, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _totalTokensMinted;
    }

    function safeSellNft(
        address payable seller,
        uint256 tokenId,
        uint256 price
    ) public payable {
        require(
            ownerOf(tokenId) == seller,
            "Seller is not the owner of the token"
        );
        require(msg.value == price, "Incorrect ETH value sent");

        require(!_inEscrow[tokenId], "NFT is already in escrow");

        _inEscrow[tokenId] = true;

        // Escrow the NFT
        safeTransferFrom(seller, address(this), tokenId);

        // Transfer payment from buyer to seller
        (bool transferSuccess, ) = seller.call{value: price}("");
        require(transferSuccess, "Transfer failed");

        // Transfer the NFT to the buyer
        safeTransferFrom(address(this), msg.sender, tokenId);

        _inEscrow[tokenId] = false;
    }
}
