import { Inject, Injectable } from '@nestjs/common';

import { LoggerErrorScope } from './logger.constant';
import { LoggerRepository } from './logger.repository';

Injectable();
export class LoggerService {
  constructor(@Inject(LoggerRepository) private readonly loggerRepository: LoggerRepository) {}

  info({ message, attributes }: { message: string; attributes?: Record<string, unknown> }): void {
    this.loggerRepository.info({ message, attributes });
  }

  warn({ message, attributes }: { message: string; attributes?: Record<string, unknown> }): void {
    this.loggerRepository.warn({ message, attributes });
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
    scope?: LoggerErrorScope;
  }): void {
    this.loggerRepository.error({
      message,
      err,
      scope: scope || LoggerErrorScope.UnknownError,
      attributes,
    });
  }
}
