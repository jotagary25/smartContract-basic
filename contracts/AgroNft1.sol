// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AgroNft1 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    uint256 private _totalTokensMinted;
    mapping(address => bool) private _minters;

    constructor() ERC721("AgroblockchainNFTs", "AGB") {
        _minters[msg.sender] = true; // the creator of contract is the minter for default
    }

    function mintNFT(
        address ownerNft,
        string memory tokenURI
    ) public returns (uint256) {
        require(_minters[msg.sender], "no tienes permiso para mintear NFTs"); //verifico si el minteader esta permitido
        _tokenIds.increment(); // incremento el ID
        _totalTokensMinted++; // incremento el conteo tokens creados

        uint256 newTokenId = _tokenIds.current(); // creo un nuevo id del incremento
        _mint(ownerNft, newTokenId); // creo el nft y lo asigno al propietario
        _setTokenURI(newTokenId, tokenURI); //asign el URL al nuevo nft creado anteriormente

        return newTokenId; // regreso el id del nft creado
    }

    // agregar una cuenta permitida para mintear
    function addMinter(address minter) public onlyOwner {
        _minters[minter] = true;
    }

    // remover una cuenta para que ya no pueda mintear
    function removeMinter(address minter) public onlyOwner {
        _minters[minter] = false;
    }

    // retornar la cantidad de nfts minteados
    function totalSupply() public view returns (uint256) {
        return _totalTokensMinted;
    }

    // transferir un nft de una cuenta a otra
    function transferNft(address from, address to, uint256 tokenId) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "No estas autorizado para transferir este NFT"
        );
        require(_exists(tokenId), "El NFT no existe");

        _transfer(from, to, tokenId);
    }
}
