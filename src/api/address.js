import request from "@/utils/http";

export const getAddressAPI = () => {
  return request({
    url: "/member/address",
  });
};

export const addAddressAPI = (data) => {
  return request({
    url: "/member/address",
    method: "post",
    data,
  });
};
