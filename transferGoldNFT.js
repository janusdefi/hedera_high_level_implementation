const {
    Client,
    TransferTransaction,
    PrivateKey,
    TokenId
} = require("@hashgraph/sdk");
require("dotenv").config();

async function transferGoldNFT(fromAccountId, toAccountId, nftTokenId, serialNumber) {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const transaction = new TransferTransaction()
        .addNftTransfer(new TokenId(nftTokenId), fromAccountId, toAccountId, serialNumber)
        .freezeWith(client)
        .sign(operatorKey);

    const response = await transaction.execute(client);
    console.log(`Transferred NFT Serial ${serialNumber} from ${fromAccountId} to ${toAccountId}`);
}

transferGoldNFT("0.0.123456", "0.0.654321", "0.0.999999", 1); // Example Transfer
