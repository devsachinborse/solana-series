import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const Keypair = process.env.KEYPAIR || null;
if (!Keypair) {
  console.log("please provide keypair !");
  console.log("❌ falied !");
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet")); //connect to devnet rpc api
const walletAddress = getKeypairFromEnvironment("KEYPAIR"); //get keypair from out env file.

const balance = await connection.getBalance(walletAddress.publicKey);

console.log(
  `💰 The balance of ${walletAddress.publicKey} is : ${
    balance / LAMPORTS_PER_SOL
  } SOL`
);
console.log("✅ Done !");
