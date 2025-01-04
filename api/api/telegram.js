const fetch = require('node-fetch');

async function sendTelegramMessage(chatId, message) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    console.log(`Message sent to Telegram user: ${chatId}`);
}

module.exports = { sendTelegramMessage };
