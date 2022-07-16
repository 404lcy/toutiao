<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">黑马头条号</div>
          <div slot="label" class="publish-date">14小时前</div>
          <followUser v-model="article.is_followed" :userId="article.aut_id">
          </followUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->

        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="content"
        ></div>
        <van-divider>正文结束</van-divider>
        <comment-list
          :source="article.art_id"
          :list="list"
          @reply-click="onReplyClick"
        ></comment-list>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
        :badge="article.comm_count"
      />
      <collectArticle
        v-model="article.is_collected"
        :articleId="article.art_id"
      ></collectArticle>
      <likeArticle
        v-model="article.attitude"
        :articleId="article.art_id"
      ></likeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup position="bottom" v-model="isPostShow"
      ><comment-post
        :target="article.art_id"
        @postSuccess="postSuccess"
      ></comment-post>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 95%">
      <comment-reply
        v-if="isReplyShow"
        @close="isReplyShow = false"
        :currentComment="currentComment"
      ></comment-reply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article.js";
import { addFollow, deleteFollow } from "@/api/user";
import "github-markdown-css";
import followUser from "./components/follow-user/index.vue";
import collectArticle from "./components/collect-article/index.vue";
import likeArticle from "./components/like-article";
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from "./components/comment-reply.vue";
export default {
  name: "ArticleIndex",
  components: {
    followUser,
    collectArticle,
    likeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
  provide() {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      list: [],
      article: {},
      loading: false,
      isNotFound: false,
      isPostShow: false,
      isReplyShow: false, //评论回复
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArtcileInfo();
  },
  mounted() {},
  methods: {
    onReplyClick(comment) {
      this.isReplyShow = true;
      this.currentComment = comment;
    },
    postSuccess(data) {
      // console.log(data);
      this.list.unshift(data);
      //弹层关闭
      this.isPostShow = false;
    },
    async follow() {
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id);
        } else {
          await addFollow(this.article.aut_id);
          console.log(111);
        }
        this.article.is_followed = !this.article.is_followed;
        this.$notify({
          type: "success",
          message: this.article.is_followed ? "关注成功" : "取消关注",
        });
      } catch (e) {
        this.$notify({
          type: "danger",
          message: "操作失败",
        });
        console.log(e);
      }
    },
    previewImg() {
      // console.log(this.$refs.content);
      const imgs = this.$refs.content.querySelectorAll("img");
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: images,
            startPosition: index,
          });
        });
      });
      // console.log(images);
    },
    async loadArtcileInfo() {
      this.loading = true;
      try {
        const res = await getArticleById(this.articleId);

        this.article = res.data.data;
        this.loading = false;
        this.$nextTick(() => {
          this.previewImg();
        });
      } catch (err) {
        this.$toast("获取失败");
        this.loading = false;
        this.isNotFound = err.response.status === 404;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
}
</style>
