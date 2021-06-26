import CalculatorServices from "./CalculatorServices.js";

const store = {
  technologies: [],
  fillTechnologies() {
    CalculatorServices.getTechnologies()
      .then((response) => (this.technologies = response.data))
      .catch((error) => console.error(error));
  },
};

export default store;
