import { ethers } from "hardhat";
import chai from "chai";
import {
  // eslint-disable-next-line camelcase
  GeodataAnchor__factory,
  GeodataAnchor,
  // eslint-disable-next-line node/no-missing-import, node/no-unpublished-import
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ContractReceipt, ContractTransaction } from "ethers";

const { expect } = chai;

let geodataAnchor: GeodataAnchor;
// eslint-disable-next-line camelcase
let geodataAnchorFactory: GeodataAnchor__factory;
let deployer: SignerWithAddress;

describe("geodata anchor contract", () => {
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    geodataAnchorFactory = (await ethers.getContractFactory(
      "GeodataAnchor",
      deployer
    )) as GeodataAnchor__factory; // eslint-disable-line camelcase
    geodataAnchor = (await geodataAnchorFactory.deploy()) as GeodataAnchor;
  });

  describe("add anchor", async () => {
    it("add anchor", async () => {
      const hash = "0x7cea402e7338643ced";
      const addTx: ContractTransaction = await geodataAnchor.addAnchor(
        "1",
        hash
      );
      const addReceipt: ContractReceipt = await addTx.wait();
      expect(addReceipt.status).to.equal(1);

      const hashReturned = await geodataAnchor.getAnchor("1");
      expect(hashReturned).to.equal(hash);
    });
    it("revert when adding same anchor id twice", async () => {
      const hash = "0x7cea402e7338643ced";
      await geodataAnchor.addAnchor("1", hash);

      await expect(geodataAnchor.addAnchor("1", hash)).to.be.revertedWith(
        "Anchor id already exists"
      );
    });
    it("revert when anchor not found", async () => {
      await expect(geodataAnchor.getAnchor("1")).to.be.revertedWith(
        "Anchor not found"
      );
    });
  });
});
