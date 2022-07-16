<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar title="回复" @click-left="$emit('close')">
      <template #left>
        <van-icon color="#fff" name="cross"></van-icon>
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="currentComment"></comment-item>
    <!-- /当前评论项 -->

    <!-- 评论的回复列表 -->
    <van-cell title="评论回复" :border="false"></van-cell>
    <comment-list
      type="c"
      :list="list"
      :source="currentComment.com_id"
    ></comment-list>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        type="c"
        :target="currentComment.com_id"
        @postSuccess="postSuccess"
      ></comment-post>
    </van-popup>
    <!-- /发布评论 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList, CommentPost },
  props: {
    currentComment: {
      type: Object,
    },
  },
  data() {
    return {
      isPostShow: false,
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postSuccess(comment) {
      this.isPostShow = false;
      this.list.unshift(comment);
      this.currentComment.reply_count++;
    },
  },
};
</script>

<style scoped lang="less">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
