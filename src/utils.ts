export function assertValue<T>(value: T, errorMessage = 'Value is undefined or null'): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(errorMessage);
  }
}

export function mergeParam<T>(input: Array<T | undefined | null>, defaultValue?: T) {
  return input.find((v) => v !== undefined || null) ?? defaultValue ?? undefined;
}
