/**
 * Type guards for runtime type safety
 */

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isValidElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function hasProperty<T, K extends string>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return obj != null && typeof obj === 'object' && prop in obj;
}

export function isValidImageSrc(src: unknown): src is string {
  return isString(src) && src.length > 0 && !src.includes('javascript:');
}

export function isValidURL(url: unknown): url is string {
  if (!isString(url)) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function assertNonNull<T>(value: T | null | undefined, message?: string): T {
  if (value == null) {
    throw new Error(message || 'Value cannot be null or undefined');
  }
  return value;
}

export function isArrayWithLength<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}