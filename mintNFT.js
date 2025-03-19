const {
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    PrivateKey
} = require("@hashgraph/sdk");
require("dotenv").config();

async function mintGoldNFT(toAddress, goldAmount) {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const contractId = "YOUR_GOLD_NFT_CONTRACT_ID"; // Replace with deployed contract ID

    const transaction = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(2000000)
        .setFunction(
            "mintNFT",
            new ContractFunctionParameters().addAddress(toAddress).addUint256(goldAmount)
        )
        .freezeWith(client)
        .sign(operatorKey);

    const response = await transaction.execute(client);
    console.log(`Minted NFT for ${goldAmount} grams of gold to ${toAddress}`);
}

mintGoldNFT("0.0.123456", 100); // Mint NFT representing 100 grams of gold
