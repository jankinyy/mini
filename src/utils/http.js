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
    uni.navigateTo({ url: "/src/pages/login" });
    return;
  }
};
export default http;
