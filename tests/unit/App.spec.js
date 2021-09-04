import { shallowMount, flushPromises } from "@vue/test-utils";
import CalculatorServices from "@/services/CalculatorServices";
import App from "@/App.vue";
import mockTechonologies from "./mocks/mockTechnologies";
import mockRates from "./mocks/mockRates";
import $toast from "./mocks/toast";
import { $store } from "./mocks/store";

describe("App.vue", () => {
  beforeAll(() => {
    CalculatorServices.getTechnologies = jest.fn(() => mockTechonologies);
  });

  test("Se cargan las tecnologías y las tarifas del store", async () => {
    CalculatorServices.getRates = jest.fn(() => mockRates);

    shallowMount(App, {
      global: {
        mocks: { $store, $toast },
        stubs: ["router-link", "router-view"],
      },
    });

    expect($toast.show).toHaveBeenCalled();

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
    expect($toast.clear).toHaveBeenCalled();
    expect($toast.success).toHaveBeenCalled();
  });

  test("Si hay un error se muestra un mensaje", async () => {
    CalculatorServices.getRates = jest.fn(() => {
      throw new Error();
    });

    shallowMount(App, {
      global: {
        mocks: { $store, $toast },
        stubs: ["router-link", "router-view"],
      },
    });

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.getTechnologies).toHaveBeenCalled();
    await flushPromises();
    expect(CalculatorServices.getRates).toHaveBeenCalled();

    await flushPromises();

    expect($toast.clear).toHaveBeenCalled();
    expect($toast.error).toHaveBeenCalled();
  });
});
