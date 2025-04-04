import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { createMint, disableCpiGuard, mintTo } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
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

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
); //from solana explorer metadat id

const metadataData = {
  name: "FalconToken",
  symbol: "FT",
  uri: "https://example.com/",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const metaDataTokenSync = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID //program id
);

const metadatPDA = metaDataTokenSync[0];
const tx = new Transaction();

//install
//yarn add @metaplex-foundation/mpl-token-metadata

const addMetadataToTokenInstruction = createCreateMetadataAccountV3Instruction(
  {
    metadata: metadatPDA,
    mint: tokenAccount,
    mintAuthority: OWNER.publicKey,
    payer: OWNER.publicKey,
    updateAuthority: OWNER.publicKey,
  },
  {
    createMetadataAccountArgsV3: {
      collectionDetails: null,
      data: metadataData,
      isMutable: true,
    },
  }
);

tx.add(addMetadataToTokenInstruction);

const txSignature = await sendAndConfirmTransaction(connection, tx, [OWNER]);

const txlink = getExplorerLink("transaction", txSignature, "devnet");

console.log(`✅ Trasaction confirmed, explorer link is: ${txSignature}`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}`);
