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
    "0xee97c1d8471ee4f1d8831fc50923c90a030b45d2f3b9d29b952cf46f4081f689";
  const addTx: ContractTransaction = await geodataAnchor
    .connect(deployer)
    .addAnchor("fAEYmCYqmXScbpXKJaCvr", hash);
  const addReceipt: ContractReceipt = await addTx.wait();
  console.log(addReceipt);
});
