async function main() {
  const AgroNft2 = await ethers.getContractFactory("AgroNft2");
  const agroNft2 = await AgroNft2.deploy();
  console.log("Contract deployed to address:", agroNft2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
