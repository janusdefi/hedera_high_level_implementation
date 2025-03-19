/**
 * This script deploys an NFT Marketplace contract to the Hedera network.
 * It uses the Hedera SDK to create a client, upload the contract bytecode, and deploy the contract.
 * 
 * Dependencies:
 * - @hashgraph/sdk: Hedera SDK for interacting with the Hedera network.
 * - fs: Node.js file system module for reading the contract bytecode file.
 * - dotenv: Module to load environment variables from a .env file.
 * 
 * Usage:
 * Ensure that the following environment variables are set in a .env file:
 * - MY_ACCOUNT_ID: Your Hedera account ID.
 * - MY_PRIVATE_KEY: Your Hedera private key.
 */

const {
    Client,
    ContractCreateTransaction,
    FileCreateTransaction,
    Hbar,
    PrivateKey
} = require("@hashgraph/sdk");
const fs = require("fs");
require("dotenv").config();

/**
 * Asynchronously deploys the NFT Marketplace contract to the Hedera network.
 */
async function deployNFTMarketplace() {
    // Retrieve operator credentials from environment variables
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // Load compiled NFT Marketplace contract bytecode from file
    const contractBytecode = fs.readFileSync("GoldNFTMarketplace.bin");

    // Upload contract bytecode to Hedera File Service
    const fileTx = new FileCreateTransaction()
        .setContents(contractBytecode)
        .freezeWith(client)
        .sign(operatorKey);
    const fileResponse = await fileTx.execute(client);
    const fileReceipt = await fileResponse.getReceipt(client);
    const bytecodeFileId = fileReceipt.fileId;
    console.log(`NFT Marketplace Bytecode File ID: ${bytecodeFileId}`);

    // Deploy contract using the uploaded bytecode file ID
    const contractTx = new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(5000000)
        .setAdminKey(operatorKey)
        .freezeWith(client)
        .sign(operatorKey);
    const contractResponse = await contractTx.execute(client);
    const contractReceipt = await contractResponse.getReceipt(client);
    console.log(`NFT Marketplace Contract ID: ${contractReceipt.contractId}`);
}

// Execute the deployment function
deployNFTMarketplace();
        .setBytecodeFileId(bytecodeFileId)
        .setGas(5000000)
        .setAdminKey(operatorKey)
        .freezeWith(client)
        .sign(operatorKey);
    const contractResponse = await contractTx.execute(client);
    const contractReceipt = await contractResponse.getReceipt(client);
    console.log(`NFT Marketplace Contract ID: ${contractReceipt.contractId}`);
}

deployNFTMarketplace();
