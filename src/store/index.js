import { createStore } from "vuex";

export default createStore({
  state: {
    technologies: [],
    rates: [],
  },
  mutations: {
    setTechnologies(state, technologies) {
      state.technologies = technologies;
    },
    setRates(state, rates) {
      state.rates = rates;
    },
    pushRate(state, rate) {
      state.rates.push(rate);
    },
    editRate(state, rate) {
      const index = state.rates.findIndex((item) => item.id === rate.id);
      if (index >= 0) {
        state.rates[index] = rate;
      }
    },
    deleteRate(state, id) {
      const index = state.rates.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.rates.splice(index, 1);
      }
    },
  },
});
