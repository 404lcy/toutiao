<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" :searchText="searchText">
    </search-result>
    <!-- 搜索建议 -->

    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @onSearch="onSearch"
    ></search-suggestion>
    <!-- 搜索历史 -->
    <searchHistory
      v-else
      :searchHistory="searchHistory"
      @deleteAll="searchHistory = []"
      @onSearch="onSearch"
    >
    </searchHistory>
  </div>
</template>

<script>
import searchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import { HISTORYKEY } from "@/utils/constants.js";
import { setlocal, getStorage } from "@/utils/storages";
export default {
  components: {
    searchHistory,
    SearchSuggestion,
    SearchResult,
  },
  name: "SearchPage",

  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false,
      searchHistory: getStorage(HISTORYKEY) || [],
    };
  },
  computed: {},
  watch: {
    searchHistory(val) {
      setlocal(HISTORYKEY, val);
    },
  },
  created() {},
  methods: {
    onSearch(val) {
      this.searchText = val;
      this.isShowResult = true;
      const index = this.searchHistory.indexOf(val);
      if (index !== -1) {
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(val);
    },
    onCancel() {
      console.log("点击取消");
    },
  },
};
</script>

<style scoped></style>
