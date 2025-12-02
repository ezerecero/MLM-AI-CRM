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
    **Configuration Guide:**
    - **AI Keys**: You MUST provide `OPENAI_API_KEY`, etc. for the AI to work.
    - **Database**: The `docker-compose.yml` file reads `POSTGRES_USER` and `POSTGRES_PASSWORD` from this file. You do **NOT** need to edit `docker-compose.yml`.
    - **Security**: For production, change `POSTGRES_PASSWORD` and `NEXTAUTH_SECRET` to strong, random values in your `.env` file.

4.  **Start Database & Services:**
    This command downloads the necessary images (Postgres, Node.js) and starts the containers in the background.
    ```bash
    docker-compose up -d postgres whatsapp-service
    ```
    - Check if they are running: `docker-compose ps`
    - View logs: `docker-compose logs -f whatsapp-service`

5.  **Run Migrations:**
    This creates the tables in your PostgreSQL database.
    ```bash
    npx prisma migrate dev
    ```

6.  **Start Next.js App:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

## Production Deployment (Ubuntu)

1.  **Install Docker:**
    Follow official Docker installation guide for Ubuntu.

2.  **Deploy:**
    This builds the Next.js application into a production-ready container and starts everything.
    ```bash
    docker-compose up -d --build
    ```
    - The `--build` flag ensures any code changes are re-compiled.
    - The app will restart automatically if the server reboots (`restart: always` policy).

3.  **Nginx Proxy:**
    Configure Nginx to reverse proxy port 80/443 to port 3000.
