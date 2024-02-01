const { config } = require("dotenv");
const { Bundler } = require("@biconomy/bundler"); 
const { ethers } = require('ethers');
const { ChainId } = require('@biconomy/core-types'); 
const { BiconomyPaymaster, PaymasterMode } = require('@biconomy/paymaster')
const { DEFAULT_ENTRYPOINT_ADDRESS, BiconomySmartAccountV2 } = require('@biconomy/account')
const { MultiChainValidationModule, DEFAULT_MULTICHAIN_MODULE } = require('@biconomy/modules')

config(); // Load environment variables from .env file


let provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_POLYGON_MUMBAI);
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// create chain agnostic ECDSA signature
const multiChainModule = async () => {
    const res = await MultiChainValidationModule.create({
        signer: wallet,
        moduleAddress: DEFAULT_MULTICHAIN_MODULE,
    });
    return res;
}

// Configure the Biconomy Bundlers
const bundler_mumbai = new Bundler({
    bundlerUrl: process.env.BUNDLER_MUMBAI, // URL to the Biconomy bundler service
    chainId: ChainId.POLYGON_MUMBAI, // Chain ID for Polygon Mumbai test network
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, // Default entry point address for the bundler
});

const bundler_arbitrum_sepolia = new Bundler({
    bundlerUrl: process.env.BUNDLER_ARBITRUM_SEPOLIA, 
    chainId: ChainId.ARBITRUM_SEPOLIA, 
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, 
});

const bundler_optimism_goerli = new Bundler({
    bundlerUrl: process.env.BUNDLER_OPTIMISM_GOERLI, 
    chainId: ChainId.OPTIMISM_GOERLI_TESTNET, 
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, 
});

const bundler_linea = new Bundler({
    bundlerUrl: process.env.BUNDLER_LINEA,
    chainId: ChainId.LINEA_TESTNET, 
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, 
});

const bundler_base_goerli = new Bundler({
    bundlerUrl: process.env.BUNDLER_BASE_GOERLI, 
    chainId: ChainId.BASE_GOERLI_TESTNET, 
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, 
});


// Configure the Paymasters
const paymaster_mumbai = new BiconomyPaymaster({
    paymasterUrl: process.env.PAYMASTER_MUMBAI, // URL to the Biconomy paymaster service
});

const paymaster_arbitrum_sepolia = new BiconomyPaymaster({
    paymasterUrl: process.env.PAYMASTER_ARBITRUM_SEPOLIA, 
});

const paymaster_optimism_goerli = new BiconomyPaymaster({
    paymasterUrl: process.env.PAYMASTER_OPTIMISM_GOERLI, 
});

const paymaster_linea = new BiconomyPaymaster({
    paymasterUrl: process.env.PAYMASTER_LINEA, 
});

const paymaster_base_goerli = new BiconomyPaymaster({
    paymasterUrl: process.env.PYMASTER_BASE_GOERLI, 
});


// Function to create a Smart Account
createSmartAccount = async (chainId, bundler, paymaster) => {
    const module = await multiChainModule()
    let smartAccount = await BiconomySmartAccountV2.create({
        chainId: chainId, 
        bundler: bundler, 
        paymaster: paymaster, 
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, 
        defaultValidationModule: module, 
        activeValidationModule: module, 
    });
    console.log(
        "Smart Account Address: ",
        await smartAccount.getAccountAddress(), // Logging the address of the created smart account
    );
    return smartAccount;
}

