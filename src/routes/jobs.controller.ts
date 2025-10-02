import { Body, Controller, Post } from '@nestjs/common';
import { QueueService } from '../services/queue.service';
@Controller('jobs')
export class JobsController {
  constructor(private readonly queue: QueueService) {}
  @Post('enqueue')
  async enqueue(@Body() body:any){
    const type = body?.type || 'echo';
    const payload = body?.payload || {};
    const job = await this.queue.add(type, payload);
    return { queued: true, id: job.id };
  }
}
