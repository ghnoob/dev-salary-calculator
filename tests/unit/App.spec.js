import { shallowMount, flushPromises } from "@vue/test-utils";
import CalculatorServices from "@/services/CalculatorServices";
import App from "@/App.vue";

describe("App.vue", () => {
  const $store = {
    commit: jest.fn(),
  };

  const mockTechonologies = {
    data: [
      {
        id: 1,
        name: "PHP",
      },
      {
        id: 2,
        name: "C#",
      },
      {
        id: 3,
        name: "Java",
      },
      {
        id: 4,
        name: "JavaScript",
      },
    ],
  };

  const mockRates = {
    data: [
      {
        id: "1",
        technology_id: "1",
        seniority: "senior",
        language: "english",
        average_salary_in_cents: 10000000,
        gross_margin_in_cents: 200000,
        currency: "ars",
      },
      {
        id: "2",
        technology_id: "4",
        seniority: "senior",
        language: "english",
        average_salary_in_cents: 8000000,
        gross_margin_in_cents: 200000,
        currency: "ars",
      },
    ],
  };

  beforeAll(() => {
    CalculatorServices.getTechnologies = jest.fn(() => mockTechonologies);
    CalculatorServices.getRates = jest.fn(() => mockRates);
  });

  test("Se cargan las tecnologías y las tarifas del store", async () => {
    shallowMount(App, {
      global: {
        mocks: {
          $store,
        },
        stubs: ["router-link", "router-view"],
      },
    });

    expect(CalculatorServices.getTechnologies).toHaveBeenCalled();
    await flushPromises();
    expect(CalculatorServices.getRates).toHaveBeenCalled();

    await flushPromises();

    expect($store.commit).toHaveBeenCalledTimes(2);
    expect($store.commit).toHaveBeenCalledWith(
      "setTechnologies",
      mockTechonologies.data
    );
    expect($store.commit).toHaveBeenCalledWith("setRates", mockRates.data);
  });
});
