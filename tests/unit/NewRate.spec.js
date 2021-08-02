import { shallowMount, flushPromises } from "@vue/test-utils";
import NewRate from "@/views/NewRate.vue";
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

describe("NewRate", () => {
  const $store = {
    commit: jest.fn(),
  };

  const $router = {
    push: jest.fn(),
  };

  const mockRate = {
    id: 3,
    technology_id: 2,
    seniority: "semi_senior",
    language: "spanish",
    average_salary_in_cents: "6500000",
    gross_margin_in_cents: "99900",
    currency: "ars",
  };

  beforeAll(() => {
    CalculatorServices.postRate = jest.fn();
  });

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    const wrapper = shallowMount(NewRate, {
      global: {
        mocks: { $store, $router },
      },
    });

    await wrapper.findComponent(RateForm).vm.$emit("submitted", mockRate);

    expect(CalculatorServices.postRate).toHaveBeenCalled();
    expect(CalculatorServices.postRate).toHaveBeenCalledWith(mockRate);

    await flushPromises();

    expect($store.commit).toHaveBeenCalled();
    expect($store.commit).toHaveBeenCalledWith("pushRate", mockRate);

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "RateList" });
  });
});
