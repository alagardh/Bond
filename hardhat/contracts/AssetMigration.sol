// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AssetMigration  is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol){
        
    }

  function addToken(address _accountAddr, uint256 _amount)   public {
        _mint(_accountAddr, _amount * (10 ** 18));
    }

    function addTokenInWei(address _accountAddr, uint256 _amount)   public {
        _mint(_accountAddr, _amount);
    }

    function burnToken(uint256 _amount, address _account)   public {
        _burn(_account, _amount* (10 ** 18));
    }


}