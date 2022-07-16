<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteShow">
          <van-tag type="danger" @click="deleteAll">全部删除</van-tag>
          <van-tag type="success" @click="isDeleteShow = false">完成</van-tag>
        </template>
        <van-icon name="delete" v-else @click="isDeleteShow = true"></van-icon>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="clickHistoryItem(item, index)"
    >
      <template #default>
        <van-icon name="clear" v-if="isDeleteShow"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="我是历史记录">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDeleteShow: false,
    };
  },
  props: {
    searchHistory: Array,
  },
  methods: {
    deleteAll() {
      this.$emit("deleteAll");
    },
    clickHistoryItem(item, index) {
      //如果是在删除的状态

      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1);
      } else {
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style></style>
