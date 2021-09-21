import { shallowMount } from "@vue/test-utils";
import Technologies from "@/views/Technologies.vue";
import { $store } from "./mocks/store";

describe("Technologies.vue", () => {
  test("Las lista de tecnologías debe renderizarse correctamente", () => {
    const wrapper = shallowMount(Technologies, {
      global: {
        mocks: { $store },
      },
    });

    const list = wrapper.findAll("li");

    expect(list[0].text()).toBe("PHP");
    expect(list[1].text()).toBe("C#");
    expect(list[2].text()).toBe("Java");
    expect(list[3].text()).toBe("JavaScript");
  });
});
