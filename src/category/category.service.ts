import { CategoryAttributeToRetrieve, SearchEngineService } from '@/search-engine';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  async searchCategories({ name }: { name?: string }) {
    const { hits: data } = await this.searchEngineService.searchCategory(
      {
        searchText: name,
        attributesToRetrieve: CategoryAttributeToRetrieve.Info,
      }
    );
    return { data };
  }
}
