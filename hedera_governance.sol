// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract JanusGovernance {
    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;

    function createProposal(string memory _desc) external {
        proposals.push(Proposal({description: _desc, votesFor: 0, votesAgainst: 0, executed: false}));
    }

    function vote(uint256 _proposalId, bool _support) external {
        require(!hasVoted[msg.sender], "Already voted");
        if (_support) proposals[_proposalId].votesFor++;
        else proposals[_proposalId].votesAgainst++;

        hasVoted[msg.sender] = true;
    }

    function executeProposal(uint256 _proposalId) external {
        require(proposals[_proposalId].votesFor > proposals[_proposalId].votesAgainst, "Not enough support");
        proposals[_proposalId].executed = true;
    }
}
