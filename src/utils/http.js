import store from "@/store";
const baseUrl = "https://pcapi-xiaotuxian-front-devtest.itheima.net";
const interceptor = {
  invoke(args) {
    uni.showLoading({
      title: "加载中",
    });
    if (!args.url.startsWith("http")) {
      args.url = baseUrl + args.url;
    }
    args.header = {
      ...args.header,
      "source-client": "miniapp",
    };
    //如果有token，默认放到请求头中
    if (store.state.user.profile) {
      args.header.Authorization = store.state.user.profile.token;
    }
  },
  complete(res) {
    uni.hideLoading();
  },
};
uni.addInterceptor("request", interceptor);
uni.addInterceptor("uploadFile", interceptor);

const http = async (option) => {
  const res = await uni.request(option);

  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data;
  }
  if (res.statusCode === 401) {
    uni.navigateTo({ url: "/pages/login/index" });
    return;
  }
};
export default http;
