import { task } from "hardhat/config";
import { ContractReceipt, ContractTransaction } from "ethers";
// eslint-disable-next-line node/no-missing-import, node/no-unpublished-import
import { GeodataAnchor } from "../../typechain";

// eslint-disable-next-line node/no-missing-import
import { TASK_ANCHOR } from "../task-names";

task(TASK_ANCHOR, "Anchors a value", async (_taskArgs, hre) => {
  const { deployments, ethers } = hre;

  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${deployer.address}`);

  const network = await ethers.provider.getNetwork();
  console.log(`network: ${network.name}`);

  const geodataAnchorDeployment = await deployments.get("GeodataAnchor");
  console.log(`
  geodataAnchor contract address: ${geodataAnchorDeployment.address}`);

  const geodataAnchor: GeodataAnchor = new ethers.Contract(
    geodataAnchorDeployment.address,
    geodataAnchorDeployment.abi,
    deployer
  ) as GeodataAnchor;

  const hash =
    "0x0097c1d8471ee4f1d8831fc50923c90a030b45d2f3b9d29b952cf46f4081f689";
  const anchorId = "fAEYmCYqmXScbpXKJaCvy";

  const bigNumber = ethers.BigNumber.from(hash);
  const addTx: ContractTransaction = await geodataAnchor
    .connect(deployer)
    .addAnchor(anchorId, ethers.utils.zeroPad(bigNumber._hex, 32));
  const addReceipt: ContractReceipt = await addTx.wait();
  console.log(addReceipt);

  const hashReturned = await geodataAnchor.getAnchor(anchorId);
  if (hashReturned === hash) {
    console.log("anchor added: ", hashReturned);
  }
});
