import { shallowMount, flushPromises } from "@vue/test-utils";
import CalcRatesResult from "@/views/CalcRatesResult.vue";
import CalculatorServices from "@/services/CalculatorServices.js";
import $toast from "./mocks/toast";
import { $store } from "./mocks/store";

describe("CalcRatesResult", () => {
  const routeWithResults = {
    query: { technology_id: 2, currency: "ars" },
  };

  const emptyRoute = {
    query: {
      technology_id: 3,
      seniority: "senior",
      language: "english",
      currency: "usd",
    },
  };

  describe("Sin errores", () => {
    beforeAll(() => {
      CalculatorServices.searchRates = jest.fn((query) => {
        const data = $store.state.rates.filter((rate) => {
          return Object.keys(query).every((key) => query[key] === rate[key]);
        });

        return { data };
      });
    });

    afterEach(() => jest.clearAllMocks());

    test("Se debe mostrar un mensaje cuando no se encuentran resultados de búsqueda", async () => {
      const wrapper = shallowMount(CalcRatesResult, {
        global: {
          mocks: { $store, $toast, $route: emptyRoute },
        },
      });

      expect($toast.show).toHaveBeenCalled();

      expect(CalculatorServices.searchRates).toHaveBeenCalled();
      expect(CalculatorServices.searchRates).toHaveBeenCalledWith(
        emptyRoute.query
      );

      await flushPromises();

      expect($toast.clear).toHaveBeenCalled();
      expect($toast.success).toHaveBeenCalled();

      const params = wrapper.findAll("#params td");

      expect(params[0].text()).toBe("Java");
      expect(params[1].text()).toBe("Senior");
      expect(params[2].text()).toBe("Inglés");
      expect(params[3].text()).toBe("USD");

      expect(wrapper.find("#query-results").exists()).toBe(false);
      expect(wrapper.find("#no-query-results").exists()).toBe(true);
    });

    test("Se debe mostrar una tabla cuando se encuentran resultados de búsqueda", async () => {
      const wrapper = shallowMount(CalcRatesResult, {
        global: {
          mocks: { $store, $toast, $route: routeWithResults },
        },
      });

      expect($toast.show).toHaveBeenCalled();

      expect(CalculatorServices.searchRates).toHaveBeenCalledTimes(1);
      expect(CalculatorServices.searchRates).toHaveBeenCalledWith(
        routeWithResults.query
      );

      await flushPromises();

      expect($toast.clear).toHaveBeenCalled();
      expect($toast.success).toHaveBeenCalled();

      const params = wrapper.findAll("#params td");

      expect(params[0].text()).toBe("C#");
      expect(params[1].text()).toBe("Todas");
      expect(params[2].text()).toBe("Todos");
      expect(params[3].text()).toBe("ARS");

      expect(wrapper.find("#query-results").exists()).toBe(true);
      expect(wrapper.find("#no-query-results").exists()).toBe(false);

      const results = wrapper.findAll("#query-results td");

      expect(results[0].text()).toBe("$32510.00");
      expect(results[1].text()).toBe("$500.00");
      expect(results[2].text()).toBe("$33010.00");
    });
  });

  describe("Con errores", () => {
    beforeAll(() => {
      CalculatorServices.searchRates = jest.fn(() => {
        throw new Error();
      });
    });

    test("Se debe mostrar un mensaje de error", async () => {
      shallowMount(CalcRatesResult, {
        global: {
          mocks: { $store, $toast, $route: routeWithResults },
        },
      });

      expect($toast.show).toHaveBeenCalled();

      expect(CalculatorServices.searchRates).toHaveBeenCalledTimes(1);
      expect(CalculatorServices.searchRates).toHaveBeenCalledWith(
        routeWithResults.query
      );

      await flushPromises();

      expect($toast.clear).toHaveBeenCalled();
      expect($toast.error).toHaveBeenCalled();
    });
  });
});
