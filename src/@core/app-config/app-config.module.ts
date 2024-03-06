import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { namespaceConfigs } from './namspaces.config';
import { AppConfigService } from './app-config.service';
import { validate } from './config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: namespaceConfigs,
      validate,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
