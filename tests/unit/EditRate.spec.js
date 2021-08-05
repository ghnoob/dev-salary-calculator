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

  const $toast = {
    show: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    clear: jest.fn(),
  };

  const mockRate = {
    id: "1",
    technology_id: "1",
    seniority: "senior",
    language: "english",
    average_salary_in_cents: "10000000",
    gross_margin_in_cents: "200000",
    currency: "ars",
  };

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    CalculatorServices.putRate = jest.fn();

    const wrapper = shallowMount(EditRate, {
      global: {
        mocks: { $store, $router, $route, $toast },
      },
    });

    await wrapper.findComponent(RateForm).vm.$emit("submitted", mockRate);

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.putRate).toHaveBeenCalled();
    expect(CalculatorServices.putRate).toHaveBeenCalledWith(mockRate);

    await flushPromises();

    expect($store.commit).toHaveBeenCalled();
    expect($store.commit).toHaveBeenCalledWith("editRate", mockRate);

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

    await wrapper.findComponent(RateForm).vm.$emit("submitted", mockRate);

    expect($toast.show).toHaveBeenCalled();

    expect(CalculatorServices.putRate).toHaveBeenCalled();
    expect(CalculatorServices.putRate).toHaveBeenCalledWith(mockRate);

    await flushPromises();

    expect($toast.clear).toHaveBeenCalled();
    expect($toast.error).toHaveBeenCalled();
  });
});
