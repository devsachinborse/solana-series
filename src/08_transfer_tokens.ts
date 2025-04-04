import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
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
  "7zqotGNnBgWKbxieSjnMk5fMpiYmo4fcAmngc4nPhbs9" //ATA token account
);

const amount = 4;
const MINOR_UNITS_PER_MAJOR_UINTS = Math.pow(10, 2);
console.log(`Sending ${amount} FT to ${recipentAccount}....`);

const SourceATA = await getOrCreateAssociatedTokenAccount(
  connection,
  OWNER,
  tokenAccount,
  OWNER.publicKey
);

// console.log(SourceATA.address);

const recipientATA = await getOrCreateAssociatedTokenAccount(
  connection,
  OWNER,
  tokenAccount,
  recipentAccount
);

// console.log(recipientATA.address);

const txSignature = await transfer(
  connection,
  OWNER,
  SourceATA.address,
  recipientATA.address,
  OWNER,
  amount * MINOR_UNITS_PER_MAJOR_UINTS
);

const link = getExplorerLink("transaction", txSignature, "devnet");
console.log("successfull: ", link);
