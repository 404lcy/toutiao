<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="follow"
    v-if="!isFollowed"
    :loading="isFollowedLoading"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    v-else
    @click="follow"
    :loading="isFollowedLoading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api";
export default {
  data() {
    return {
      isFollowedLoading: false,
    };
  },
  model: {
    prop: "isFollowed",
    event: "changeIsFollowed",
  },
  props: {
    isFollowed: {
      type: [Boolean],
    },
    userId: {
      type: [Number, String],
    },
  },
  methods: {
    async follow() {
      this.isFollowedLoading = true;
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId);
        } else {
          await addFollow(this.userId);
        }
        // this.value = !this.value;
        this.$emit("changeIsFollowed", !this.isFollowed);
        this.$notify({
          type: "success",
          message: !this.isFollowed ? "关注成功" : "取消关注",
        });
        this.isFollowedLoading = false;
      } catch (e) {
        this.$notify({
          type: "danger",
          message: "操作失败",
        });
        this.isFollowedLoading = false;
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
