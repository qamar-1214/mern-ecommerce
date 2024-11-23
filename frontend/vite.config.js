import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      // List the dependencies that are causing the issue
      "chunk-DRWLMN53",
      "chunk-G3PMV62Z",
      "chunk-6BKLQ22S",
    ],
  },
});
