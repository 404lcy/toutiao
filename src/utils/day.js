import dayjs from "dayjs";
//引入中文的时间包
import "dayjs/locale/zh-cn";
//引入的相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";
dayjs.extend(relativeTime);
//注册时间包

dayjs.locale("zh-cn");
// console.log(dayjs().format("YYYY-MM-DD"));
//当前的时间 to 目标时间
// console.log(dayjs().to(dayjs("2021-01-01")));

//过滤器
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(new Date(value)));
});
