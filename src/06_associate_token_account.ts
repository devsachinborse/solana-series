import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";

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

const recipentAccount = new PublicKey(
  "7zqotGNnBgWKbxieSjnMk5fMpiYmo4fcAmngc4nPhbs9"
);

const ATA = await getOrCreateAssociatedTokenAccount(
  connection,
  OWNER,
  tokenAccount,
  recipentAccount
);

console.log(`Token ATA: ${ATA.address}`);

const link = getExplorerLink("address", ATA.address.toString(), "devnet");
console.log(`Look up the token : ${link} `);
