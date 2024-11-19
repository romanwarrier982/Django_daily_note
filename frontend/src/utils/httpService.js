import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export default {
  request: axios.request,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
