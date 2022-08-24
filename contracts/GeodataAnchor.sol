// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract GeodataAnchor {

    struct Anchor {
        bytes32 hash;
    }

    mapping(string => Anchor) private anchors; // mapping of id to anchor

    // get anchor
    function getAnchor(string memory _id) public view returns (bytes32) {
        Anchor storage anchor = anchors[_id];
        if (anchor.hash == 0) {
            revert("Anchor not found");
        }

        return anchor.hash;
    }

    // add anchor
    function addAnchor(string memory _id, bytes32 _hash) public {
        // see if anchor already exists
        Anchor storage anchor = anchors[_id];
        require(anchor.hash == 0, "Anchor id already exists");

        Anchor memory newAnchor = Anchor(_hash);
        anchors[_id] = newAnchor;
    }

}