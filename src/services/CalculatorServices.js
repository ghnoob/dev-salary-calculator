// https://my-json-server.typicode.com/agustinruatta/fake_json_server_db
// https://sheet.best/api/sheets/8df5bd24-9a7d-4ee5-81d6-a4aa81d1f940/tabs

import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://sheet.best/api/sheets/8df5bd24-9a7d-4ee5-81d6-a4aa81d1f940/tabs",
});

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
    return apiClient.put(`/rates/id/${rate.id}`, rate);
  },

  deleteRate(id) {
    return apiClient.delete(`/rates/id/${id}`);
  },

  searchRates(params) {
    return apiClient.get("/rates/search", { params });
  },
};
