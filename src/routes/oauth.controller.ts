import { Controller, Get, Query, Res } from '@nestjs/common';
@Controller('oauth')
export class OAuthController {
  @Get('zalo/callback')
  async zalo(@Query('code') code:string, @Query('state') state:string, @Res() res:any){
    console.log('ZALO OAUTH CALLBACK', { code, state });
    return res.redirect('/connected?provider=zalo&ok=1');
  }
}
