import { build } from 'esbuild';

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

    const pluginBuild: Partial<PluginBuild> = {
      initialOptions: {
        define: {},
      },
    };

    await plugin.setup(pluginBuild as PluginBuild);

    expect(pluginBuild.initialOptions?.define).toMatchObject({
      test: 'true',
      name: '"Test"',
      age: '100',
    });
  });
});

describe('Usage with esbuild', () => {
  it('One level object', async () => {
    const results = await build({
      write: false,
      stdin: {
        contents: 'console.log(TEST)',
      },
      plugins: [
        definePlugin({
          TEST: true,
        }),
      ],
    });

    expect(results.outputFiles.at(0)?.text.trim()).toBe('console.log(true);');
  });

  it('Multi level object', async () => {
    const results = await build({
      write: false,
      stdin: {
        contents: 'console.log(Tester.Name)',
      },
      plugins: [
        definePlugin({
          Tester: {
            Name: 'Test Testerson',
          },
        }),
      ],
    });

    expect(results.outputFiles.at(0)?.text.trim()).toBe('console.log("Test Testerson");');
  });
});
