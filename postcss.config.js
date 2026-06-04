import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    purgeCSSPlugin({
      content: ["./dist/**/*.html"],

      // 👇 this is the important part
      safelist: {
        standard: ["data-theme", /data-theme="dark"/, /\[data-theme="dark"\]/],
      },
    }),
  ],
};
