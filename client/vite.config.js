// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     globals: true,
//     environment: "happy-dom",
//     setupFiles: "./tests/setup.ts",
//   },
// });

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
  },
});
