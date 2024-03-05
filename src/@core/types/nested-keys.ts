/**
 * Get all the keys of an object, including nested keys
 * Reference: https://dev.to/scooperdev/supporting-circularly-referenced-mapped-types-in-typescript-4825
 */

type Digit = 1 | 2 | 3 | 4 | 5;
type NextDigit = [1, 2, 3, 4, 'STOP'];
type Inc<T> = T extends Digit ? NextDigit[T] : 'STOP';
type StringOrNumKeys<TObj> = keyof TObj & (string | number);
type NestedPath<TValue extends Record<string, any>, Prefix extends string, TDepth> = TValue extends Record<string, any>
  ? `${Prefix}.${TDepth extends 'STOP' ? never : NestedKeys<TValue, TDepth>}`
  : never;
/**
 * Get all the keys of an object, by default the maximum depth of the nested keys that will be returned is 2.
 */
export type NestedKeys<TData extends Record<string, any>, TDepth = 2> = TData extends Array<any> | Date
  ? never
  : {
      [TKey in StringOrNumKeys<TData>]:
        | `${TKey}`
        | (TData[TKey] extends Array<Record<string, any>> ? NestedPath<TData[TKey][0], `${TKey}`, Inc<TDepth>> : never)
        | (TData[TKey] extends Record<string, any> ? NestedPath<TData[TKey], `${TKey}`, Inc<TDepth>> : never);
    }[StringOrNumKeys<TData>];
