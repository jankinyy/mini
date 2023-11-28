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
