import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { WebhookGuard } from './guards/strapi-webhook.guard';
import { StrapiService } from './strapi.service';

@Controller('strapi')
export class StrapiController {
  constructor(
    private readonly strapiService: StrapiService
  ) {}

  @UseGuards(WebhookGuard)
  @Post('/webhook')
  async webhook(@Req() req: Request) {
    return this.strapiService.delPatternCache(req);
  }
}
