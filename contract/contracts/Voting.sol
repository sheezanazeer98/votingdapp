// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    address[] private voters;  // Array to track voters
    uint256 public candidatesCount;
    address public owner;

    event CandidateAdded(uint256 indexed candidateId, string name);
    event VoteReceived(uint256 indexed candidateId, uint256 voteCount);

    // Modifier to restrict access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        addCandidate("Alice");
        addCandidate("Bob");
    }

    // Function to add a candidate, restricted to only the owner
    function addCandidate(string memory name) public onlyOwner {
        require(bytes(name).length > 0, "Candidate name cannot be empty");

        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
        emit CandidateAdded(candidatesCount, name);
    }

    // Function to vote for a candidate
    function vote(uint256 candidateId) public {
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID.");
        require(!hasVoted[msg.sender], "You have already voted."); // Check if the voter has already voted

        candidates[candidateId].voteCount++;
        hasVoted[msg.sender] = true; // Mark the voter as having voted
        voters.push(msg.sender); // Add the voter to the array
        emit VoteReceived(candidateId, candidates[candidateId].voteCount);
    }

    // Function to reset all vote counts and voting status, restricted to only the owner
    function resetVotes() public onlyOwner {
        // Reset all vote counts
        for (uint256 i = 1; i <= candidatesCount; i++) {
            candidates[i].voteCount = 0;
        }

        // Reset the voting status of all voters
        for (uint256 i = 0; i < voters.length; i++) {
            hasVoted[voters[i]] = false;
        }
        delete voters;
    }

    // Function to retrieve all candidates
    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint256 i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    // Function to transfer ownership of the contract
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}
