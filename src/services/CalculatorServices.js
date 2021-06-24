import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://my-json-server.typicode.com/agustinruatta/fake_json_server_db",
});

export default {
  getTechnologies() {
    return apiClient.get("/technologies");
  },
};
