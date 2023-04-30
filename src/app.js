const { testnet, mainnet } = require("bitcore-lib/lib/networks");
const { createWallet, createHDWallet } = require("./bitty-wallet");
const sendBitcoin = require("./send-bitty");

sendBitcoin("mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt", 0.02)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// console.log(createHDWallet(testnet));
