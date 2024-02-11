import type {BaseEntry} from "./types";

export function assertValue<T>(value: T, errorMessage = 'Value is undefined or null'): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(errorMessage);
  }
}

export function mergeParam<T>(input: Array<T | undefined | null>, defaultValue?: T) {
  return input.find((v) => v !== undefined || null) ?? defaultValue ?? undefined;
}

export function isContentfulObject<T extends BaseEntry>(obj: T): obj is T {
  return Boolean(obj && obj.sys && obj.sys.id && obj.sys.type && obj.fields);
}