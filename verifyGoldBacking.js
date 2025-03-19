const {
    Client,
    ContractCallQuery,
    ContractFunctionParameters,
    PrivateKey
} = require("@hashgraph/sdk");
require("dotenv").config();

async function getGoldAmount(nftTokenId) {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const contractId = "YOUR_GOLD_NFT_CONTRACT_ID"; // Replace with deployed contract ID

    const query = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("getGoldAmount", new ContractFunctionParameters().addUint256(nftTokenId));

    const response = await query.execute(client);
    console.log(`Gold Amount Backing NFT ${nftTokenId}: ${response.getUint256(0)} grams`);
}

getGoldAmount(1); // Fetch details of NFT #1
