import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()], // Removed viteSingleFile()
  base: '/DOSTOYNO2/', // Add this - replace with your actual repo name
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
