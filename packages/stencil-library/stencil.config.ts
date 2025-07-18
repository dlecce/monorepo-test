import { Config } from '@stencil/core';
import alias from '@rollup/plugin-alias';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

export const config: Config = {
  namespace: 'stencil-library',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
  rollupPlugins: {
    before: [
      alias({
        entries: [
          {
            find: '@git-diff-view/lowlight',
            replacement: resolve(__dirname, 'src/utils/lowlight/index.ts'),
          },
        ],
      }),
    ],
    after: [
      visualizer({
        filename: 'bundle-stats.html',
        gzipSize: true
      }),
    ],
  },
};
