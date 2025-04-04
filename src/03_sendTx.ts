import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const Keypair = process.env.KEYPAIR || null;
if (!Keypair) {
  console.log("please provide keypair !");
  console.log("❌ falied !");
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet")); //connect to devnet rpc api
const sender = getKeypairFromEnvironment("KEYPAIR"); //get keypair from out env file.
const receiver = new PublicKey("7zqotGNnBgWKbxieSjnMk5fMpiYmo4fcAmngc4nPhbs9");

const amount = 0.04;
const newTx = new Transaction();
const txInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: LAMPORTS_PER_SOL * amount,
});

const tx = newTx.add(txInstruction);

const txSignature = await sendAndConfirmTransaction(connection, tx, [sender]);

console.log(`✅Success! ${amount} SOL sent to ${receiver}`);
console.log(
  ` Check out your TX here: https://explorer.solana.com/tx/${txSignature}?cluster=devnet`
);
