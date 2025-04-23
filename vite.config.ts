import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "unplugin-vue-components/vite";
import myComponentsResolver from "./src/myComponents";

export default defineConfig({
  plugins: [
    uni(),
    Components({
      resolvers: [
        myComponentsResolver, // 添加自定义解析器
      ],
    }),
  ],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "hy-app/theme.scss";',
      },
    },
  },
});
