// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "zk-merkle-tree/contracts/ZKTree.sol";

contract ZKTreeVote is ZKTree {
    address public owner;
    mapping(address => bool) public validators;
    mapping(uint256 => bool) uniqueHashes;
    uint numOptions;
    mapping(uint => uint) optionCounter;
    bool public votingOpen;


    constructor(
        uint32 _levels,
        IHasher _hasher,
        IVerifier _verifier,
        uint _numOptions
    ) ZKTree(_levels, _hasher, _verifier) {
        owner = msg.sender;
        numOptions = _numOptions;
        for (uint i = 0; i <= numOptions; i++) optionCounter[i] = 0;
        votingOpen = false;  // Voting starts closed
    }

    // function to register a validator, this can only be called by the owner.
    function registerValidator(address _validator) external {
        require(msg.sender == owner, "Only owner can add validator!");
        validators[_validator] = true;
    }
    
    // function to check if the address is a validator or not.
    function isValidator(address _address) external view returns (bool) {
        return validators[_address]; 
    }


    // start voting, can only be called by a validator.
    function startVoting() external {
        require(validators[msg.sender], "Only validators can start voting!");
        require(!votingOpen, "Voting is already open!");
        votingOpen = true;
    }

    // stop voting
    function stopVoting() external {
        require(validators[msg.sender], "Only validators can stop voting!");
        require(votingOpen, "Voting is not open!");
        votingOpen = false;
    }

    // Function to register commitment, this can only be called by a validator. 
    function registerCommitment(
        uint256 _uniqueHash,   // unqiue hash added along with commitment.
        uint256 _commitment    // commitment of a voter.
    ) external {
        require(validators[msg.sender], "Only validator can commit!");
        require(
            !uniqueHashes[_uniqueHash],
            "This unique hash is already used!"
        );
        _commit(bytes32(_commitment));
        uniqueHashes[_uniqueHash] = true;
    }
 
    //function to vote
    function vote(
        uint _option,
        uint256 _nullifier,
        uint256 _root,
        uint[2] memory _proof_a,
        uint[2][2] memory _proof_b,
        uint[2] memory _proof_c
    ) external {
        require(votingOpen, "Voting is not open!");
        require(_option <= numOptions, "Invalid option!");
        _nullify(        // function in zk-merkle-tree to validate the nullifier with the merkel root.
            bytes32(_nullifier),
            bytes32(_root),
            _proof_a,
            _proof_b,
            _proof_c
        );
        optionCounter[_option] = optionCounter[_option] + 1;  // increment the vote count
    }


    //  function to return the vote count.
    function getOptionCounter(uint _option) external view returns (uint) {     
        return optionCounter[_option];
    }
}
