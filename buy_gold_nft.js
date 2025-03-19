const {
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    PrivateKey
} = require("@hashgraph/sdk");
require("dotenv").config();

async function buyNFT(nftTokenId, price) {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const contractId = "YOUR_MARKETPLACE_CONTRACT_ID"; // Replace with actual contract ID

    const transaction = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(2000000)
        .setPayableAmount(price) // Send HBAR as payment
        .setFunction("buyNFT", new ContractFunctionParameters().addUint256(nftTokenId))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await transaction.execute(client);
    console.log(`NFT ${nftTokenId} purchased for ${price} HBAR.`);
}

buyNFT(1, 1000); // Buy NFT ID #1 for 1000 HBAR
