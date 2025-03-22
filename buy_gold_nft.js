// Import necessary classes from the Hedera SDK
const {
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    PrivateKey
} = require("@hashgraph/sdk");

// Load environment variables from a .env file
require("dotenv").config();

/**
 * Buys an NFT by interacting with a smart contract on the Hedera network.
 * 
 * @param {number} nftTokenId - The ID of the NFT to purchase.
 * @param {number} price - The price to pay for the NFT in HBAR.
 */
async function buyNFT(nftTokenId, price) {
    // Retrieve the operator account ID and private key from environment variables
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    // Create a client for the Hedera testnet and set the operator
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // Define the smart contract ID for the marketplace (replace with actual contract ID)
    const contractId = "YOUR_MARKETPLACE_CONTRACT_ID"; 

    // Create a transaction to execute the "buyNFT" function on the smart contract
    const transaction = new ContractExecuteTransaction()
        .setContractId(contractId)                     // Set the contract ID
        .setGas(2000000)                              // Set the gas limit
        .setPayableAmount(price)                      // Set the amount of HBAR to send as payment
        .setFunction("buyNFT", 
            new ContractFunctionParameters().addUint256(nftTokenId)  // Add the NFT token ID as a parameter
        )
        .freezeWith(client)                          // Freeze the transaction with the client
        .sign(operatorKey);                          // Sign the transaction with the operator's private key

    // Execute the transaction
    const response = await transaction.execute(client);

    // Log the result of the purchase
    console.log(`NFT ${nftTokenId} purchased for ${price} HBAR.`);
}

// Example usage: Buy NFT ID #1 for 1000 HBAR
buyNFT(1, 1000); 
