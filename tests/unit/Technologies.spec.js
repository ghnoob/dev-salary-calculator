import { shallowMount } from "@vue/test-utils";
import Technologies from "@/views/Technologies.vue";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      technologies: [
        { id: 1, name: "PHP" },
        { id: 2, name: "JavaScript" },
        { id: 3, name: "C#" },
        { id: 4, name: "React.js" },
      ],
    };
  },
});

describe("Technologies.vue", () => {
  test("Las lista de tecnologías debe renderizarse correctamente", () => {
    const wrapper = shallowMount(Technologies, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.text()).toContain("PHP");
    expect(wrapper.text()).toContain("JavaScript");
    expect(wrapper.text()).toContain("C#");
    expect(wrapper.text()).toContain("React.js");
  });
});
