const {
    Client,
    ContractCreateTransaction,
    FileCreateTransaction,
    Hbar,
    PrivateKey
} = require("@hashgraph/sdk");
const fs = require("fs");
require("dotenv").config();

async function deployGoldOracle() {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // Load compiled Oracle bytecode
    const contractBytecode = fs.readFileSync("GoldOracle.bin");

    // Upload to Hedera
    const fileTx = new FileCreateTransaction()
        .setContents(contractBytecode)
        .freezeWith(client)
        .sign(operatorKey);
    const fileResponse = await fileTx.execute(client);
    const fileReceipt = await fileResponse.getReceipt(client);
    const bytecodeFileId = fileReceipt.fileId;
    console.log(`Gold Oracle Bytecode File ID: ${bytecodeFileId}`);

    // Deploy contract
    const contractTx = new ContractCreateTransaction()
        .setBytecodeFileId(bytecodeFileId)
        .setGas(3000000)
        .setAdminKey(operatorKey)
        .freezeWith(client)
        .sign(operatorKey);
    const contractResponse = await contractTx.execute(client);
    const contractReceipt = await contractResponse.getReceipt(client);
    console.log(`Gold Oracle Contract ID: ${contractReceipt.contractId}`);
}

deployGoldOracle();
