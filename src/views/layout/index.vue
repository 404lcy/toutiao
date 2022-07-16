<template>
<div class='layout-container'>
  <router-view></router-view>
  <van-tabbar v-model="active" class="layout-tabbar"  route>
  <van-tabbar-item icon="home-o" to='/home'>
    <template #icon>
     <ToutiaoIcon icon='shouye'></ToutiaoIcon>
    </template>
    首页
    </van-tabbar-item>
  <van-tabbar-item icon="search" to='/qe'>
    <template #icon>
     <ToutiaoIcon icon='wenda'></ToutiaoIcon>
    </template>问答</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to='/video'>
    <template #icon>
     <ToutiaoIcon icon='shipin'></ToutiaoIcon>
    </template>视频</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to='/my'>
    <template #icon>
     <ToutiaoIcon icon='wode'></ToutiaoIcon>
    </template>我的</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>

export default {
    data() {
      return {
        active: 0
      }
    },
}
</script>

<style scoped lang='less'>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}

</style>
