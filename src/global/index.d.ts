export {};

declare global {
  // Global
  function noop(): void;
  function formSerializer(value: any, name?: string): FormData;
  function isNullOrUndefined(value: any): boolean;
  function isNullOrUndefinedOrEmpty(value: any): boolean;

  // Array
  interface Array<T> {
    /** Returns `true` if array has at least one item, otherwise `false`. */
    any(): boolean;
    /** Returns the first item of an array, otherwise throw an exception. */
    first(): T;
    /** Returns the first item of an array or `null`. */
    firstOrDefault(): T | null;
    /** Returns the last item of an array, otherwise throw an exception. */
    last(): T;
    /** Returns the last item of an array or `null`. */
    lastOrDefault(): T | null;
  }
}
