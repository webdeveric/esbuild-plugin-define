import type { KeyValueTuple, StringRecord, UnknownRecord } from './types.js';

export const makeKey = (...inputs: string[]): string => inputs.filter(input => !!input).join('.');

export function convertToDefineObject(data: UnknownRecord): StringRecord {
  const convertToEntries = <T extends object>(data: T, prefix = ''): KeyValueTuple[] => {
    return Object.entries(data).reduce<KeyValueTuple[]>((entries, [key, value]) => {
      const newKey = makeKey(prefix, key);

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        entries.push(...convertToEntries(value, newKey));
      } else {
        entries.push([newKey, JSON.stringify(value) ?? String(undefined)]);
      }

      return entries;
    }, []);
  };

  return Object.fromEntries(convertToEntries(data));
}
