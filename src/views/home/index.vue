<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button
          class="search-btn"
          round
          type="info"
          icon="search"
          size="small"
          to="/search"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <van-tabs class="channel-tabs" animated swipeable v-model="active">
      <van-tab v-for="item in UserChannels" :key="item.id" :title="item.name">
        <articleList :channel="item"></articleList>
      </van-tab>

      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="showPopup = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model="showPopup"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <ChannelEdit
        :UserChannels="UserChannels"
        :active="active"
        @changeActive="changeActive"
      ></ChannelEdit>
      <!-- <van-cell title="标题频道" style="text-align: center"></van-cell> -->
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from "./components/channel-edit";
import { getUserChannels } from "@/api";
import articleList from "./components/article-list.vue";
export default {
  name: "HomePage",
  components: {
    articleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      showPopup: false,
      UserChannels: [],
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannels();
  },
  mounted() {},
  methods: {
    changeActive(index, isShow) {
      //修改active的值方法
      this.active = index;
      //弹窗关闭
      this.showPopup = isShow;
    },
    async getUserChannels() {
      const res = await getUserChannels();
      this.UserChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding: 170px 0 100px;
  /deep/.van-nav-bar__title {
    width: 80%;
    max-width: unset;
  }
  .search-btn {
    background-color: #6fa8f5;
    width: 100%;
    color: #fff;
  }
  /deep/.van-icon-search {
    color: #fff;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
