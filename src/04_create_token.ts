import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import "dotenv/config";

const Keypair = process.env.KEYPAIR || null;
if (!Keypair) {
  console.log("please provide keypair !");
  console.log("❌ falied !");
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"));
const owner = getKeypairFromEnvironment("KEYPAIR"); // owner keypair

//create token
const token = await createMint(connection, owner, owner.publicKey, null, 2);

//create a link
const link = getExplorerLink("address", token.toString(), "devnet");

console.log(`✅ Done! created a token: ${link} `);
