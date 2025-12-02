const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const QRCode = require('qrcode');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

let sock;
let qrCodeData;

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        logger: pino({ level: 'silent' }),
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            qrCodeData = await QRCode.toDataURL(qr);
            console.log('QR Code generated');
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
            qrCodeData = null;
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        console.log(JSON.stringify(m, undefined, 2));
        if (m.type === 'notify') {
            for (const msg of m.messages) {
                if (!msg.key.fromMe && WEBHOOK_URL) {
                    // Send to Next.js Webhook
                    // In real app, use axios to POST to WEBHOOK_URL
                    console.log('Received message:', msg.message?.conversation || msg.message?.extendedTextMessage?.text);
                }
            }
        }
    });
}

// API Routes
app.get('/status', (req, res) => {
    res.json({ status: sock?.user ? 'connected' : 'disconnected' });
});

app.get('/qr', (req, res) => {
    if (qrCodeData) {
        res.json({ qr: qrCodeData });
    } else if (sock?.user) {
        res.status(400).json({ error: 'Already connected' });
    } else {
        res.status(503).json({ error: 'QR not ready' });
    }
});

app.post('/send-message', async (req, res) => {
    const { to, content } = req.body;
    if (!sock) return res.status(503).json({ error: 'Service not ready' });

    try {
        const id = to.includes('@s.whatsapp.net') ? to : `${to}@s.whatsapp.net`;
        await sock.sendMessage(id, { text: content });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

connectToWhatsApp();

app.listen(PORT, () => {
    console.log(`WhatsApp Service running on port ${PORT}`);
});
