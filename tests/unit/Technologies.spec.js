import { shallowMount } from "@vue/test-utils";
import Technologies from "@/views/Technologies.vue";

const $store = {
  state: {
    technologies: [
      { id: 1, name: "PHP" },
      { id: 2, name: "JavaScript" },
      { id: 3, name: "C#" },
      { id: 4, name: "React.js" },
    ],
  },
};

describe("Technologies.vue", () => {
  test("Las lista de tecnologías debe renderizarse correctamente", () => {
    const wrapper = shallowMount(Technologies, {
      global: {
        mocks: { $store },
      },
    });

    const list = wrapper.findAll("span");

    expect(list[0].text()).toBe("PHP");
    expect(list[1].text()).toBe("JavaScript");
    expect(list[2].text()).toBe("C#");
    expect(list[3].text()).toBe("React.js");
  });
});
