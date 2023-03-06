// traer las constantes de .env
require("dotenv").config();
const {
  PRIVATE_KEY_OWNER, // llave privada de la cuenta propietaruia
  ADDRESS_OWNER, // dirección publica de la cuenta propietaria
  RPC_BSC_TESTNET, // red testnet de binance
  ADDRESS_CONTRACT_AGROBLOCK, //dirección del contrato
} = process.env;
// traer el objeto web3 de la libreria web3
const Web3 = require("web3");
const web3 = new Web3(RPC_BSC_TESTNET);
// traer el abi del contrato
const contract = require("../artifacts/contracts/AgroNfts.sol/MyNFT.json");
const contractAbi = contract.abi;
// variable para guardar el contrato como un objeto
const nftContract = new web3.eth.Contract(
  contractAbi,
  ADDRESS_CONTRACT_AGROBLOCK
);

// crear el metodo para mintear el nft
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(ADDRESS_OWNER, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: ADDRESS_OWNER,
    to: ADDRESS_CONTRACT_AGROBLOCK,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(ADDRESS_OWNER, tokenURI).encodeABI(),
  };
  // firmar la transaccion
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY_OWNER);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (
        err,
        hash
      ) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      });
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

// mintNFT("ipfs://QmTC2AmEEwMLZUpCZaVUcxyoMRry7Cio7tnZj4LxrZS3MC");
// mintNFT("ipfs://QmWjLJuu5zgZuKCQRdgQfDQoTKZqsdrN1vrdrf4CS86igy");
mintNFT("ipfs://QmPzssq4tT9mkgw5gKTXJ9iAxJZxxZZoJFNhNEsAQ22e1m");
// mintNFT("ipfs://QmaYBwVF6aRPWsqQZYkWbW2hVoDb5YwBkcbWQU9W6huokP"); //no enviando aún
