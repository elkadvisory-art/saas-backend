import 'reflect-metadata';
import * as dotenv from 'dotenv'; dotenv.config();
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
  await app.listen(port, '0.0.0.0');
  console.log(`API listening on :${port}`);
}
bootstrap().catch((e)=>{ console.error('BOOTSTRAP_ERROR', e); process.exit(1); });
