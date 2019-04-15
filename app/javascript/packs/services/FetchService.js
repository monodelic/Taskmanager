import axios from "axios";

export function authenticityToken() {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.content : null;
}

function headers() {
  return {
    Accept: "*/*",
    "content-Type": "application/json",
    "X-CSRF-Token": authenticityToken(),
    "X-Requested-With": "XMLHttpRequest"
  };
}

export default {
  get(url, body) {
    const options = {
      method: "get",
      headers: headers(),
      data: body,
      url
    };
    return axios(options);
  },
  put(url, body) {
    const options = {
      method: "put",
      headers: headers(),
      data: body,
      url
    };
    return axios(options);
  },
  delete(url, body) {
    const options = {
      method: "delete",
      headers: headers(),
      data: body,
      url
    };
    return axios(options);
  },
  post(url, body) {
    const options = {
      method: "post",
      headers: headers(),
      data: body,
      url
    };
    return axios(options);
  }
};
