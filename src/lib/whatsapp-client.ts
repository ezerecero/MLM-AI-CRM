import axios from 'axios';

const WHATSAPP_SERVICE_URL = process.env.WHATSAPP_API_URL || 'http://localhost:3001';

export class WhatsAppClient {

    async sendMessage(to: string, content: string) {
        try {
            const response = await axios.post(`${WHATSAPP_SERVICE_URL}/send-message`, {
                to,
                content,
            });
            return response.data;
        } catch (error) {
            console.error('Failed to send WhatsApp message:', error);
            throw error;
        }
    }

    async getStatus() {
        try {
            const response = await axios.get(`${WHATSAPP_SERVICE_URL}/status`);
            return response.data;
        } catch (error) {
            return { status: 'disconnected' };
        }
    }

    async generateQR() {
        try {
            const response = await axios.get(`${WHATSAPP_SERVICE_URL}/qr`);
            return response.data; // { qr: "base64..." }
        } catch (error) {
            console.error('Failed to get QR code:', error);
            throw error;
        }
    }
}

export const whatsAppClient = new WhatsAppClient();
