import { shallowMount, flushPromises } from "@vue/test-utils";
import CalcRatesResult from "@/views/CalcRatesResult.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

describe("CalcRatesResult", () => {
  const $store = {
    state: {
      technologies: [
        { id: 1, name: "PHP" },
        { id: 2, name: "JavaScript" },
        { id: 3, name: "C#" },
        { id: 4, name: "React.js" },
      ],
    },
  };

  const mockDatabase = [
    {
      id: 1,
      technology_id: 2,
      seniority: "semi_senior",
      language: "spanish",
      average_salary_in_cents: "6500000",
      gross_margin_in_cents: "99900",
      currency: "ars",
    },
    {
      id: 2,
      technology_id: 2,
      seniority: "senior",
      language: "english",
      average_salary_in_cents: "2000",
      gross_margin_in_cents: "100",
      currency: "ars",
    },
  ];

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

  beforeAll(() => {
    CalculatorServices.searchRates = jest.fn((query) => {
      const data = mockDatabase.filter((rate) => {
        for (let key of Object.keys(query)) {
          if (query[key] !== rate[key]) {
            return false;
          }
        }
        return true;
      });

      return { data };
    });
  });

  afterEach(() => jest.clearAllMocks());

  test("Se debe mostrar un mensaje cuando no se encuentran resultados de búsqueda", async () => {
    const wrapper = shallowMount(CalcRatesResult, {
      global: {
        mocks: { $store, $route: emptyRoute },
      },
    });

    expect(CalculatorServices.searchRates).toHaveBeenCalledTimes(1);
    expect(CalculatorServices.searchRates).toHaveBeenCalledWith(
      emptyRoute.query
    );

    await flushPromises();

    const params = wrapper.findAll("#params td");

    expect(params[0].text()).toBe("C#");
    expect(params[1].text()).toBe("Senior");
    expect(params[2].text()).toBe("Inglés");
    expect(params[3].text()).toBe("USD");

    expect(wrapper.find("#query-results").exists()).toBe(false);
    expect(wrapper.find("#no-query-results").exists()).toBe(true);
  });

  test("Se debe mostrar una table cuando se encuentran resultados de búsqueda", async () => {
    const wrapper = shallowMount(CalcRatesResult, {
      global: {
        mocks: { $store, $route: routeWithResults },
      },
    });

    expect(CalculatorServices.searchRates).toHaveBeenCalledTimes(1);
    expect(CalculatorServices.searchRates).toHaveBeenCalledWith(
      routeWithResults.query
    );

    await flushPromises();

    const params = wrapper.findAll("#params td");

    expect(params[0].text()).toBe("JavaScript");
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
