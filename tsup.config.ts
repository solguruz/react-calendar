import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  tsconfig: './tsconfig.lib.json',
  target: 'es2020',
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['react', 'react-dom'],
  noExternal: ['dayjs'],
  treeshake: true,
});
