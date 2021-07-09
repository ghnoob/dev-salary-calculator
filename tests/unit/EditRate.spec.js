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
    query: { id: 1 },
  };

  test("Cuando se reciben los datos del formulario se llama a la API", async () => {
    const spy = jest
      .spyOn(CalculatorServices, "putRate")
      .mockImplementation(() => ({ status: 200, data: [] }));

    const wrapper = shallowMount(EditRate, {
      global: {
        mocks: { $store, $router, $route },
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
