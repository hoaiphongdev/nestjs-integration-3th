import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule, PinoLogger } from 'nestjs-pino';

import { AppConfigModule, AppConfigService } from '@/@core/app-config';

import { LoggerLevel } from './logger.constant';
import { jsonStringify, modifyLoggerPinoBrowser } from './logger.helper';
import { LoggerRepository } from './logger.repository';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const developmentConfig = {
          transport: {
            target: 'pino-pretty',
          },
          autoLogging: false,
        };

        const productionConfig = {
          formatters: {
            level: (label) => ({ level: label }),
            bindings: () => ({}),
          },
          timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
          hooks: {
            logMethod: (args, _, level) => {
              const loggerInput = {
                ...(typeof args[0] === 'object' ? args[0] : {}),
                msg: args[1],
                version: appConfigService.app.version,
                env: appConfigService.app.enviromentName,
              };
              const levelsMapping = PinoLogger.root.levels;
              switch (level) {
                case levelsMapping.values[LoggerLevel.Info]:
                  console.info(jsonStringify(modifyLoggerPinoBrowser(loggerInput, LoggerLevel.Info)));
                  break;
                case levelsMapping.values[LoggerLevel.Warn]:
                  console.warn(jsonStringify(modifyLoggerPinoBrowser(loggerInput, LoggerLevel.Warn)));
                  break;
                case levelsMapping.values[LoggerLevel.Error]:
                  console.error(jsonStringify(modifyLoggerPinoBrowser(loggerInput, LoggerLevel.Error)));
                  break;
                default:
                  break;
              }
            },
          },
        };

        return {
          pinoHttp: {
            ...(appConfigService.isProduction ? productionConfig : developmentConfig),
          },
        };
      },
    }),
  ],
  providers: [LoggerRepository, LoggerService],
  exports: [LoggerRepository, LoggerService],
})
export class LoggerModule {}
