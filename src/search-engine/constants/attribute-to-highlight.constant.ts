import { ICategory } from "@/category/interfaces/category.interface";

export type AttributeToHighlightCategory = keyof Pick<ICategory, 'name'>;
