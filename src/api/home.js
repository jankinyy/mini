import request from "@/utils/http";

export const getBannersAPI = (distributionSite = 1) => {
  return request({
    url: "/home/banner",
    data: {
      distributionSite,
    },
  });
};

export const getCategoryAPI = () => {
  return request({
    url: "/home/category/mutli",
  });
};

// 1. 封装API
export const getHotsAPI = () => {
  return request({
    url: "/home/hot/mutli",
  });
};

// 1. 封装API
export const getLikesAPI = (page = 1, pageSize = 10) => {
  return request({
    url: "/home/goods/guessLike",
    data: { page, pageSize },
  });
};

// 获取推荐商品
export const getRecomendsAPI = (url) => {
  return request({ url });
};
