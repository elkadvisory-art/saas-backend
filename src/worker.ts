import 'reflect-metadata';
import * as dotenv from 'dotenv'; dotenv.config();
import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const queueName = 'jobs';
export const jobsQueue = new Queue(queueName, { connection });

const processor = async (job: Job) => {
  const { type, payload } = job.data || {};
  console.log(`[Worker] job ${job.id} type=${type}`);
  if (type === 'reply_message') {
    await new Promise((r)=>setTimeout(r, 300));
  }
  return { ok: true, type, payload };
};

const worker = new Worker(queueName, processor, { connection, concurrency: 5 });
const events = new QueueEvents(queueName, { connection });
worker.on('completed', (job)=>console.log(`[Worker] completed ${job.id}`));
worker.on('failed', (job, err)=>console.error(`[Worker] failed ${job?.id}`, err));
events.on('failed', ({ jobId, failedReason })=>console.error(`[Events] failed ${jobId} ${failedReason}`));

console.log('Worker started');
