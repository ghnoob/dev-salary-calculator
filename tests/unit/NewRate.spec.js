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

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    const spy = jest
      .spyOn(CalculatorServices, "postRate")
      .mockImplementation(() => ({ status: 200, data: [] }));

    const wrapper = shallowMount(NewRate, {
      global: {
        mocks: { $store, $router },
      },
    });

    await wrapper.findComponent(RateForm).vm.$emit("submitted");

    expect(spy).toHaveBeenCalledTimes(1);
    expect($store.commit).toHaveBeenCalled();
    await flushPromises();
    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "RateList" });
  });
});
