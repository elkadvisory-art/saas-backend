# SaaS Backend (NestJS + BullMQ)
Minimal backend with:
- NestJS (Fastify)
- BullMQ (Redis) worker
- Postgres (pg)
- Healthcheck /healthz
- Webhook placeholders (Stripe/Zalo)
- OAuth callback placeholder

## Local dev
npm i
cp .env.example .env
npm run start:dev   # API
npm run start:worker:dev  # worker

## Build/Run prod
npm run build
npm start
npm run start:worker

## Render
Web Service: build -> `npm run build`, start -> `node dist/main.js`
Background Worker: build -> `npm run build`, start -> `node dist/worker.js`
