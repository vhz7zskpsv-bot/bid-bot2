const { Connection, Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== SOLANA TRAIT SNIPING & BIDDING TERMINAL ===");
console.log("=============================================");

rl.question('Enter Solana Collection Slug / Name: ', (collection) => {
  rl.question('Enter Minimum Bid (SOL): ', (minBid) => {
    rl.question('Enter Maximum Bid (SOL): ', (maxBid) => {
      rl.question('Enter Quantity to Snipe/Bid: ', (qty) => {
        
        // Yahan terminal runtime par private key mangega
        rl.question('Enter your Solana Private Key (Base58): ', async (privateKeyInput) => {
          
          console.log("\n---------------------------------------------");
          console.log(" [✔] Initializing Blockchain Connection...");
          console.log(` [📦] Collection: ${collection}`);
          console.log(` [📉] Min Bid: ${minBid} SOL`);
          console.log(` [📈] Max Bid: ${maxBid} SOL`);
          console.log(` [🔢] Quantity: ${qty}`);
          
          try {
            // Free public RPC URL ya default RPC use hoga
            const RPC_URL = "https://api.mainnet-beta.solana.com";
            const connection = new Connection(RPC_URL, 'confirmed');
            
            const trimmedKey = privateKeyInput.trim();
            const wallet = Keypair.fromSecretKey(bs58.decode(trimmedKey));
            
            console.log(` [🔑] Wallet Connected: ${wallet.publicKey.toBase58()}`);
            
            const balance = await connection.getBalance(wallet.publicKey);
            console.log(` [💰] Wallet Balance: ${balance / 1e9} SOL`);
            console.log(" [🚀] Status: Scanning traits & ready to place bids on orderbook...");
            
          } catch (error) {
            console.log(" [❌] Error: Invalid Private Key or Connection failed!", error.message);
          }

          console.log("---------------------------------------------");
          rl.close();
        });
      });
    });
  });
});
