import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@/@core/app-config';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly loggerService: LoggerService
  ) {}

  getAppVersion(): string {
    const appVersion = this.appConfigService.app.version
    this.loggerService.info({
      message: appVersion
    })

    this.loggerService.warn({
      message: appVersion
    })

    this.loggerService.error({
      err: new Error("SOmething went wrong!"),
      message: appVersion
    })
    return appVersion;
  }
}
