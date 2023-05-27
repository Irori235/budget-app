import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      input: "src/index.tsx", // ここで正しいエントリーポイントを指定
    },
  },
};
