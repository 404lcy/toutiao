<template>
  <div class="article-item">
    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]"></van-image>
      </template>
      <template #label>
        <div class="img2" v-if="article.cover.type === 3">
          <van-image
            class="img"
            v-for="item in article.cover.images"
            :key="item"
            :src="item"
          ></van-image>
        </div>
        <div class="spans">
          <span>{{ article.aut_name }}</span>
          <span>评论{{ article.aut_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
  .img {
    width: 200px;
    height: 200px;
  }
  .img2 {
    display: flex;
    justify-content: space-around;
  }
  .spans {
    span {
      margin-right: 20px;
    }
  }
}
</style>
