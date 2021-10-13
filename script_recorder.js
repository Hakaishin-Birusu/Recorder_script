var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');
const { BigNumber } = require('ethers/lib');
var fs = require('fs');
var obj = {
    'keyTable': []
};
const keyHeader = '0x';
let initKey = BigNumber.from('0');
let endKey = '0x00000000000000000000000000000000000000000000000000000000ffffffff';
let privateKeyString = '0x0000000000000000000000000000000000000000000000000000000000000000';

let fileCount = 1;
let logger = 1;
let checkSumVal = "0";

while (privateKeyString != endKey) {

let checkSum = checkSumVal;
    initKey = initKey.add(1);
    let striginifedInitKey = initKey._hex.toString();
    let slicedInitKey = striginifedInitKey.replace(/^0x+/i, '');

    for(i=1;i< (64 - slicedInitKey.length); i++ ){
        checkSum = checkSum + checkSumVal;
    }
    privateKeyString = keyHeader + checkSum +slicedInitKey;
    const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
    const wallet = Wallet['default'].fromPrivateKey(privateKeyBuffer);
    const address = wallet.getAddressString();

    obj.keyTable.push({ "privateKey": privateKeyString, "publicKey": address });

    ++logger;

    if (logger % 100000 == 0) {
        console.log("LOGGER COUNT ========", logger);
        console.log("address :", address);
        console.log("privateKeyString : ", privateKeyString);

        let deploymentString = JSON.stringify(obj, null, 4);
        fs.writeFileSync(`GroupA_${fileCount}.json`, deploymentString)

        delete obj;
        obj.keyTable.length = 0;
        ++fileCount;
    }
}

console.log("!!!!!!-=-==-=-=-==-= Done =-=-==-==-==-=!!!!!");