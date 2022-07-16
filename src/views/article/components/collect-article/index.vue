<template>
  <van-button class="btn" @click="onLick">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
        :loading="loading"
      />
    </template>
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from "@/api/user";
export default {
  data() {
    return {
      loading: false,
    };
  },
  name: "collectArticle",
  model: {
    prop: "isCollected",
    event: "changeCollected",
  },
  props: {
    isCollected: {
      type: Boolean,
    },
    articleId: {
      type: [String, Number],
    },
  },
  methods: {
    async onLick() {
      this.loading = true;
      try {
        if (this.isCollected) {
          console.log(this.articleId);
          await deleteCollect(this.articleId);
        } else {
          await addCollect(this.articleId);
        }
        this.$emit("changeCollected", !this.isCollected);
        this.$toast(this.isCollected ? "取消收藏" : "收藏成功");
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
