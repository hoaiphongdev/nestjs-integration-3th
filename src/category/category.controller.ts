import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/search')
  async searchCategories(@Query('name') name: string) {
    const { data } = await this.categoryService.searchCategories({ name });
    return data;
  }
}
