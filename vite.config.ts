import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
  server: {
    port: 4173,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4173",
  },
});

