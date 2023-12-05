import request from "@/utils/http";

export const getCategoriesAPI = () => {
  return request({
    url: "/category/top",
  });
};
