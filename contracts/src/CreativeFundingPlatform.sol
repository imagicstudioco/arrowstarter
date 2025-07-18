// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// Main Creative Funding Platform Contract
contract CreativeFundingPlatform is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    RoughDraftNFT public roughDraftNFT;
    UpgradedNFT public upgradedNFT;
    ArrowToken public arrowToken;
    
    uint256 public constant CREATOR_UPFRONT_PERCENTAGE = 30;
    uint256 public constant PLATFORM_FEE_PERCENTAGE = 5;
    uint256 public constant ARROW_REWARD_PER_ETH = 1000 * 10**18; // 1000 ARROW per ETH
    uint256 public constant VESTING_DURATION = 365 days; // 1 year vesting
    
    struct ProjectStatus {
        bool fundsReleased;
        uint256 totalRefunded;
        bool arrowDistributed;
        uint256 creatorPayout;
    }
    
    mapping(uint256 => ProjectStatus) public projectStatus;
    mapping(uint256 => uint256) public refundDeadline; // projectId => deadline for refunds
    
    event CreatorPaidUpfront(uint256 indexed projectId, address indexed creator, uint256 amount);
    event ProjectDelivered(uint256 indexed projectId, address indexed creator);
    event NFTUpgraded(uint256 indexed projectId, address indexed backer, uint256 originalTokenId, uint256 newTokenId);
    event RefundClaimed(uint256 indexed projectId, address indexed backer, uint256 amount, uint256 tokenId);
    event RemainingFundsReleased(uint256 indexed projectId, address indexed creator, uint256 amount);
    event ArrowTokensDistributed(uint256 indexed projectId, uint256 totalAmount);
    
    constructor(
        address _roughDraftNFT,
        address _upgradedNFT,
        address _arrowToken
    ) {
        roughDraftNFT = RoughDraftNFT(_roughDraftNFT);
        upgradedNFT = UpgradedNFT(_upgradedNFT);
        arrowToken = ArrowToken(_arrowToken);
    }
    
    function releaseUpfrontPayment(uint256 projectId) external nonReentrant {
        RoughDraftNFT.ProjectInfo memory project = roughDraftNFT.getProject(projectId);
        require(project.creator == msg.sender, "Only creator can claim upfront payment");
        require(!projectStatus[projectId].fundsReleased, "Upfront payment already claimed");
        require(project.fundingRaised > 0, "No funds raised");
        
        uint256 upfrontAmount = (project.fundingRaised * CREATOR_UPFRONT_PERCENTAGE) / 100;
        uint256 platformFee = (upfrontAmount * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 creatorPayout = upfrontAmount - platformFee;
        
        projectStatus[projectId].fundsReleased = true;
        projectStatus[projectId].creatorPayout = creatorPayout;
        
        // Set refund deadline (e.g., 90 days after project deadline)
        refundDeadline[projectId] = project.deadline + 90 days;
        
        payable(project.creator).transfer(creatorPayout);
        payable(owner()).transfer(platformFee);
        
        emit CreatorPaidUpfront(projectId, project.creator, creatorPayout);
    }
    
    function deliverProject(uint256 projectId, string memory upgradedMetadataURI) external {
        RoughDraftNFT.ProjectInfo memory project = roughDraftNFT.getProject(projectId);
        require(project.creator == msg.sender, "Only creator can deliver");
        require(!project.delivered, "Project already delivered");
        
        // Mark project as delivered in the NFT contract
        roughDraftNFT.markDelivered(projectId);
        
        emit ProjectDelivered(projectId, msg.sender);
    }
    
    function upgradeNFTAndClaimRewards(uint256 tokenId) external nonReentrant {
        require(roughDraftNFT.ownerOf(tokenId) == msg.sender, "Not token owner");
        
        uint256 projectId = roughDraftNFT.tokenToProject(tokenId);
        RoughDraftNFT.ProjectInfo memory project = roughDraftNFT.getProject(projectId);
        
        require(project.delivered, "Project not delivered yet");
        require(!upgradedNFT.isUpgraded(tokenId), "NFT already upgraded");
        
        // Upgrade NFT
        uint256 newTokenId = upgradedNFT.upgradeNFT(msg.sender, tokenId, project.metadataURI);
        
        // Calculate backer's share of remaining funds and ARROW tokens
        uint256 backerContribution = roughDraftNFT.backerContribution(projectId, msg.sender);
        uint256 backerShare = (backerContribution * 10000) / project.fundingRaised; // basis points
        
        // Release remaining ETH funds (70% of total - platform fees)
        uint256 remainingFunds = (project.fundingRaised * 70) / 100;
        uint256 backerETHReward = (remainingFunds * backerShare) / 10000;
        
        if (backerETHReward > 0) {
            payable(msg.sender).transfer(backerETHReward);
        }
        
        // Create vesting schedule for ARROW tokens
        uint256 arrowReward = (backerContribution * ARROW_REWARD_PER_ETH) / 1 ether;
        if (arrowReward > 0) {
            arrowToken.createVestingSchedule(
                msg.sender,
                arrowReward,
                block.timestamp,
                VESTING_DURATION,
                false
            );
        }
        
        emit NFTUpgraded(projectId, msg.sender, tokenId, newTokenId);
    }
    
    function claimRefund(uint256 tokenId) external nonReentrant {
        require(roughDraftNFT.ownerOf(tokenId) == msg.sender, "Not token owner");
        
        uint256 projectId = roughDraftNFT.tokenToProject(tokenId);
        RoughDraftNFT.ProjectInfo memory project = roughDraftNFT.getProject(projectId);
        
        require(!project.delivered, "Project was delivered - cannot refund");
        require(block.timestamp < refundDeadline[projectId], "Refund period expired");
        require(!upgradedNFT.isUpgraded(tokenId), "NFT already upgraded");
        
        uint256 backerContribution = roughDraftNFT.backerContribution(projectId, msg.sender);
        require(backerContribution > 0, "No contribution found");
        
        // Calculate refund amount (70% of contribution since 30% was paid upfront)
        uint256 refundAmount = (backerContribution * 70) / 100;
        
        // Mark as refunded by "upgrading" to prevent double spending
        upgradedNFT.upgradeNFT(msg.sender, tokenId, "refunded");
        
        payable(msg.sender).transfer(refundAmount);
        
        emit RefundClaimed(projectId, msg.sender, refundAmount, tokenId);
    }
    
    function releaseRemainingFunds(uint256 projectId) external nonReentrant {
        RoughDraftNFT.ProjectInfo memory project = roughDraftNFT.getProject(projectId);
        require(project.creator == msg.sender, "Only creator can claim");
        require(project.delivered, "Project not delivered");
        require(block.timestamp > refundDeadline[projectId], "Refund period not expired");
        
        // Calculate remaining funds not claimed by backers
        uint256 totalRemainingFunds = (project.fundingRaised * 70) / 100;
        uint256 platformFee = (totalRemainingFunds * PLATFORM_FEE_PERCENTAGE) / 100;
        uint256 creatorPayout = totalRemainingFunds - platformFee;
        
        // This is a simplified calculation - in practice, you'd track actual claims
        payable(project.creator).transfer(creatorPayout);
        payable(owner()).transfer(platformFee);
        
        emit RemainingFundsReleased(projectId, project.creator, creatorPayout);
    }
    
    function getProjectStatus(uint256 projectId) external view returns (ProjectStatus memory) {
        return projectStatus[projectId];
    }
    
    function calculateBackerShare(uint256 projectId, address backer) external view returns (uint256) {
        uint256 backerContribution = roughDraftNFT.backerContribution(projectId, backer);
        RoughDraftNFT.ProjectInfo memory project = roughDraftNFT.getProject(projectId);
        
        if (project.fundingRaised == 0) return 0;
        return (backerContribution * 10000) / project.fundingRaised; // basis points
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    receive() external payable {}
}