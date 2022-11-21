import { convertToDefineObject } from './utils.js';

import type { Plugin } from 'esbuild';
import type { UnknownRecord } from '@webdeveric/utils';

export const PLUGIN_NAME = 'define-plugin';

export const definePlugin = (data: UnknownRecord): Plugin => {
  return {
    name: PLUGIN_NAME,
    setup(build) {
      Object.assign((build.initialOptions.define ??= {}), convertToDefineObject(data));
    },
  };
};
