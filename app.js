let userSigner; // Variable pour stocker le signer de l'utilisateur

// Adresse du contrat et son ABI
const contractAddress = '0xc36442b4a4522e871399cd717abdd847ab11fe88';
const contractAbi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"},{"internalType":"address","name":"_tokenDescriptor_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"DecreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"IncreaseLiquidity","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const erc20Abi = [{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const poolSpacing = [{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"}];

const decimalsFromAsset = {
    "0x93b346b6BC2548dA6A1E7d98E9a421B42541425b": {
        "name": "LUSD",
        "decimals": 18
    },
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831": {
        "name": "USDC",
        "decimals": 6
    },
    "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1": {
        "name": "DAI",
        "decimals": 18
    },
    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1": {
        "name": "wETH",
        "decimals": 18
    },
    "0x5979D7b546E38E414F7E9822514be443A4800529": {
        "name": "wstETH",
        "decimals": 18
    }
}

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

    // Set deadline to 5 minutes from now
    const deadline = Math.floor(Date.now() / 1000) + 60 * 5;
    document.getElementById('add_deadline').value = deadline;
    document.getElementById('increase_deadline').value = deadline;

    // Default placeholder values
    // wstETH
    document.getElementById('add_token0').value = '0x5979D7b546E38E414F7E9822514be443A4800529';
    // wETH
    document.getElementById('add_token1').value = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
    // Fees 0.01%
    document.getElementById('add_fee').value = 100;
    // Tick lower
    document.getElementById('add_tickLower').value = 1465;
    // Tick upper
    document.getElementById('add_tickUpper').value = 1466;
    // Amount 0
    document.getElementById('add_amount0').value = 1;
    // Amount 1
    document.getElementById('add_amount1').value = 1;
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
        const deadline = document.getElementById('increase_deadline').value;

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
            deadline: deadline
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
        const deadline = document.getElementById('add_deadline').value;

        // Vérifiez que les montants désirés sont des nombres valides
        if (isNaN(add_amount0) || isNaN(add_amount1)) {
            console.error('Montants désirés non valides');
            return;
        }

        // Export for Etherscan / Tenderly
        console.log("Export pour Etherscan :")
        // OK : ["0x93b346b6bc2548da6a1e7d98e9a421b42541425b","0xaf88d065e77c8cc2239327c5edb3a432268e5831",500,-276358,-276355,"100","100","0","0","0x54240c950ff793a4eb5895a56f859216cb1c3f0d","9707329724"]
        // ["0x93b346b6bc2548da6a1e7d98e9a421b42541425b","0xaf88d065e77c8cc2239327c5edb3a432268e5831","500","-276358","-276355","100","100","0","0","0x54240c950ff793a4eb5895a56f859216cb1c3f0d","1707329724"]
        console.log('["%s","%s",%s,%s,%s,%s,%s,0,0,"%s",%s]',add_token0, add_token1, add_fee, add_tickLower, add_tickUpper, add_amount0, add_amount1, await userSigner.getAddress(), deadline);
        console.log("Export pour Tenderly :")
        console.log('{"token0":"%s","token1":"%s","fee":"%s","tickLower":"%s","tickUpper":"%s","amount0Desired":"%s","amount1Desired":"%s","amount0Min":"0","amount1Min":"0","recipient":"%s","deadline":"%s"}',add_token0, add_token1, add_fee,add_tickLower,add_tickUpper,ethers.utils.parseUnits(add_amount0, 18),ethers.utils.parseUnits(add_amount1, 18),await userSigner.getAddress(),deadline);
    
        const addParams = {
            token0: add_token0,
            token1: add_token1,
            fee: add_fee,
            tickLower: add_tickLower,
            tickUpper: add_tickUpper,
            amount0Desired: ethers.utils.parseUnits(add_amount0, decimalsFromAsset[add_token0].decimals),
            amount1Desired: ethers.utils.parseUnits(add_amount1, decimalsFromAsset[add_token1].decimals),
            amount0Min: ethers.BigNumber.from(0),
            amount1Min: ethers.BigNumber.from(0),
            recipient: userSigner.getAddress(),
            deadline: deadline,
        };

        console.log('addParams:', addParams);
  
        // Appelez la fonction de l'utilisateur avec les paramètres
        const result = await uniswapContract.mint(addParams);
    
        console.log('Transaction réussie:', result);
    } catch (error) {
        console.error('Erreur lors de la création de la liquidité,', error);
    }
}

async function getAllowance(tokenAddress) {
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, userSigner);

    try {
        const allowance = await tokenContract.allowance(userSigner.getAddress(), contractAddress);
        return allowance.toString();
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'autorisation,', error);
    }
}

// Get allowance for token
async function checkAllowance() {
    const token0contractAddress = document.getElementById('add_token0').value;
    const token1contractAddress = document.getElementById('add_token1').value;

    // Get allowance for tokens
    const token0allowance = await getAllowance(token0contractAddress);
    const token1allowance = await getAllowance(token1contractAddress);

    // Format and display allowance with decimals
    const token0allowanceFormatted = ethers.utils.formatUnits(token0allowance,decimalsFromAsset[token0contractAddress].decimals);
    const token1allowanceFormatted = ethers.utils.formatUnits(token1allowance,decimalsFromAsset[token1contractAddress].decimals);

    // Debug
    console.log("Allowance for token0 : ", token0allowanceFormatted);
    console.log("Allowance for token1 : ", token1allowanceFormatted);

    document.getElementById('allowedAmount0').innerHTML = token0allowanceFormatted;
    document.getElementById('allowedAmount1').innerHTML = token1allowanceFormatted;
}

// Increase allowance
async function increaseAllowance(tokenAddress, allowanceValue) {
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, userSigner);

    try {
        await tokenContract.increaseAllowance(
            contractAddress,
            ethers.utils.parseUnits(allowanceValue, decimalsFromAsset[tokenAddress].decimals)
        );
    } catch (error) {
        console.error('Erreur lors de l\'augmentation de l\'autorisation,', error);
    }
}

async function increaseAllowanceToken0() {
    const token0contractAddress = document.getElementById('add_token0').value;
    const increaseAllowanceValue = document.getElementById('increaseAllowance0').value;
    increaseAllowance(token0contractAddress, increaseAllowanceValue);
}

async function increaseAllowanceToken1() {
    const token0contractAddress = document.getElementById('add_token1').value;
    const increaseAllowanceValue = document.getElementById('increaseAllowance1').value;
    increaseAllowance(token0contractAddress, increaseAllowanceValue);
}

// Get tick spacing
async function getTickSpacing() {
    const poolAddress = document.getElementById('poolTickSpacing').value;
    console.log('Pool address:', poolAddress);
    const poolContract = new ethers.Contract(poolAddress, poolSpacing, userSigner);
    const tickSpacing = await poolContract.tickSpacing();
    console.log('Tick spacing:', await tickSpacing.toString());
    document.getElementById('tickSpacing').innerHTML = tickSpacing.toString();
}

// Appel de la fonction pour afficher l'adresse de l'utilisateur si connecté
connectAndDisplayContent();
