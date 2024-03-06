import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { LoggerErrorScope } from './logger.constant';

@Injectable()
export class LoggerRepository {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {}

  info({ message, attributes }: { message: string; attributes?: Record<string, unknown> }): void {
    this.logger.info(attributes, message);
  }

  warn({ message, attributes }: { message: string; attributes?: Record<string, unknown> }): void {
    this.logger.warn(attributes, message);
  }

  error({
    err,
    message,
    attributes,
    scope,
  }: {
    err: Error;
    message?: string;
    attributes?: Record<string, unknown>;
    scope: LoggerErrorScope;
  }): void {
    this.logger.error({ ...attributes, error: err, scope, stack: err.stack }, message ?? err.message);
  }
}
