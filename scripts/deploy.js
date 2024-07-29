const hardhat = require("hardhat")

const deployERC20PermitContract= async ()=>{
    //contract deployment script
    const ERC20PermitContractABI = await hardhat.ethers.getContractFactory("ERC20PermitContract");
    const deployContract = await ERC20PermitContractABI.deploy();

    //console log  the contract data
    console.log(deployContract)
    console.log("------------------------------------------------")
    //console contract addr
    console.log("ERC20PermitContract deployed at Contract Address : " ,deployContract.target)
}

deployERC20PermitContract()
    .then(()=>{
        console.log("Deployement Complete")
    })
    .catch((error)=>{
        console.error("Error deploying contract:", error)
    })