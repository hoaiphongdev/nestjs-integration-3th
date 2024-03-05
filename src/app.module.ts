import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@/@core/app-config';
import { StrapiModule } from '@/strapi/strapi.module';

@Module({
  imports: [
    AppConfigModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    StrapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
