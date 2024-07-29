const {ethers} = require("ethers")
// const {abi} = require("../artifacts/contracts/ERC20permitContract.sol/ERC20PermitContract.json")
require('dotenv').config()
// require("@nomiclabs/hardhat-ethers")
const fs = require('fs')
const { version, type } = require("os")
const fspromises = fs.promises


function getTimestampInSeconds(){
    //return current timestamp in seconds
    return Math.floor(Date.now() /1000)
}
function getV(yParity, networkV) {
    if (networkV === null) {
        return yParity + 27;
    } else {
        return yParity + 35 + networkV * 2;
    }
}

const ABI_FILE_PATH = "artifacts/contracts/ERC20permitContract.sol/ERC20PermitContract.json";
async function getABI(){
    const data = await fspromises.readFile(ABI_FILE_PATH,'utf8')
    const abi = JSON.parse(data)['abi'];
    return abi
}
const main = async ()=>{
    let infuraProvider = ethers.getDefaultProvider(`https://polygon-amoy.infura.io/v3/${process.env.INFURA_NODE_KEY}`)
    const abi = await getABI();

    // const wallet = new ethers.Wallet(process.env.CONTRACT_OWNER_PRIVATE_KEY, provider);
    let tokenOwner = new ethers.Wallet(process.env.CONTRACT_OWNER_PRIVATE_KEY, infuraProvider)
    let tokenReceiver = new ethers.Wallet(process.env.TOKEN_RECEIVER_PRIVATE_KEY, infuraProvider)
    // Create a contract instance
    const contractInstance = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, infuraProvider);
    
    // check account balances
    let tokenOwnerBalance = (await contractInstance.balanceOf(tokenOwner.address)).toString()
    let tokenReceiverBalance = (await contractInstance.balanceOf(tokenReceiver.address)).toString()
    
    console.log(`Starting tokenOwner balance: ${tokenOwner.address} : ${tokenOwnerBalance}`);
    console.log(`Starting tokenReceiver balance: ${tokenReceiver.address} : ${tokenReceiverBalance}`);

    const tokensToSend = ethers.parseEther("100")
    const deadline = getTimestampInSeconds() + 4200
    
    const nonces =  await contractInstance.nonces(tokenOwner.address)

    console.log(nonces)
    
    const chainId = (await infuraProvider.getNetwork()).chainId;
    // console.log(contractInstance.target)

    //set domain parameter
    const domain = {
        name : await contractInstance.name(),
        version : "1",
        chainId : chainId,
        verifyingContract : contractInstance.target
    }

    // set the permit type parameters
    const types = {
        Permit: [{
            name: "owner",
            type: "address"
          },
          {
            name: "spender",
            type: "address"
          },
          {
            name: "value",
            type: "uint256"
          },
          {
            name: "nonce",
            type: "uint256"
          },
          {
            name: "deadline",
            type: "uint256"
          },
        ],
      };
  
    // set the Permit type values
    const values = {
        owner : tokenOwner.address,
        spender : tokenReceiver.address,
        value : tokensToSend,
        nonce : nonces, //avoid replay attack
        deadline : deadline
    }

    //sign the permit type data with the deployer's(contractOwner) private key
    const signature = await tokenOwner.signTypedData(domain, types, values);
    // console.log(signature)
    const sig = ethers.Signature.from(signature)
    // console.log(sig)
    const v = getV(sig.yParity, sig.networkV);

    // // verify the Permit type data with the signature
    // const recovered = ethers.utils.verifyTypedData(
    //     domain,
    //     types,
    //     values,
    //     sig
    //     )
    const feeData = await infuraProvider.getFeeData();
    const gasPrice = feeData.gasPrice;

    console.log("v : ",v);
    console.log("r : ", sig.r)
    console.log("s : ", sig.s)
    console.log("tokenOwner : ", tokenOwner.address)
    console.log("tokenReceiver : ", tokenReceiver.address)
    console.log("tokenstosend(value) : ", tokensToSend)
    console.log("deadline : ", deadline)

    //call the function permit from remix using metamask using above data



    // let tx = await contractInstance.connect(tokenReceiver).permit(
    //     tokenOwner.address,
    //     tokenReceiver.address,
    //     tokensToSend,
    //     deadline,
    //     v,
    //     sig.r,
    //     sig.s,
    //     {
    //         gasPrice:  gasPrice, // Example gas price
    //         gasLimit: 3000000 // Hardcoded gas limit; adjust as needed
    //     }
    // )

    // await tx.wait(2)
    // console.log("Transaction : ", tx)


    
} 
main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});