// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract GeodataAnchor {

    struct Anchor {
        bytes hash;
    }

    mapping(string => Anchor) private anchors; // mapping of id to anchor

    // add anchor
    function addAnchor(string memory _id, bytes memory _hash) public {
        // see if anchor already exists
        Anchor storage anchor = anchors[_id];
        if (anchor.hash.length > 0) {
            revert("Anchor id already exists");
        }

        Anchor memory newAnchor = Anchor(_hash);
        anchors[_id] = newAnchor;
    }

}