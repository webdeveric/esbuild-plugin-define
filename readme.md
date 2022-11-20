# `esbuild-plugin-define`

[![Build Status](https://github.com/webdeveric/esbuild-plugin-define/workflows/Node.js%20CI/badge.svg)](https://github.com/webdeveric/esbuild-plugin-define/actions)

## Install

```sh
npm install esbuild-plugin-define -D
```

## Usage

Add the plugin to your esbuild `plugins`.

Example `esbuild.config.cjs` file:

```js
const { definePlugin } = require('esbuild-plugin-define');

module.exports = () => {
  const config = {
    bundle: true,
    sourcemap: true,
    platform: 'node',
    target: 'es2022',
    format: 'esm',
    outputFileExtension: '.mjs',
    define: {},
    concurrency: 4,
    watch: {
      pattern: ['./src/**'],
      ignore: ['dist', 'node_modules'],
    },
    plugins: [
      definePlugin({
        process: {
          env: {
            BUILD_TIMESTAMP: new Date().toISOString(),
          },
        },
      }),
    ],
  };

  return config;
};
```
