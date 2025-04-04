import { Keypair } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

//generate keypair
const keypair = Keypair.generate();

console.log("****************>>>>>>Your key<<<<<<****************");

console.log(`publickey: ${keypair.publicKey.toBase58()}`);
console.log(`privatekey: ${keypair.secretKey}`);
console.log();

console.log("****************>>>>>>>>><<<<<<<<****************");

// const newKeyapir = Keypair.fromSecretKey(process.env.KEYPAIR as any, {
//   skipValidation: true,
// });

// console.log(`new public key: ${newKeyapir.publicKey.toBase58()} `);
// console.log(`new privte key: ${newKeyapir.secretKey}`);
