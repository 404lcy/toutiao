<template>
  <div class="login-container">
    <van-nav-bar name="chat-o" title="登入">
      <template #left>
        <van-icon name="cross" color="#fff" @click="$router.push('/my')" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        :maxlength="11"
        required
        placeholder="用户名"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" class="toutiao"> </ToutiaoIcon>
        </template>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        type="number"
        :maxlength="6"
        required
        placeholder="密码"
        :rules="rules.code"
        >-+
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" class="toutiao"> </ToutiaoIcon>
        </template>

        <template #button>
          <van-count-down
            v-if="isShowtime"
            @finish="isShowtime = false"
            time="5000"
            format=" ss s"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            class="send-sms-btn"
            :loading="isdisable"
            @click="getVerificationCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { onSubmit, getSmsCode } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      isShowtime: false,
      isdisable: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号码！",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码！",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能为6位",
          },
        ],
      },
    };
  },
  methods: {
    //点击按钮的提交事件
    async onSubmit() {
      try {
        //提交后请求数据
        const res = await onSubmit(this.user);
        console.log(res);
        this.$store.commit("setuser", res.data.data);
        Toast.success("登入成功");
        this.$router.push("/");
      } catch (e) {
        //打印报错的内容
        console.log(e);
        //失败的话返回失败的结果或者是把其他的错误
        Toast.fail(e?.response?.data?.message || "服务端错误");
      }
      const res = await onSubmit(this.user);
      console.log(res);
      // console.log(values);
    },
    async getVerificationCode() {
      try {
        await this.$refs.from.validate("mobile"); //返回的是promise对象
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isdisable = true;
        await getSmsCode(this.user.mobile);
        this.isShowtime = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        console.log(e);
        this.$toast.fail(e?.response?.data?.message || "出错了");
        // this.isShowtime = false;
      } finally {
        this.isdisable = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
