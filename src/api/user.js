import axios from "@/utils/request.js";

// import { config } from "vue/types/umd";
export const onSubmit = (data) =>
  axios({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
export const getSmsCode = (mobile) =>
  axios({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });

export const fatchUserInfo = () =>
  axios({
    method: "GET",
    url: "/v1_0/user",
  });
export const getArticles = (params) =>
  axios({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
/**
 * 添加关注
 */
export const addFollow = (userId) => {
  axios({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId,
    },
  });
};

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  axios({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`,
  });
};
/**
 * 收藏文章
 */
export const addCollect = (target) => {
  axios({
    method: "POST",
    url: "/v1_0/article/collections",
    data: {
      target,
    },
  });
};

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  axios({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`,
  });
};
/**
 * 点赞
 */
export const addLike = (articleId) => {
  axios({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target: articleId,
    },
  });
};

/**
 * 取消点赞
 */
export const deleteLike = (articleId) => {
  axios({
    method: "DELETE",
    url: `/v1_0/article/likings/${articleId}`,
  });
};
