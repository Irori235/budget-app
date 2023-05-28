import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      input: "./index.html", // ここで正しいエントリーポイントを指定
    },
  },
};
