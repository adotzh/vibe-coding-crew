export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, location, idea, expertise } = req.body || {};

    if (!name || !email || !idea) {
        return res.status(400).json({ error: 'Name, email, and idea are required.' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({ error: 'Telegram bot is not configured.' });
    }

    const message = [
        '🚀 New VibeCoding Crew survey submission',
        `Name: ${name}`,
        `Email: ${email}`,
        `Location: ${location || '—'}`,
        `Idea: ${idea}`,
        `Expertise: ${expertise || '—'}`
    ].join('\n');

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    });

    if (!telegramResponse.ok) {
        const errorText = await telegramResponse.text();
        return res.status(502).json({ error: 'Failed to send message to Telegram.', details: errorText });
    }

    return res.status(200).json({ ok: true });
}

