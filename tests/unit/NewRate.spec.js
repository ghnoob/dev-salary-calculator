import { shallowMount, flushPromises } from "@vue/test-utils";
import NewRate from "@/views/NewRate.vue";
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";
import $toast from "./mocks/toast";
import { $store } from "./mocks/store";
import $router from "./mocks/router";

describe("NewRate", () => {
  const mockData = {
    data: {
      id: 3,
      technology_id: 2,
      seniority: "semi_senior",
      language: "spanish",
      average_salary_in_cents: "6500000",
      gross_margin_in_cents: "99900",
      currency: "ars",
    },
  };

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    CalculatorServices.postRate = jest.fn(() => mockData);

    const wrapper = shallowMount(NewRate, {
      global: {
        mocks: { $store, $router, $toast },
      },
    });

    wrapper.findComponent(RateForm).vm.$emit("submitted", mockData.data);

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.postRate).toHaveBeenCalled();
    expect(CalculatorServices.postRate).toHaveBeenCalledWith(mockData.data);

    await flushPromises();

    expect($store.commit).toHaveBeenCalled();
    expect($store.commit).toHaveBeenCalledWith("pushRate", mockData.data);

    expect($toast.clear).toHaveBeenCalled();
    expect($toast.success).toHaveBeenCalled();

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "RateList" });
  });

  test("Si hay un error se muestra un mensaje", async () => {
    CalculatorServices.postRate = jest.fn(() => {
      throw new Error();
    });

    const wrapper = shallowMount(NewRate, {
      global: {
        mocks: { $store, $router, $toast },
      },
    });

    wrapper.findComponent(RateForm).vm.$emit("submitted", mockData.data);

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.postRate).toHaveBeenCalled();
    expect(CalculatorServices.postRate).toHaveBeenCalledWith(mockData.data);

    await flushPromises();

    expect($toast.clear).toHaveBeenCalled();
    expect($toast.error).toHaveBeenCalled();
  });
});
