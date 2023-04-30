// sending bitcoin
const axios = require("axios");
const bitcore = require("bitcore-lib");

module.exports = sendBitcoin = async (receiverAddress, amountToSend) => {
  try {
    // will need to use another API for send functionality
    const sochain_network = "BTCTEST";
    const privateKey =
      "d2a2d325596912b2c1b4ca90e47b9b2278dbbdb80429f8cef5010eb084c8d8f5";
    const sourceAddress = "n15eYCiK3yxBpdEy8QZgEa5ST4FLRiy1pq";
    const satoshiToSend = amountToSend * 100000000;
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;

    // THIS WILL NEED TO BE UPDATED SOCHAIN API HAS BEEN CHANGED
    const response = await axios.get(
      `https://chain.so/api/v3/unspent_outputs/${sochain_network}/${sourceAddress}/${page}`
    );

    const recommendedFee = await axios.get(
      "https://bitcoinfees.earn.com/api/v1/fees/recommended"
    );

    const transaction = new bitcore.Transaction();
    let totalAmountAvailable = 0;

    let inputs = [];
    let utxos = response.data.data.txs;

    for (const element of utxos) {
      let utxo = {};
      utxo.satoshis = Math.floor(Number(element.value) * 100000000);
      utxo.script = element.script_hex;
      utxo.address = response.data.data.address;
      utxo.txId = element.txid;
      utxo.outputIndex = element.output_no;
      totalAmountAvailable += utxo.satoshis;
      inputCount += 1;
      inputs.push(utxo);
    }

    /**
     * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
     * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
     * from the transaction as well.
     * */

    const transactionSize =
      inputCount * 180 + outputCount * 34 + 10 - inputCount;

    fee = (transactionSize * recommendedFee.data.hourFee) / 3; // satoshi per byte
    if (totalAmountAvailable - satoshiToSend - fee < 0) {
      throw new Error("Balance is too low for this transaction");
    }
    //Set transaction input
    transaction.from(inputs);

    // set the recieving address and the amount to send
    transaction.to(recieverAddress, satoshiToSend);

    // Set change address - Address to receive the left over funds after transfer
    transaction.change(sourceAddress);

    //manually set transaction fees: 20 satoshis per byte
    transaction.fee(Math.round(fee));

    // Sign transaction with your private key
    transaction.sign(privateKey);

    // serialize Transactions
    const serializedTransaction = transaction.serialize();

    // Send transaction
    // THIS WILL NEED TO BE UPDATED SOCHAIN API HAS BEEN CHANGED
    const result = await axios({
      method: "POST",
      url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
      data: {
        tx_hex: serializedTransaction,
      },
    });
    return result.data.data;
  } catch (error) {
    return error;
  }
};
