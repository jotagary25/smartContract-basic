// importar la libreria ethers
const ethers = require("ethers");
// traer las variables del archivo .env
require("dotenv").config();
const {
  privateKey_ContractOwner,
  address_ContractOwner,
  RPC_bscTestnet,
  addressContract_AgroNft2,
} = process.env;

// declaro el objeto que hará la conexión
const provider = new ethers.providers.JsonRpcProvider(RPC_bscTestnet);
// traer el contrato compilado
const contract = require("../artifacts/contracts/AgroNft2.sol/AgroNft2.json");
const contractAbi = contract.abi;

// declaramos el signer para luego guardar el contrato como un objeto
const signer = new ethers.Wallet(privateKey_ContractOwner, provider);
const contractAgroNft1 = new ethers.Contract(
  addressContract_AgroNft2,
  contractAbi,
  signer
);

// declararmos la funcion que mandará a mintera el nft
async function mintNFT(tokenURI) {
  // obetener el nonce para la transacción
  const nonce = await provider.getTransactionCount(
    address_ContractOwner,
    "latest"
  );

  // crear el objeto de la transaccion
  const tx = {
    nonce: ethers.utils.hexlify(nonce),
    gasLimit: ethers.utils.hexlify(500000),
    gasPrice: ethers.utils.parseUnits("10", "gwei"),
    to: addressContract_AgroNft2,
    value: ethers.utils.parseEther("0"),
    data: contractAgroNft1.interface.encodeFunctionData("mintNft", [
      address_ContractOwner,
      tokenURI,
    ]),
  };

  // firmar la transaccion
  const signedTx = await signer.signTransaction(tx);
  // const signedTx = await ethers.Signer.fromPrivateKey(
  //   address_ContractOwner
  // ).signTransaction(tx);

  // enviar la transaccion firmada
  const txReceipt = await provider.sendTransaction(signedTx);

  // obtener el hash de la transaccion y mostrar en consola
  console.log(`the hash of your transactionis: ${txReceipt.hash}`);
}

// minteo del primer nft
// mintNFT("ipfs://QmPzssq4tT9mkgw5gKTXJ9iAxJZxxZZoJFNhNEsAQ22e1m");
// mintNFT("ipfs://QmdFg2dvuK4tDjcRjoF5vX3mARYaajodFzABpwBeFskXkc");
// mintNFT("ipfs://QmXYdhBfs8ZJ9ZpPoXt5MFiNuV2v5d1ZueQyEkuxUKoTwP");
// mintNFT("ipfs://QmaD3XJrxXocwSk8phq7uEB1WNZvjLLdf3EPGYDdgxwC6P");
mintNFT("ipfs://QmPE4j3FX9HbvKE74a8J3davEeyJ33WVUSFryHjNyzXeHq");
