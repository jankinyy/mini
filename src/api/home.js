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
