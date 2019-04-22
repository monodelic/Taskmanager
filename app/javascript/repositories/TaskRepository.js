import FetchService from "services/FetchService";

export default {
  index(params) {
    const url = window.Routes.api_v1_tasks_path(params);
    return FetchService.get(url);
  },

  show(id, params) {
    const url = window.Routes.api_v1_task_path(id);
    return FetchService.get(url);
  },

  update(id, params) {
    const url = window.Routes.api_v1_task_path(id);
    return FetchService.put(url, params);
  },

  create(params) {
    const url = window.Routes.api_v1_tasks_path();
    return FetchService.post(url, params);
  },

  destroy(id, params) {
    const url = window.Routes.api_v1_task_path(id);
    return FetchService.delete(url);
  }
};
