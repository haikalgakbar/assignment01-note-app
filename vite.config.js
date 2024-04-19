// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notes: resolve(__dirname, "notes/index.html"),
        create: resolve(__dirname, "create/index.html"),
        edit: resolve(__dirname, "edit/index.html"),
      },
    },
  },
});