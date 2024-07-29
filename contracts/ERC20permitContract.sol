// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ERC20PermitContract is ERC20, Ownable, ERC20Permit {
    constructor() ERC20("CARBON CREDIT", "CCT") ERC20Permit("CARBON CREDIT") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10 ** decimals());
        // transferOwnership(msg.sender); // Set deployer as the owner
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
