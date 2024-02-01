// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
/* solhint-disable no-empty-blocks */

import {IAuthorizationModule} from "../interfaces/IAuthorizationModule.sol";
import {ISignatureValidator} from "../interfaces/ISignatureValidator.sol";

contract AuthorizationModulesConstants {
    uint256 internal constant VALIDATION_SUCCESS = 0;
    uint256 internal constant SIG_VALIDATION_FAILED = 1;
}

abstract contract BaseAuthorizationModule is
    IAuthorizationModule,
    ISignatureValidator,
    AuthorizationModulesConstants
{}