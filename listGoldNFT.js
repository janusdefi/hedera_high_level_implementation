// Import required classes and modules from the Hedera SDK
const {
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    PrivateKey
} = require("@hashgraph/sdk");

// Load environment variables from the .env file
require("dotenv").config();

/**
 * Function to list an NFT for sale on a Hedera-based marketplace.
 * 
 * @param {number} nftTokenId - The ID of the NFT to be listed for sale.
 * @param {number} price - The price (in HBAR) at which the NFT will be listed.
 */
async function listNFTForSale(nftTokenId, price) {
    // Retrieve the operator's account ID and private key from environment variables
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    // Create a Hedera client for the testnet and set the operator credentials
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // Replace with the actual contract ID of your marketplace smart contract
    const contractId = "YOUR_MARKETPLACE_CONTRACT_ID";

    // Create a transaction to call the "listNFT" function on the smart contract
    const transaction = new ContractExecuteTransaction()
        .setContractId(contractId) // Set the contract ID
        .setGas(2000000) // Set the gas limit for the transaction
        .setFunction(
            "listNFT", // Name of the smart contract function to call
            new ContractFunctionParameters()
                .addUint256(nftTokenId) // Add the NFT token ID as a parameter
                .addUint256(price) // Add the price as a parameter
        )
        .freezeWith(client) // Freeze the transaction for signing
        .sign(operatorKey); // Sign the transaction with the operator's private key

    // Execute the transaction on the Hedera network
    const response = await transaction.execute(client);

    // Log a success message with the NFT ID and price
    console.log(`NFT ${nftTokenId} listed for sale at ${price} HBAR.`);
}

// Example usage: List NFT ID #1 for 1000 HBAR
listNFTForSale(1, 1000);