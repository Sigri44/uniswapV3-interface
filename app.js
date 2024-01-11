let userSigner; // Variable pour stocker le signer de l'utilisateur

// Adresse du contrat et son ABI
const contractAddress = '0xc36442b4a4522e871399cd717abdd847ab11fe88';
const contractAbi = [
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_factory",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_WETH9",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_tokenDescriptor_",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "name": "Collect",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "name": "DecreaseLiquidity",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "name": "IncreaseLiquidity",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "WETH9",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
        ],
        "name": "balanceOf",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint128",
                "name": "amount0Max",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "amount1Max",
                "type": "uint128"
            }
            ],
            "internalType": "struct INonfungiblePositionManager.CollectParams",
            "name": "params",
            "type": "tuple"
        }
        ],
        "name": "collect",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token0",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "token1",
            "type": "address"
        },
        {
            "internalType": "uint24",
            "name": "fee",
            "type": "uint24"
        },
        {
            "internalType": "uint160",
            "name": "sqrtPriceX96",
            "type": "uint160"
        }
        ],
        "name": "createAndInitializePoolIfNecessary",
        "outputs": [
        {
            "internalType": "address",
            "name": "pool",
            "type": "address"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint128",
                "name": "liquidity",
                "type": "uint128"
            },
            {
                "internalType": "uint256",
                "name": "amount0Min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1Min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
            ],
            "internalType": "struct INonfungiblePositionManager.DecreaseLiquidityParams",
            "name": "params",
            "type": "tuple"
        }
        ],
        "name": "decreaseLiquidity",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factory",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "getApproved",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount0Desired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1Desired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount0Min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1Min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
            ],
            "internalType": "struct INonfungiblePositionManager.IncreaseLiquidityParams",
            "name": "params",
            "type": "tuple"
        }
        ],
        "name": "increaseLiquidity",
        "outputs": [
        {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        },
        {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }
        ],
        "name": "isApprovedForAll",
        "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "address",
                "name": "token0",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "token1",
                "type": "address"
            },
            {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            },
            {
                "internalType": "int24",
                "name": "tickLower",
                "type": "int24"
            },
            {
                "internalType": "int24",
                "name": "tickUpper",
                "type": "int24"
            },
            {
                "internalType": "uint256",
                "name": "amount0Desired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1Desired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount0Min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1Min",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
            ],
            "internalType": "struct INonfungiblePositionManager.MintParams",
            "name": "params",
            "type": "tuple"
        }
        ],
        "name": "mint",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        },
        {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes[]",
            "name": "data",
            "type": "bytes[]"
        }
        ],
        "name": "multicall",
        "outputs": [
        {
            "internalType": "bytes[]",
            "name": "results",
            "type": "bytes[]"
        }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "ownerOf",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "positions",
        "outputs": [
        {
            "internalType": "uint96",
            "name": "nonce",
            "type": "uint96"
        },
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "token0",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "token1",
            "type": "address"
        },
        {
            "internalType": "uint24",
            "name": "fee",
            "type": "uint24"
        },
        {
            "internalType": "int24",
            "name": "tickLower",
            "type": "int24"
        },
        {
            "internalType": "int24",
            "name": "tickUpper",
            "type": "int24"
        },
        {
            "internalType": "uint128",
            "name": "liquidity",
            "type": "uint128"
        },
        {
            "internalType": "uint256",
            "name": "feeGrowthInside0LastX128",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "feeGrowthInside1LastX128",
            "type": "uint256"
        },
        {
            "internalType": "uint128",
            "name": "tokensOwed0",
            "type": "uint128"
        },
        {
            "internalType": "uint128",
            "name": "tokensOwed1",
            "type": "uint128"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "refundETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
        }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "selfPermit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "expiry",
            "type": "uint256"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "selfPermitAllowed",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "expiry",
            "type": "uint256"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "selfPermitAllowedIfNecessary",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
        },
        {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        },
        {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
        }
        ],
        "name": "selfPermitIfNecessary",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }
        ],
        "name": "supportsInterface",
        "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountMinimum",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }
        ],
        "name": "sweepToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
        }
        ],
        "name": "tokenByIndex",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
        }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "tokenURI",
        "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amount0Owed",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amount1Owed",
            "type": "uint256"
        },
        {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }
        ],
        "name": "uniswapV3MintCallback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "amountMinimum",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }
        ],
        "name": "unwrapWETH9",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

