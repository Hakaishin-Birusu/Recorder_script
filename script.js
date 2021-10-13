var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');
const { BigNumber } = require('ethers/lib');

const initKey = BigNumber.from('0x2b79655f4622632835a79c000000000000000000000000000000000021b1cb1d');
let endKey = '0x2b79655f4622632835a79cffffffffffffffffffffffffffffffffffffffffff';
let key = "0xb86bA7484eb7Fb6857e4Df3F5d62693EDF352815";

let keyLower = key.toLowerCase();
console.log("keyLower", keyLower)
let privateKeyHex = initKey;
let privateKeyString = privateKeyHex._hex.toString();

let logger = 1;

while (privateKeyString != endKey) {
    privateKeyHex = privateKeyHex.add(1);

    privateKeyString = privateKeyHex._hex.toString();
    const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
    const wallet = Wallet['default'].fromPrivateKey(privateKeyBuffer);
    const address = wallet.getAddressString();

    if (address.toLowerCase() == keyLower) {
        console.log("<<<<<<<<<===========================> HIT HIT HIT <============================>>>>>>");
        console.log("address", address);
        console.log("privateKeyString", privateKeyString);
        return;
    }

    ++logger;
    if (logger % 100000 == 0) {
        console.log("LOGGER COUNT ========", logger);
        console.log("address", address);
        console.log("privateKeyString", privateKeyString);
    }
}
