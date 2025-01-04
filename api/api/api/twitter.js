const fetch = require('node-fetch');

async function sendTwitterMessage(username, message) {
    const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
    const url = 'https://api.twitter.com/2/tweets';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: `@${username} ${message}` }),
    });

    const result = await response.json();
    console.log(`Message sent to Twitter user: ${username}`, result);
}

module.exports = { sendTwitterMessage };