async function mintNFT() {
    const mumbaiAccount = await createSmartAccount(ChainId.POLYGON_MUMBAI, bundler_mumbai, paymaster_mumbai)
    console.log('Contract address (Polygon Mumbai):', await mumbaiAccount.getAccountAddress())
    
    const arbitrumAccount = await createSmartAccount(ChainId.ARBITRUM_SEPOLIA, bundler_arbitrum_sepolia, paymaster_arbitrum_sepolia)
    console.log('Contract address (Arbitrum Sepolia):',await arbitrumAccount.getAccountAddress())

    const optimismAccount = await createSmartAccount(ChainId.OPTIMISM_GOERLI_TESTNET, bundler_optimism_goerli, paymaster_optimism_goerli)
    console.log('Contract address (Optimism Goerli):',await optimismAccount.getAccountAddress())

    const lineaAccount = await createSmartAccount(ChainId.LINEA_TESTNET, bundler_linea, paymaster_linea)
    console.log('Contract address (Linea Goerli):',await lineaAccount.getAccountAddress())

    const baseAccount = await createSmartAccount(ChainId.BASE_GOERLI_TESTNET, bundler_base_goerli, paymaster_base_goerli)
    console.log('Contract address (BASE Goerli):',await baseAccount.getAccountAddress())

    // Define the interface for the NFT contract and encode data for the 'safeMint' function
    const nftInterface = new ethers.utils.Interface([
        "function safeMint(address _to)",
    ]);
    // console.log(nftInterface)
    const data = nftInterface.encodeFunctionData("safeMint", [
        await mumbaiAccount.getAccountAddress(),
    ]);
    const nftAddress = "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e";

    // Build user operations for the Polygon Mumbai network
    let partialUserOp = await mumbaiAccount.buildUserOp(
        [{ to: nftAddress, data }],
        {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        },
    );
    // console.log(partialUserOp)

    // Build user operations for the Arbitrum Sepolia network
    let partialUserOp2 = await arbitrumAccount.buildUserOp(
        [{ to: nftAddress, data }],
        {
            paymasterServiceData: {
                mode: PaymasterMode.SPONSORED
            },
        },
    );
    // console.log(partialUserOp2)

    // Build user operations for the Optimism Goerli network
    let partialUserOp3 = await optimismAccount.buildUserOp(
        [{ to: nftAddress, data }],
        {
            paymasterServiceData: {
                mode: PaymasterMode.SPONSORED
            },
        },
    );
    // console.log(partialUserOp3)

    // Build user operations for the LInea Goerli network
    let partialUserOp4 = await lineaAccount.buildUserOp(
        [{ to: nftAddress, data }],
        {
            paymasterServiceData: {
                mode: PaymasterMode.SPONSORED
            },
        },
    );
    // console.log(partialUserOp4)

     // Build user operations for the Base Goerli network
    let partialUserOp5 = await baseAccount.buildUserOp(
        [{ to: nftAddress, data }],
        {
            paymasterServiceData: {
                mode: PaymasterMode.SPONSORED
            },
        },
    );
    // console.log(partialUserOp5)
    


    // Sign operations for all networks using single ECDSA signature
    // using multiChainModule()

    const resolvedOps = await (
        await multiChainModule()
    ).signUserOps([
        { userOp: partialUserOp, chainId: ChainId.POLYGON_MUMBAI },
        { userOp: partialUserOp2, chainId: ChainId.ARBITRUM_SEPOLIA },
        { userOp: partialUserOp3, chainId: ChainId.OPTIMISM_GOERLI_TESTNET },
        { userOp: partialUserOp4, chainId: ChainId.LINEA_TESTNET },
        { userOp: partialUserOp5, chainId: ChainId.BASE_GOERLI_TESTNET },
    ]);
    // console.log(resolvedOps)


    // Execute the operations on all networks and log the transaction details
    try {
        const userOpResponse1 = await mumbaiAccount.sendSignedUserOp(resolvedOps[0]);
        const userOpResponse2 = await arbitrumAccount.sendSignedUserOp(resolvedOps[1]);
        const userOpResponse3 = await optimismAccount.sendSignedUserOp(resolvedOps[2]);
        const userOpResponse4 = await lineaAccount.sendSignedUserOp(resolvedOps[3]);
        const userOpResponse5 = await baseAccount.sendSignedUserOp(resolvedOps[4]);

        const transactionDetails1 = await userOpResponse1.wait();
        const transactionDetails2 = await userOpResponse2.wait();
        const transactionDetails3 = await userOpResponse3.wait();
        const transactionDetails4 = await userOpResponse4.wait();
        const transactionDetails5 = await userOpResponse5.wait();

        console.log("Polygon Mumbai Transaction: https://mumbai.polygonscan.com/tx/" + transactionDetails1.receipt.transactionHash);
        console.log("Arbitrum Sepolia Transaction: https://sepolia.arbiscan.io/tx/" + transactionDetails2.receipt.transactionHash);
        console.log("Optimism Goerli Transaction: https://goerli-optimism.etherscan.io/tx/" + transactionDetails3.receipt.transactionHash);
        console.log("Linea Goerli Transaction: https://explorer.goerli.linea.build/tx/" + transactionDetails4.receipt.transactionHash);
        console.log("Base Goerli Transaction: https://goerli.basescan.org/tx/" + transactionDetails5.receipt.transactionHash);
    } catch (error) {
        console.log("Error encountered: ", error);
    }
}


mintNFT()