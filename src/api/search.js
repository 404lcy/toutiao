import request from "@/utils/request.js";

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};
export function getSearch(params) {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params
  })
}
