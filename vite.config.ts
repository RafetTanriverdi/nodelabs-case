
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function resolveSrc(_path: string): string {
  return path.resolve(__dirname, "./src", _path);
}

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom", "react-router", "react-router-dom"],
    alias: {
      "@rt": resolveSrc(""),
      
    },
  },


  plugins: [
    react() as unknown as PluginOption,
 
  ],
  define: {
    global: {},
  },
});
