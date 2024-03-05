import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { namespaceConfigs } from './namspaces.config';
import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: namespaceConfigs
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}
