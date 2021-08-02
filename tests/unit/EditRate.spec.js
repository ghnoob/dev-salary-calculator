import { shallowMount, flushPromises } from "@vue/test-utils";
import EditRate from "@/views/EditRate.vue";
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

describe("EditRate", () => {
  const $store = {
    commit: jest.fn(),
  };

  const $router = {
    push: jest.fn(),
  };

  const $route = {
    query: { id: "1" },
  };

  const mockRate = {
    id: "1",
    technology_id: "1",
    seniority: "senior",
    language: "english",
    average_salary_in_cents: 10000000,
    gross_margin_in_cents: 200000,
    currency: "ars",
  };

  beforeAll(() => {
    CalculatorServices.putRate = jest.fn();
  });

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    const wrapper = shallowMount(EditRate, {
      global: {
        mocks: { $store, $router, $route },
      },
    });

    await wrapper.findComponent(RateForm).vm.$emit("submitted", mockRate);

    expect(CalculatorServices.putRate).toHaveBeenCalled();
    expect(CalculatorServices.putRate).toHaveBeenCalledWith(mockRate);

    await flushPromises();

    expect($store.commit).toHaveBeenCalled();
    expect($store.commit).toHaveBeenCalledWith("editRate", mockRate);

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "RateList" });
  });
});
