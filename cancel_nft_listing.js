async function cancelListing(nftTokenId) {
    const operatorId = process.env.MY_ACCOUNT_ID;
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const contractId = "YOUR_MARKETPLACE_CONTRACT_ID"; // Replace with actual contract ID

    const transaction = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(2000000)
        .setFunction("cancelListing", new ContractFunctionParameters().addUint256(nftTokenId))
        .freezeWith(client)
        .sign(operatorKey);

    const response = await transaction.execute(client);
    console.log(`Listing for NFT ${nftTokenId} canceled.`);
}

cancelListing(1); // Cancel NFT ID #1 listing
