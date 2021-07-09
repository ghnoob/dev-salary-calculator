import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

const $store = {
  commit: jest.fn(),
};

describe("App.vue", () => {
  test("Se cargan las tecnologías y las tarifas del store", async () => {
    shallowMount(App, {
      global: {
        mocks: {
          $store,
        },
      },
    });

    expect($store.commit).toHaveBeenCalled();
  });
});
