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

/**
 * 删除收货地址
 */
export const delAddressAPI = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: "delete",
  });
};
