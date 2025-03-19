const { Client, TokenCreateTransaction, TokenType, TokenSupplyType, PrivateKey } = require("@hashgraph/sdk");
require("dotenv").config();

async function createGoldToken() {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const transaction = new TokenCreateTransaction()
        .setTokenName("Janus Gold")
        .setTokenSymbol("JGLD")
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(operatorId)
        .setInitialSupply(0)
        .setDecimals(8)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(1000000)
        .freezeWith(client)
        .sign(operatorKey);

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);
    console.log(`JGLD Token Created: ${receipt.tokenId.toString()}`);
}

createGoldToken();
