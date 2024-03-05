import { isArray, isNumber, isString } from 'lodash';

export type ComparativeConfig = {
  equal?: boolean;
};

export class BaseFilterBuilder {
  protected filters: string[][];

  constructor() {
    this.filters = [];
  }

  protected generateFilter<TName extends string>(name: TName, value?: string | string[]) {
    if (value && isString(value)) {
      this.filters.push([`${name}='${value}'`]);
    }

    if (value && Array.isArray(value)) {
      const filter = value.map((item) => `${name}='${item}'`);
      this.filters.push(filter);
    }

    return this;
  }

  protected excludeIds(ids?: string[]) {
    if(!ids) return this;
    const everyIdIsString = isArray(ids) && ids.every((id) => isString(id));
    if (everyIdIsString) {
      this.filters.push([`NOT id IN [${ids}]`]);
    }
    return this;
  }

  protected includeProperty<TName extends string>(name: TName, values?: string[]) {
    if (!values) return this;
    const everyValueIsString = isArray(values) && values.every((val) => isString(val));
    if (everyValueIsString) {
      this.filters.push([`${name} IN [${values}]`]);
    }
    return this;
  }

  protected excludeProperty(property: string, values?: string[]) {
    if (!values) return this;
    const everyValIsString = isArray(values) && values.every((val) => isString(val));
    if (everyValIsString) {
      this.filters.push([`NOT ${property} IN [${values}]`]);
    }
    return this;
  }

  greaterThan<TName extends string>(name: TName, value?: number, config?: ComparativeConfig) {
    if (isNumber(value)) {
      this.filters.push([`${name}>${config?.equal ? '=' : ''}${value}`]);
    }

    return this;
  }

  lessThan<TName extends string>(name: TName, value?: number, config?: ComparativeConfig) {
    if (isNumber(value)) {
      this.filters.push([`${name}<${config?.equal ? '=' : ''}${value}`]);
    }
    return this;
  }

  build(): string[][] {
    return this.filters;
  }
}
