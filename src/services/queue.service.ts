import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
@Injectable()
export class QueueService {
  private queue: Queue;
  constructor(){
    const connection = new IORedis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
    this.queue = new Queue('jobs', { connection });
  }
  add(type:string, payload:any){
    return this.queue.add(type, { type, payload }, { attempts:3, backoff:{ type:'exponential', delay:2000 } });
  }
}
