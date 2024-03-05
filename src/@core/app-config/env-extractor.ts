import { isNumber, isString, parseInt } from 'lodash';

export class EnvExtractor {
  private readonly prefix: string = 'APP_';

  constructor(private readonly options: { prefixing: boolean } = { prefixing: true }) {}

  //#region Private method
  private getName(key: string): string {
    if(this.options.prefixing){
      return `${this.prefix}${key}`
    }
    return key;
  }
  //#endregion

  //#region Methods
  getNumber(key: string, _default?: number): number {
    const value = parseInt(process.env[this.getName(key)] as string, 10);
    if (!isNumber(value) && _default === undefined) {
      throw new Error(`Environment variable ${this.getName(key)} is required`);
    }
    if (!isNumber(value) && _default !== undefined) {
      return _default;
    }
    return value;
  }

  getString(key: string, _default?: string): string {
    const value = process.env[this.getName(key)] as string;
    if (!isString(value) && _default === undefined) {
      throw new Error(`Environment variable ${this.getName(key)} is required`);
    }
    if (!isString(value) && _default !== undefined) {
      return _default;
    }
    return value;
  }

  getEnum<Type>(key: string, _default?: Type): Type {
    const value = process.env[this.getName(key)] as unknown as Type;
    if (!isString(value) && _default === undefined) {
      throw new Error(`Environment variable ${this.getName(key)} is required`);
    }
    if (!isString(value) && _default !== undefined) {
      return _default;
    }
    return value;
  }

  noPrefix(): EnvExtractor {
    return new EnvExtractor({ prefixing: false });
  }

  getBoolean(key: string, _default?: boolean): boolean {
    const value = process.env[this.getName(key)] as string;
    if (!isString(value) && _default === undefined) {
      throw new Error(`Environment variable ${this.getName(key)} is required`);
    }
    if (!isString(value) && _default !== undefined) {
      return _default;
    }
    if (!/^(true|false)$/.test(value)) {
      throw new Error(`Environment variable ${this.getName(key)} is not a boolean`);
    }
    return value === 'true';
  }
  //#endregion
}
