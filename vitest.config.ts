import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/tests/vites.setup.ts"],
  },
});
