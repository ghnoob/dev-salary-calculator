import { createStore } from "vuex";
import CalculatorServices from "../services/CalculatorServices.js";

export default createStore({
  state: {
    technologies: [],
    rates: [],
  },
  mutations: {
    async pullTechnologies(state) {
      const response = await CalculatorServices.getTechnologies();
      state.technologies = response.data;
    },
    async pullRates(state) {
      const response = await CalculatorServices.getRates();
      state.rates = response.data;
    },
  },
  actions: {},
  modules: {},
});
