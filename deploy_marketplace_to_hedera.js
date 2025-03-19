const {
    Client,
    ContractCreateTransaction,
    FileCreateTransaction,
    Hbar,
    PrivateKey
} = require("@hashgraph/sdk");
const fs = require("fs");
require("dotenv").config();

async function deployNFTMarketplace() {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // Load compiled NFT Marketplace contract bytecode
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

    // Deploy contract
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

deployNFTMarketplace();
