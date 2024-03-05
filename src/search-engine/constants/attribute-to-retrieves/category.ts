import { NestedKeys } from '@/@core/types';
import { ICategory } from '@/category/interfaces/category.interface';

export type TCategoryAttributeToRetrieve = NestedKeys<ICategory>;

export class CategoryAttributeToRetrieve {
  static get Info(): TCategoryAttributeToRetrieve[] {
    return [
      'id',
      'name',
    ];
  }
}
