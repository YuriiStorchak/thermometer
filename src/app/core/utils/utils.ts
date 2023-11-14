export function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined;
}
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
