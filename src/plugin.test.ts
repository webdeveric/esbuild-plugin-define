import type { PluginBuild } from 'esbuild';

import { describe, expect, it } from 'vitest';

import { definePlugin, PLUGIN_NAME } from './plugin.js';

describe('definePlugin()', () => {
  it('Returns an esbuild plugin', () => {
    expect(definePlugin({})).toMatchObject({
      name: PLUGIN_NAME,
    });
  });

  it('Modifies initialOptions.define', async () => {
    const plugin = definePlugin({ test: true, name: 'Test', age: 100 });

    const build: Partial<PluginBuild> = {
      initialOptions: {
        define: {},
      },
    };

    await plugin.setup(build as PluginBuild);

    expect(build.initialOptions?.define).toMatchObject({
      test: 'true',
      name: '"Test"',
      age: '100',
    });
  });
});
