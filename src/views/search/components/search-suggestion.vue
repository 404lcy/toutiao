sa
<template>
  <div>
    <van-cell
      @click="hancleClick(item)"
      v-for="(item, index) in list"
      :key="index"
      icon="search"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api";
import { debounce } from "lodash";
export default {
  data() {
    return {
      list: [],
    };
  },
  props: {
    searchText: String,
  },
  watch: {
    /* debounce(function(),时间) */
    searchText: {
      handler: debounce(function (value) {
        this.getSearchSuggestion(value);
      }, 500),

      immediate: true,
    },
  },
  methods: {
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
    hancleClick(value) {
      this.$emit("onSearch", value);
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      this.list = res.data.data.options;
      //   this.list = res.data.data.options.map((item) => {
      //     const reg = new RegExp(this.searchText, "gi");
      //     return item.replace(
      //       reg,
      //       `<sapn style='color:red>${this.searchText}</span>`
      //     );
      //   }); /* .filter((item) => item) || []; 防止出过来的数据为空 */
      //   console.log(res);
    },
  },
};
</script>

<style></style>
