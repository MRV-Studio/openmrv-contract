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
let other: SignerWithAddress;

describe("geodata anchor contract", () => {
  beforeEach(async () => {
    [deployer, other] = await ethers.getSigners();
    geodataAnchorFactory = (await ethers.getContractFactory(
      "GeodataAnchor",
      deployer
    )) as GeodataAnchor__factory; // eslint-disable-line camelcase
    geodataAnchor = (await geodataAnchorFactory.deploy()) as GeodataAnchor;
  });

  describe("deployment", async () => {
    it("deployer is owner", async () => {
      expect(await geodataAnchor.owner()).to.equal(deployer.address);
    });
  });

  describe("add anchor", async () => {
    it("add anchor", async () => {
      const hash =
        "0x550bcc97c1dd9295915341fdefe3816aea7963bc53b3f8221684a53776d9755a";
      const addTx: ContractTransaction = await geodataAnchor
        .connect(deployer)
        .addAnchor("AczsesvKyE4MD9Lo3RNgA", hash);
      const addReceipt: ContractReceipt = await addTx.wait();
      expect(addReceipt.status).to.equal(1);

      const hashReturned = await geodataAnchor.getAnchor(
        "AczsesvKyE4MD9Lo3RNgA"
      );
      expect(hashReturned).to.equal(hash);
    });
    it("revert when non-owner adds anchor", async () => {
      const hash =
        "0x550bcc97c1dd9295915341fdefe3816aea7963bc53b3f8221684a53776d9755a";
      await expect(
        geodataAnchor.connect(other).addAnchor("AczsesvKyE4MD9Lo3RNgA", hash)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("revert when adding same anchor id twice", async () => {
      const hash =
        "0x550bcc97c1dd9295915341fdefe3816aea7963bc53b3f8221684a53776d9755a";
      await geodataAnchor.addAnchor("AczsesvKyE4MD9Lo3RNgA", hash);

      await expect(
        geodataAnchor.addAnchor("AczsesvKyE4MD9Lo3RNgA", hash)
      ).to.be.revertedWith("Anchor id already exists");
    });
    it("revert when adding an empty hash", async () => {
      const hash =
        "0x0000000000000000000000000000000000000000000000000000000000000000";
      await expect(
        geodataAnchor.addAnchor("AczsesvKyE4MD9Lo3RNgA", hash)
      ).to.be.revertedWith("Empty hash");
    });
    it("revert when anchor not found", async () => {
      await expect(
        geodataAnchor.getAnchor("AczsesvKyE4MD9Lo3RNgA")
      ).to.be.revertedWith("Anchor not found");
    });
  });
});
