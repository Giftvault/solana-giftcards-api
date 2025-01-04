const { Keypair, Transaction, SystemProgram, PublicKey } = require('@solana/web3.js');
const { connection, baseWallet } = require('../utils/solana');
const { sendTelegramMessage } = require('./telegram');
const { sendTwitterMessage } = require('./twitter');

module.exports = async (req, res) => {
    const { amount, recipientHandle, platform } = req.body;

    if (!amount || !recipientHandle || !platform) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        // Generate new wallet
        const giftWallet = Keypair.generate();
        const publicKey = giftWallet.publicKey.toString();
        const privateKey = Buffer.from(giftWallet.secretKey).toString('base64');

        // Transfer SOL
        const lamports = amount * 1e9;
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: baseWallet.publicKey,
                toPubkey: new PublicKey(publicKey),
                lamports,
            })
        );

        const signature = await connection.sendTransaction(transaction, [baseWallet]);
        await connection.confirmTransaction(signature);

        console.log(`Transferred ${amount} SOL to ${publicKey}. Tx ID: ${signature}`);

        // Notify recipient
        if (platform === 'telegram') {
            await sendTelegramMessage(recipientHandle, `🎁 You received a gift card!\n🔑 Private Key: ${privateKey}\n💳 Wallet Address: ${publicKey}`);
        } else if (platform === 'twitter') {
            await sendTwitterMessage(recipientHandle, `🎁 You received a gift card!\n🔑 Private Key: ${privateKey}\n💳 Wallet Address: ${publicKey}`);
        }

        res.json({ success: true, message: 'Gift card created successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
