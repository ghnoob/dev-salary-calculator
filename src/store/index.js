import { createStore } from "vuex";
import CalculatorServices from "../services/CalculatorServices.js";

export default createStore({
  state: {
    technologies: [],
    rates: [],
  },
  mutations: {
    pullTechnologies(state) {
      CalculatorServices.getTechnologies()
        .then((response) => (state.technologies = response.data))
        .catch((error) => console.error(error));
    },
    pullRates(state) {
      CalculatorServices.getRates()
        .then((response) => (state.rates = response.data))
        .catch((error) => console.error(error));
    },
  },
  actions: {},
  modules: {},
});
