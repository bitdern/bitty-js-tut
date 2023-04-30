const { testnet, mainnet } = require("bitcore-lib/lib/networks");
const { createWallet, createHDWallet } = require("./bitty-wallet");
const sendBitcoin = require("./send-bitty");

console.log(createHDWallet(testnet));
