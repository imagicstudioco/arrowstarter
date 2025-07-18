// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// Upgraded NFT Contract
contract UpgradedNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(uint256 => uint256) public upgradedFromToken; // new tokenId => original tokenId
    mapping(uint256 => bool) public isUpgraded; // original tokenId => upgraded status
    
    event NFTUpgraded(uint256 indexed originalTokenId, uint256 indexed newTokenId, address indexed owner);
    
    constructor() ERC721("Upgraded Project NFT", "UPNFT") {}
    
    function upgradeNFT(address to, uint256 originalTokenId, string memory newMetadataURI) 
        external 
        onlyOwner 
        returns (uint256) 
    {
        require(!isUpgraded[originalTokenId], "NFT already upgraded");
        
        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();
        
        _mint(to, newTokenId);
        upgradedFromToken[newTokenId] = originalTokenId;
        isUpgraded[originalTokenId] = true;
        
        emit NFTUpgraded(originalTokenId, newTokenId, to);
        return newTokenId;
    }
}
