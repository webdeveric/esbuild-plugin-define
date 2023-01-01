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
    expect(
      convertToDefineObject({
        test: true,
        name: 'Test',
        age: 100,
        symbol: Symbol.for('Not going to work'),
      }),
    ).toMatchObject(
      expect.objectContaining({
        test: 'true',
        name: '"Test"',
        age: '100',
        symbol: 'undefined',
      }),
    );
  });

  it('Flattens objects into a string record', () => {
    expect(
      convertToDefineObject({
        TEST: true,
        other: {
          data: 100,
        },
        process: { env: { TEST: true, DEMO: ['demo', 100] } },
      }),
    ).toMatchObject(
      expect.objectContaining({
        TEST: 'true',
        'other.data': '100',
        'process.env.TEST': 'true',
        'process.env.DEMO': '["demo",100]',
      }),
    );
  });

  it('Undefined values get "undefined" as a string', () => {
    expect(
      convertToDefineObject({
        process: { env: { TEST: undefined } },
      }),
    ).toMatchObject(expect.objectContaining({ 'process.env.TEST': 'undefined' }));
  });
});
