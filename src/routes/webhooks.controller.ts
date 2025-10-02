import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { QueueService } from '../services/queue.service';
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly queue: QueueService) {}
  @Post('stripe')
  async stripe(@Req() req:any, @Body() body:any, @Headers('stripe-signature') sig?:string){
    await this.queue.add('stripe_event', body);
    return { ok: true };
  }
  @Post('zalo')
  async zalo(@Body() body:any){
    await this.queue.add('zalo_event', body);
    return { ok: true };
  }
}
