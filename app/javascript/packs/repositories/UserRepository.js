import FetchService from "../services/FetchService";

export default {
  index(params) {
    const url = window.Routes.api_v1_users_path(params);
    return FetchService.get(url);
  }
};
