import { Controller, Get, Param, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

/**
 * Serve Zalo domain verification file under:
 *   /zalo_verifier<token>.html
 * Set the file content in env ZALO_VERIFY_CONTENT (copy nguyên nội dung file Zalo cho).
 */
@Controller()
export class VerifyController {
  @Get('/zalo_verifier:token.html')
  async serve(@Param('token') token: string, @Res() res: FastifyReply) {
    // Nội dung file Zalo (copy 100% nội dung file HTML mà bạn tải từ Zalo)
    const body = process.env.ZALO_VERIFY_CONTENT || '';
    res.type('text/html').send(body);
  }
}
