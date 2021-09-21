import { shallowMount, flushPromises } from "@vue/test-utils";
import EditRate from "@/views/EditRate.vue";
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";
import $router from "./mocks/router";
import $toast from "./mocks/toast";
import { $store } from "./mocks/store";

describe("EditRate", () => {
  const $route = {
    params: { id: "1" },
  };

  const mockData = {
    data: {
      technology_id: 1,
      seniority: "senior",
      language: "english",
      average_salary_in_cents: "10000000",
      gross_margin_in_cents: "200000",
      currency: "ars",
    },
  };

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    CalculatorServices.putRate = jest.fn(() => mockData);

    const wrapper = shallowMount(EditRate, {
      global: {
        mocks: { $store, $router, $route, $toast },
      },
    });

    wrapper.findComponent(RateForm).vm.$emit("submitted", mockData.data);

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.putRate).toHaveBeenCalled();
    expect(CalculatorServices.putRate).toHaveBeenCalledWith(mockData.data);

    await flushPromises();

    expect($store.commit).toHaveBeenCalled();
    expect($store.commit).toHaveBeenCalledWith("editRate", mockData.data);

    expect($toast.clear).toHaveBeenCalled();
    expect($toast.success).toHaveBeenCalled();

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "RateList" });
  });

  test("Si hay un error se muestra un mensaje", async () => {
    CalculatorServices.putRate = jest.fn(() => {
      throw new Error();
    });

    const wrapper = shallowMount(EditRate, {
      global: {
        mocks: { $store, $router, $route, $toast },
      },
    });

    wrapper.findComponent(RateForm).vm.$emit("submitted", mockData.data);

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.putRate).toHaveBeenCalled();
    expect(CalculatorServices.putRate).toHaveBeenCalledWith(mockData.data);

    await flushPromises();

    expect($toast.clear).toHaveBeenCalled();
    expect($toast.error).toHaveBeenCalled();
  });
});
