<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successtext"
      loading-text="更新中"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error="error"
        error-text="出错了！点击重新加载"
      >
        <articleList
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></articleList>
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleList from "@/components/articletem";
import { getArticles } from "@/api";
export default {
  name: "ArticleList",
  components: {
    articleList,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      successtext: "更新成功",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        this.list = [...this.list, ...res.data.data.results];
        // console.log(res);
        this.loading = false;
        if (res.data.data.results.lenght === 0) {
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        //如果请求出现错误，让error改为true重新请求==》展示错误的提示文字=》点击可以重新加载
        //loading
        this.error = true;
        this.loading = false;
        console.log(e);
      }

      // setTimeout(() => {
      //   for (let i = 0; i <script 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    async onRefresh() {
      //点击下来刷新
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.list = [...res.data.data.results, ...this.list];
      this.isLoading = false;
      this.successtext = `更新了 ${res.data.data.results.length} 条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
