const {
    Client,
    ContractCreateTransaction,
    FileCreateTransaction,
    Hbar,
    PrivateKey
} = require("@hashgraph/sdk");
const fs = require("fs");
require("dotenv").config();

async function deployGoldAI() {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // Load compiled AI Gold Management bytecode
    const contractBytecode = fs.readFileSync("AIGoldManagement.bin");

    // Upload bytecode to Hedera
    const fileTx = new FileCreateTransaction()
        .setContents(contractBytecode)
        .freezeWith(client)
        .sign(operatorKey);
    const fileResponse = await fileTx.execute(client);
    const fileReceipt = await fileResponse.getReceipt(client);
    const bytecodeFileId = fileReceipt.fileId;
    console.log(`AI Gold Management Bytecode File ID: ${bytecodeFileId}`);

    // Deploy contract
    const contractTx = new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(4000000)
        .setAdminKey(operatorKey)
        .freezeWith(client)
        .sign(operatorKey);
    const contractResponse = await contractTx.execute(client);
    const contractReceipt = await contractResponse.getReceipt(client);
    console.log(`AI Gold Management Contract ID: ${contractReceipt.contractId}`);
}

deployGoldAI();
