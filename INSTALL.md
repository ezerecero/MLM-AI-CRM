# Installation Guide for MLM-AI-CRM

## Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local dev)
- Git

## Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd mlm-ai-crm
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy `.env.example` to `.env` and fill in the values.
    ```bash
    cp .env.example .env
    ```

4.  **Start Database & Services:**
    ```bash
    docker-compose up -d postgres whatsapp-service
    ```

5.  **Run Migrations:**
    ```bash
    npx prisma migrate dev
    ```

6.  **Start Next.js App:**
    ```bash
    npm run dev
    ```

## Production Deployment (Ubuntu)

1.  **Install Docker:**
    Follow official Docker installation guide for Ubuntu.

2.  **Deploy:**
    ```bash
    docker-compose up -d --build
    ```

3.  **Nginx Proxy:**
    Configure Nginx to reverse proxy port 80/443 to port 3000.
