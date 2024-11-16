// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AIBot is Ownable {
    // Bot metadata structure
    string public name;
    string public description;
    string public learningModel;
    uint256 public learningIterations;
    uint256 public lastUpdated;
    mapping(string => string) public customAttributes;
    
    // Events
    event BotUpdated(string learningModel, uint256 iterations);
    event MetadataAttributeAdded(string key, string value);

    constructor(
        string memory _name,
        string memory _description,
        address initialOwner
    ) Ownable(initialOwner) {
        name = _name;
        description = _description;
        learningModel = "";
        lastUpdated = block.timestamp;
    }

    function updateBotLearning(
        string memory newLearningModel,
        uint256 newIterations
    ) public onlyOwner {
        learningModel = newLearningModel;
        learningIterations = newIterations;
        lastUpdated = block.timestamp;
        
        emit BotUpdated(newLearningModel, newIterations);
    }

    function addCustomAttribute(
        string memory key,
        string memory value
    ) public onlyOwner {
        customAttributes[key] = value;
        lastUpdated = block.timestamp;
        
        emit MetadataAttributeAdded(key, value);
    }

    function getCustomAttribute(string memory key) public view returns (string memory) {
        return customAttributes[key];
    }

    function getBotMetadata() public view returns (
        string memory _name,
        string memory _description,
        string memory _learningModel,
        uint256 _learningIterations,
        uint256 _lastUpdated
    ) {  
        return (
            name,
            description,
            learningModel,
            learningIterations,
            lastUpdated
        );
    }

}