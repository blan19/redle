/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

const ALIAS_LIST = ["components", "utils"];

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "redle",
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: ALIAS_LIST.reduce((acc, name) => {
      acc[`~${name}`] = path.resolve(__dirname, `src/${name}`);
      return acc;
    }, {} as Record<string, string>),
  },
  test: {
    environment: "jsdom",
    setupFiles: "./__test__/setupTests.ts",
  },
});
