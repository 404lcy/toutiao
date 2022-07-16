<template>
  <div class="channel-edit">
    <van-cell title="标题频道" style="text-align: center"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <div>
          <van-button
            class="endi-btn"
            type="danger"
            size="mini"
            @click="isItem = !isItem"
            plain
            round
          >
            {{ isItem ? "完成" : "编辑" }}
          </van-button>
        </div>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="my-channel">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in UserChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isItem && index !== 0">
          <van-icon name="clear" />
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"> </van-cell>
    <van-grid :gutter="10" direction="horizontal" class="recommend-channel">
      <van-grid-item
        v-for="value in recommendChannels"
        :key="value.id"
        @click="addchannel(value)"
      >
        <template #icon>
          <van-icon name="plus" />
        </template>
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import TOUTIAO_CHANNELS from "@/utils/constants.js";
import {
  fetchAllChannels,
  fetchaddChannels,
  deletUserChannel,
} from "@/api/index.js";
import { setlocal } from "@/utils/storages";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  name: "ChannelEdit",
  props: {
    UserChannels: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isItem: false,
    };
  },

  components: {},

  computed: {
    recommendChannels() {
      return _.differenceBy(this.allChannels, this.UserChannels, "id");
      //   return this.allChannels.filter((item) => {
      //     return !this.UserChannels.some((vulue) => vulue.id === item.id);
      //   });
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.fetchAllChannels();
  },
  mounted() {},
  methods: {
    onMyChannelClick(channel, index) {
      console.log(channel, index);
      if (this.isItem) {
        if (index === 0)
          return Notify({ type: "danger", message: "不能删除哦！" });
        if (index <= this.active) {
          this.$emit("changeActive", this.active - 1, true);
        }
        this.UserChannels.splice(index, 1);
        this.deletUserChannel(channel);
      } else {
        this.$emit("changeActive", index, false);
      }
    },
    async deletUserChannel(channel) {
      try {
        if (this.user) {
          await deletUserChannel(channel.id);
        } else {
          setlocal(TOUTIAO_CHANNELS, this.UserChannels);
        }
        this.$toast("删除成功");
      } catch (e) {
        this.$toast("删除失败1");
      }
    },
    async addchannel(channel) {
      this.UserChannels.push(channel);
      if (this.user) {
        try {
          // 已登录，数据存储到线上
          await fetchaddChannels({
            id: channels.id, // 频道 id
            seq: this.UserChannels.length, // 频道的 序号
          });
          this.$toast("删除成功");
        } catch (err) {
          // this.$toast("删除失败2");
          console.log(err);
        }
        // 已登录
      } else {
        // 未登陆
        setlocal(TOUTIAO_CHANNELS, this.UserChannels);
      }
    },
    async fetchAllChannels() {
      const res = await fetchAllChannels();
      this.allChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
  .my-channel {
    /deep/.van-icon-clear {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      color: #cacaca;
    }
    .active {
      color: red;
    }
  }
  .recommend-channel {
    .van-icon-plus {
      margin-top: 0;
      font-size: 30px;
      margin-right: 5px;
    }
  }
  .endi-btn {
    width: 120px;
  }
  .text {
    color: #222;
    font-size: 2px;
    // margin-top: 0;
  }

  /deep/.van-grid-item__content {
    // height: 27.2px;
    background-color: #f4f5f6;
  }
  /deep/.van-grid-item__icon-wrapper {
    margin: 0;
    padding: 0;
  }
}
</style>
