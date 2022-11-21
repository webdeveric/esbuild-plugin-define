import { describe, expect, it } from 'vitest';

import { convertToDefineObject, makeKey } from './utils.js';

describe.concurrent('makeKey()', () => {
  it('Joins strings with a dot', () => {
    expect(makeKey('first', 'second')).toEqual('first.second');
  });

  it('Uses only truthy inputs', () => {
    expect(makeKey('first', '', 'third', undefined as unknown as string, 'fifth')).toEqual('first.third.fifth');
  });
});

describe('convertToDefineObject()', () => {
  it('Returns a string record', () => {
    expect(convertToDefineObject({ test: true })).toMatchObject(expect.objectContaining({ test: 'true' }));
  });

  it('Flattens objects into a string record', () => {
    expect(
      convertToDefineObject({
        process: { env: { TEST: true } },
      }),
    ).toMatchObject(expect.objectContaining({ 'process.env.TEST': 'true' }));
  });

  it('Undefined values get "undefined" as a string', () => {
    expect(
      convertToDefineObject({
        process: { env: { TEST: undefined } },
      }),
    ).toMatchObject(expect.objectContaining({ 'process.env.TEST': 'undefined' }));
  });
});
