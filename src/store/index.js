import { createStore } from "vuex";
import CalculatorServices from "../services/CalculatorServices.js";

export default createStore({
  state: {
    technologies: [],
  },
  mutations: {
    pullTechnologies(state) {
      CalculatorServices.getTechnologies()
        .then((response) => (state.technologies = response.data))
        .catch((error) => console.error(error));
    },
  },
  actions: {},
  modules: {},
});
