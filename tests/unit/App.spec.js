import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

const $store = {
  commit: jest.fn(),
};

describe("App.vue", () => {
  test("Se cargan las tecnologías y las tarifas del store", async () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks: {
          $store,
        },
      },
    });
    await wrapper.trigger("beforeCreate");
    expect($store.commit).toHaveBeenCalled();
  });
});
