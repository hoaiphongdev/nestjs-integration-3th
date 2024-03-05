declare type Stringified<T> = {
  [P in keyof T]: string;
};

declare interface JSON {
  stringify<T>(value: T, replacer?: (key: string, value: any) => any, space?: string | number): string & Stringified<T>;
  parse<T>(text: Stringified<T>, reviver?: (key: any, value: any) => any): T;
  parse(text: string, reviver?: (key: any, value: any) => any): any;
}

declare type Override<T, U> = Omit<T, keyof U> & U;