// Fonction pour afficher l'adresse de l'utilisateur
async function displayUserAddress() {
    if (window.ethereum) {
        try {
            // Forcer la connexion sur la chaîne Arbitrum
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                {
                    chainId: '0xa4b1', // Chain ID d'Arbitrum One
                    chainName: 'Arbitrum One',
                    nativeCurrency: {
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                    },
                    rpcUrls: ['https://arb1.arbitrum.io/rpc'], // Endpoint RPC Arbitrum One
                    blockExplorerUrls: ['https://arbiscan.io/'], // Explorer Arbitrum One
                },
                ],
            });
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            userSigner = provider.getSigner(); // Stocker le signer pour une utilisation ultérieure
            const userAddress = await userSigner.getAddress();

            // Modifier le contenu pour afficher l'adresse de l'utilisateur
            const addressElement = document.getElementById('userAddress');
            addressElement.innerText = 'Adresse : ' + userAddress;
            
            // Afficher le contenu après la connexion réussie
            document.getElementById('content').style.display = 'block';
            
            // Cacher le bouton de connexion
            document.getElementById('connectButton').style.display = 'none';

            // Afficher les détails de l'utilisateur
            document.getElementById('userDetails').style.display = 'block';
        } catch (err) {
            console.error('Connexion rejetée', err);
        }
    } else {
        console.error('Web3 non disponible');
    }
}

// Fonction pour se connecter et afficher le contenu
function connectAndDisplayContent() {
    displayUserAddress();
}

// Fonction pour déconnecter l'utilisateur
function disconnect() {
    userSigner = null; // Réinitialiser le signer
    document.getElementById('content').style.display = 'none'; // Cacher le contenu
    document.getElementById('connectButton').style.display = 'block'; // Afficher le bouton de connexion
    document.getElementById('userDetails').style.display = 'none'; // Cacher les détails de l'utilisateur
}

async function increaseLiquidity() {
    if (!userSigner) {
        console.error('Utilisateur non connecté');
        return;
    }

    const uniswapContract = new ethers.Contract(contractAddress, contractAbi, userSigner);
  
    try {
        const increase_tokenId = document.getElementById('increase_tokenId').value;
        const increase_amount0 = document.getElementById('increase_amount0').value;
        const increase_amount1 = document.getElementById('increase_amount1').value;

        // Vérifiez que les montants désirés sont des nombres valides
        if (isNaN(increase_amount0) || isNaN(increase_amount1)) {
            console.error('Montants désirés non valides');
            return;
        }
  
        const increaseParams = {
            tokenId: increase_tokenId,
            amount0Desired: ethers.utils.parseUnits(increase_amount0, 18),
            amount1Desired: ethers.utils.parseUnits(increase_amount1, 18),
            amount0Min: ethers.BigNumber.from(0),
            amount1Min: ethers.BigNumber.from(0),
            deadline: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
        };

        console.log('increaseParams:', increaseParams);
  
        // Appelez la fonction de l'utilisateur avec les paramètres
        const result = await uniswapContract.increaseLiquidity(increaseParams);
    
        console.log('Transaction réussie:', result);
    } catch (error) {
        console.error('Erreur lors de l\'augmentation de la liquidité,', error);
    }
}

async function addLiquidity() {
    if (!userSigner) {
        console.error('Utilisateur non connecté');
        return;
    }

    const uniswapContract = new ethers.Contract(contractAddress, contractAbi, userSigner);
  
    try {
        const add_token0 = document.getElementById('add_token0').value;
        const add_token1 = document.getElementById('add_token1').value;
        const add_fee = document.getElementById('add_fee').value;
        const add_tickLower = document.getElementById('add_tickLower').value;
        const add_tickUpper = document.getElementById('add_tickUpper').value;
        const add_amount0 = document.getElementById('add_amount0').value;
        const add_amount1 = document.getElementById('add_amount1').value;

        // Vérifiez que les montants désirés sont des nombres valides
        if (isNaN(add_amount0) || isNaN(add_amount1)) {
            console.error('Montants désirés non valides');
            return;
        }
  
        const addParams = {
            token0: add_token0,
            token1: add_token1,
            fee: add_fee,
            tickLower: add_tickLower,
            tickUpper: add_tickUpper,
            amount0Desired: ethers.utils.parseUnits(add_amount0, 18),
            amount1Desired: ethers.utils.parseUnits(add_amount1, 18),
            amount0Min: ethers.BigNumber.from(0),
            amount1Min: ethers.BigNumber.from(0),
            recipient: userSigner.getAddress(),
            deadline: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
        };

        console.log('addParams:', addParams);
  
        // Appelez la fonction de l'utilisateur avec les paramètres
        const result = await uniswapContract.mint(addParams);
    
        console.log('Transaction réussie:', result);
    } catch (error) {
        console.error('Erreur lors de la création de la liquidité,', error);
    }
}

// Appel de la fonction pour afficher l'adresse de l'utilisateur si connecté
displayUserAddress();
