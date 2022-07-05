module.exports = {
  plugins: {
    autoprefixer: {
      Browserslist: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      //根据设计稿的尺寸
      rootValue: (arg) => {
        return arg.file.includes("vant") ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
