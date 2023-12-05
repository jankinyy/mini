import request from "@/utils/http";

export const loginByTestPhoneAPI = (phoneNumber) => {
  return request({
    url: "/login/wxMin/simple",
    method: "post",
    data: {
      phoneNumber,
    },
  });
};

//个人数据
/** 获取个人资料 */
export const getProfileAPI = () => request({ url: "/member/profile" });

/** 上传头像 */
export const uploadPhotoAPI = (filePath) => {
  return uni.uploadFile({
    url: "/member/profile/avatar",
    // 💥💥 不需要写post
    name: "file",
    // 💥💥 注意参数是一个临时路径
    filePath,
  });
};
//修改个人信息-编辑昵称-性别-职业
export const updateProfileAPI = (data) => {
  return request({ url: "/member/profile", method: "put", data });
};
