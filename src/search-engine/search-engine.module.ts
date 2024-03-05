import { Module } from '@nestjs/common';
import { SearchEngineService } from './search-engine.service';
import { MeilisearchModule } from '@/meilisearch/meilisearch.module';

@Module({
  imports: [MeilisearchModule],
  providers: [SearchEngineService],
  exports: [SearchEngineService],
})
export class SearchEngineModule {}
