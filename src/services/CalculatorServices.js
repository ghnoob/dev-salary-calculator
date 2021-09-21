import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:3000" });

export default {
  getTechnologies() {
    return apiClient.get("/technologies");
  },

  getRates() {
    return apiClient.get("/rates");
  },

  postRate(rate) {
    return apiClient.post("/rates", rate);
  },

  putRate(rate) {
    return apiClient.put(`/rates/${rate.id}`, rate);
  },

  deleteRate(id) {
    return apiClient.delete(`/rates/${id}`);
  },

  searchRates(params) {
    return apiClient.get("/rates", { params });
  },
};
