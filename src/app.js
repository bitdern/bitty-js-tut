const { testnet, mainnet } = require("bitcore-lib/lib/networks");
const { createWallet, createHDWallet } = require("./bitty-wallet");
const sendBitcoin = require("./send-bitty");

sendBitcoin("tb1qw2c3lxufxqe2x9s4rdzh65tpf4d7fssjgh8nv6", 0.02)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// console.log(createHDWallet(testnet));
