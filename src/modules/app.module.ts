import { Module } from '@nestjs/common';
import { HealthController } from '../routes/health.controller';
import { JobsController } from '../routes/jobs.controller';
import { WebhooksController } from '../routes/webhooks.controller';
import { OAuthController } from '../routes/oauth.controller';
import { VerifyController } from '../routes/verify.controller'; // <— thêm
import { QueueService } from '../services/queue.service';
import { DbService } from '../services/db.service';

@Module({
  imports: [],
  controllers: [HealthController, JobsController, WebhooksController, OAuthController, VerifyController], // <— thêm
  providers: [QueueService, DbService],
})
export class AppModule {}
