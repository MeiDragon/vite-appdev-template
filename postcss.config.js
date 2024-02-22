const isH5Mode = true
module.exports = {
  plugins: [
    require('postcss-preset-env'), // 加前缀
    // 把px转成rem
    isH5Mode && require('postcss-pxtorem')({
      // H5设计稿x2倍图
      rootValue: 100 / 2, // 换算比例，rem->px 1:100，所以px值除100转为rem值
      unitPrecision: 3, //允许REM单位增长到的十进制数字,小数点后保留的位数
      propList: ['*'],
      // propWhiteList: [], //默认值为空数组，禁用白名单并启用所有属性。
      // propBlackList: [], //黑名单
      exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      selectorBlackList: ['.var', 'html'], // 要忽略并保留为px的选择器
      mediaQuery: false,  // （布尔值）允许在媒体查询中转换px。
      minPixelValue: 2 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
    })
  ],
}
