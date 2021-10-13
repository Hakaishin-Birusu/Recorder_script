var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');
const { BigNumber } = require('ethers/lib');
var fs = require('fs');
var obj = {
    'keyTable': []
};

const initKey = BigNumber.from('0x2b79655f4622632835a79cffffffffffffffffffffffffffffffffffffffffff');
let endKey = '0x00000000000000000000000000000000000000000000000000000000FFFFFFFF';
let privateKeyHex = initKey;
let privateKeyString = privateKeyHex._hex.toString();
let fileCount = 1;
let logger = 1;

while (privateKeyString != endKey) {

    privateKeyHex = privateKeyHex.add(1);

    privateKeyString = privateKeyHex._hex.toString();
    const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
    const wallet = Wallet['default'].fromPrivateKey(privateKeyBuffer);
    const address = wallet.getAddressString();

    obj.keyTable.push({ "privateKey": privateKeyString, "publicKey": address });

    ++logger;

    if (logger % 1000000 == 0) {
        console.log("LOGGER COUNT ========", logger);
        console.log("address", address);
        console.log("privateKeyString", privateKeyString);

        let deploymentString = JSON.stringify(obj, null, 4);
        fs.writeFileSync(`GroupA_${fileCount}.json`, deploymentString)

        delete obj;
        obj.keyTable.length = 0;
        ++fileCount;
    }
}

console.log("!!!!!!-=-==-=-=-==-= Done =-=-==-==-==-=!!!!!");