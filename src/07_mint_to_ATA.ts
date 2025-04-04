import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import "dotenv/config";

const Keypair = process.env.KEYPAIR || null;
if (!Keypair) {
  console.log("please provide keypair !");
  console.log("❌ falied !");
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"));
const OWNER = getKeypairFromEnvironment("KEYPAIR"); // owner keypair

const tokenAccount = new PublicKey(
  "78ZUAcWP787coWWKhTbz3y2kjk8CSuGAAwdPusq1KzBw"
);

const recipentATA = new PublicKey(
  "CFtdMVzNjuRF3M21zEXEVhCpDFeujUGWsYVjms3PXDoP" //ATA token account
);

const MINOR_UNITS_PER_MAJOR_UINTS = Math.pow(10, 2);

const txSignature = await mintTo(
  connection,
  OWNER,
  tokenAccount,
  recipentATA,
  OWNER,
  6 * MINOR_UNITS_PER_MAJOR_UINTS
);

const link = getExplorerLink("transaction", txSignature, "devnet");
console.log(`Successfull! , ${link}`);
