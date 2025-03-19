// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract JanusGoldTreasury {
    address[] public owners;
    uint256 public requiredApprovals;

    struct Proposal {
        address recipient;
        uint256 amount;
        uint256 approvals;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public approvals;
    uint256 public proposalCount;

    constructor(address[] memory _owners, uint256 _requiredApprovals) {
        owners = _owners;
        requiredApprovals = _requiredApprovals;
    }

    function submitProposal(address _recipient, uint256 _amount) external {
        proposals[proposalCount] = Proposal(_recipient, _amount, 0, false);
        proposalCount++;
    }

    function approveProposal(uint256 _proposalId) external {
        require(!approvals[_proposalId][msg.sender], "Already approved");
        approvals[_proposalId][msg.sender] = true;
        proposals[_proposalId].approvals++;

        if (proposals[_proposalId].approvals >= requiredApprovals) {
            proposals[_proposalId].executed = true;
            payable(proposals[_proposalId].recipient).transfer(proposals[_proposalId].amount);
        }
    }
}
