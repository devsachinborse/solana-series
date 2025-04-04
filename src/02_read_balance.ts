import {
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet")); //connect to devnet rpc api

const walletAddress = new PublicKey(
  "7zqotGNnBgWKbxieSjnMk5fMpiYmo4fcAmngc4nPhbs9"
);

const balance = await connection.getBalance(walletAddress);

console.log(`✅ blueAccount balance: ${balance / LAMPORTS_PER_SOL} SOL`);
