import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const geodataAnchorDeployFunc: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const geodataAnchorDeployment = await deploy("GeodataAnchor", {
    from: deployer,
    // gas: 4000000,
    args: [],
  });

  // get address from the deployed GeodataAnchor contract
  console.log(`Geodata Anchor contract address:
    ${geodataAnchorDeployment.address}`);
};
export default geodataAnchorDeployFunc;
