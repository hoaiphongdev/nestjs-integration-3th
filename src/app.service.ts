import { Injectable } from '@nestjs/common';
import { AppConfigService } from './@core/app-config';

@Injectable()
export class AppService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getAppVersion(): string {
    return this.appConfigService.app.version;
  }
}
