import type { Resolver } from "unplugin-vue-components/resolvers";

const myComponentsResolver: Resolver = (name: string) => {
  if (name.startsWith("Hy")) {
    return {
      name,
      from: "hy-app",
    };
  }
};

export default myComponentsResolver;
