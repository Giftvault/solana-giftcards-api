const { Connection, Keypair } = require('@solana/web3.js');

const connection = new Connection('https://api.mainnet-beta.solana.com');

// Load base wallet from private key stored in environment variable
const baseWallet = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.PRIMARY_WALLET_PRIVATE_KEY))
);

module.exports = { connection, baseWallet };
