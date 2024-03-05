import { BaseFilterBuilder } from './base-filter.builder';

export type CategoryFilterableAttributes = 'name';

export class CategoryFilterBuilder extends BaseFilterBuilder {
  private addName(name?: string) {
    return this.generateFilter<CategoryFilterableAttributes>('name', name);
  }

  exceptEmptyCategories() {
    return this.greaterThan('totalForms', 0);
  }

  batchFilters(filter?: { name?: string; slug?: string | string[] }) {
    if (!filter) {
      return this;
    }

    const { name, slug } = filter;

    return this.addName(name);
  }
}
