// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// Rough Draft NFT Contract
contract RoughDraftNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct ProjectInfo {
        address creator;
        uint256 fundingGoal;
        uint256 fundingRaised;
        string metadataURI;
        uint256 deadline;
        bool delivered;
        uint256 createdAt;
    }
    
    mapping(uint256 => ProjectInfo) public projects;
    mapping(uint256 => uint256) public tokenToProject; // tokenId => projectId
    mapping(uint256 => address[]) public projectBackers;
    mapping(uint256 => mapping(address => uint256)) public backerContribution;
    
    event ProjectCreated(uint256 indexed projectId, address indexed creator, uint256 fundingGoal);
    event BackingReceived(uint256 indexed projectId, address indexed backer, uint256 amount, uint256 tokenId);
    
    constructor() ERC721("Rough Draft NFT", "RDNFT") {}
    
    function createProject(
        uint256 fundingGoal,
        string memory metadataURI,
        uint256 duration
    ) external returns (uint256) {
        require(fundingGoal > 0, "Funding goal must be > 0");
        require(duration > 0, "Duration must be > 0");
        
        uint256 projectId = _tokenIds.current();
        _tokenIds.increment();
        
        projects[projectId] = ProjectInfo({
            creator: msg.sender,
            fundingGoal: fundingGoal,
            fundingRaised: 0,
            metadataURI: metadataURI,
            deadline: block.timestamp + duration,
            delivered: false,
            createdAt: block.timestamp
        });
        
        emit ProjectCreated(projectId, msg.sender, fundingGoal);
        return projectId;
    }
    
    function backProject(uint256 projectId) external payable returns (uint256) {
        require(msg.value > 0, "Must send ETH");
        require(block.timestamp < projects[projectId].deadline, "Project deadline passed");
        require(!projects[projectId].delivered, "Project already delivered");
        
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();
        
        _mint(msg.sender, tokenId);
        tokenToProject[tokenId] = projectId;
        
        projects[projectId].fundingRaised += msg.value;
        
        // Track backer if first time backing this project
        if (backerContribution[projectId][msg.sender] == 0) {
            projectBackers[projectId].push(msg.sender);
        }
        backerContribution[projectId][msg.sender] += msg.value;
        
        emit BackingReceived(projectId, msg.sender, msg.value, tokenId);
        return tokenId;
    }
    
    function markDelivered(uint256 projectId) external {
        require(msg.sender == projects[projectId].creator, "Only creator can mark delivered");
        require(!projects[projectId].delivered, "Already marked as delivered");
        
        projects[projectId].delivered = true;
    }
    
    function getProject(uint256 projectId) external view returns (ProjectInfo memory) {
        return projects[projectId];
    }
    
    function getProjectBackers(uint256 projectId) external view returns (address[] memory) {
        return projectBackers[projectId];
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        uint256 projectId = tokenToProject[tokenId];
        return projects[projectId].metadataURI;
    }
}


