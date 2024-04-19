// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "", "index.html"),
        nested: resolve(__dirname, "/create", "src/pages/create.html"),
      },
    },
  },
});

// input: {
//   main: resolve(__dirname, "index.html"),
//   nested: resolve(__dirname, "src/pages/create.html"),
// },