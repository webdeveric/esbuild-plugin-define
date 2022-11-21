import { isObject } from '@webdeveric/utils/type-predicate';

import type { StringRecord, StringTuple } from './types.js';
import type { UnknownRecord } from '@webdeveric/utils';

export const makeKey = (...inputs: string[]): string => inputs.filter(input => !!input).join('.');

export function convertToDefineObject(data: UnknownRecord): StringRecord {
  const convertToEntries = (data: UnknownRecord, prefix = ''): StringTuple[] => {
    return Object.entries(data).reduce<StringTuple[]>((entries, [key, value]) => {
      const newKey = makeKey(prefix, key);

      if (isObject(value)) {
        entries.push(...convertToEntries(value, newKey));
      } else {
        entries.push([newKey, JSON.stringify(value) ?? String(undefined)]);
      }

      return entries;
    }, []);
  };

  return Object.fromEntries(convertToEntries(data));
}
