var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');
const {  BigNumber } = require('ethers/lib');
var jsonfile = require('jsonfile');
var obj = {
    'keyTable': []
};

let lowerLoopRange = 0;
const upparLoopRange = 10000000;

// const initKey = BigNumber.from('0x2b79655f4622632835a79c000000000000000000000000000000000000000000');

const initKey = BigNumber.from('0x2b79655f4622632835a79c00000000000000000000000000000000001019661f');
// let endKey ='0x2b79655f4622632835a79cffffffffffffffffffffffffffffffffffffffffff';

let privateKeyHex = initKey;

while (lowerLoopRange != upparLoopRange) {
    privateKeyHex = privateKeyHex.add(1);

    const privateKeyString = privateKeyHex._hex.toString();
    const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
    const wallet = Wallet['default'].fromPrivateKey(privateKeyBuffer);
    const address = wallet.getAddressString();

    obj.keyTable.push({ "id": lowerLoopRange, "privateKey": privateKeyString, "publicKey": address });
    console.log("gen :", lowerLoopRange, ":", address);

    ++lowerLoopRange;
}

jsonfile.writeFile(`keyStore1_.${privateKeyHex._hex.toString()}.json`, obj, { spaces: 2 }, function (err) {
    console.log(err);
});