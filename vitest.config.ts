import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: false,
    // Node environment for pure utility tests (cn, lead-utils)
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
