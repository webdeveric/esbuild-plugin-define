#!/usr/bin/env node

async function validatePaths(paths) {
  for (const file of paths) {
    console.group(`Validating ${file}`);

    const checks = new Map();

    checks.set(`require('${file}');`, () => {
      require(file);
    });

    checks.set(`import('${file}');`, async () => {
      await import(file);
    });

    for (const [file, fn] of checks) {
      try {
        await fn();

        console.log(`✅ ${file}`);
      } catch (error) {
        console.log(`❌ ${file}`);
        console.error(error);

        process.exitCode = 1;
      }
    }

    console.groupEnd();
  }
}

if (typeof process.env.npm_package_name === 'string') {
  const path = require('node:path');

  const { globSync } = require('glob');

  const srcDir = path.resolve(require.main.path, '..', 'src');

  const paths = globSync(`${srcDir}/**/*.ts`, {
    ignore: {
      ignored: path => /\.test\.ts$/.test(path.name),
    },
  }).map(tsFile => tsFile.replace(srcDir, process.env.npm_package_name).replace(/\.ts$/, ''));

  paths.unshift(process.env.npm_package_name);

  validatePaths(paths).catch(error => console.error(error));
} else {
  console.error('Cannot find npm package name in your environment.');
  console.info('Run this script from your package.json scripts block.');
  console.info('Example: pnpm validate');
}
