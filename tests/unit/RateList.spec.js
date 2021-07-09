import { shallowMount } from "@vue/test-utils";
import RateList from "@/views/RateList.vue";
import { createStore } from "vuex";
import CalculatorServices from "@/services/CalculatorServices.js";

const emptyStore = createStore({
  state() {
    return {
      technologies: [],
      rates: [],
    };
  },
});

const store = createStore({
  state() {
    return {
      technologies: [
        { id: 1, name: "PHP" },
        { id: 2, name: "JavaScript" },
        { id: 3, name: "C#" },
        { id: 4, name: "React.js" },
      ],
      rates: [
        {
          id: 1,
          technology_id: 2,
          seniority: "junior",
          language: "spanish",
          average_salary_in_cents: 4000000,
          gross_margin_in_cents: 20000,
          currency: "ars",
        },
        {
          id: 2,
          technology_id: 3,
          seniority: "semi_senior",
          language: "english",
          average_salary_in_cents: 87000000,
          gross_margin_in_cents: 320000,
          currency: "usd",
        },
      ],
    };
  },
});

describe("RateList", () => {
  test("La lista no se renderiza si el store está vacío", () => {
    const wrapper = shallowMount(RateList, {
      global: {
        plugins: [emptyStore],
      },
    });
    expect(wrapper.find("table").exists()).toBe(false);
  });

  test("La lista se renderiza si el store tiene elementos", () => {
    const wrapper = shallowMount(RateList, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find("table").exists()).toBe(true);
  });

  test("Los datos se deben listar correctamente", () => {
    const wrapper = shallowMount(RateList, {
      global: {
        plugins: [store],
      },
    });
    const cells = wrapper.findAll("td");

    expect(cells[0].text()).toBe("JavaScript");
    expect(cells[1].text()).toBe("Junior");
    expect(cells[2].text()).toBe("Español");
    expect(cells[3].text()).toBe("$40000");
    expect(cells[4].text()).toBe("$200");
    expect(cells[5].text()).toBe("ars");

    expect(cells[6].text()).toBe("C#");
    expect(cells[7].text()).toBe("Semi senior");
    expect(cells[8].text()).toBe("Inglés");
    expect(cells[9].text()).toBe("$870000");
    expect(cells[10].text()).toBe("$3200");
    expect(cells[11].text()).toBe("usd");
  });

  test("Eliminar un registro llama a la API", async () => {
    global.confirm = jest.fn().mockImplementation(() => true);

    const spy = jest.spyOn(CalculatorServices, "deleteRate");

    const wrapper = shallowMount(RateList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.setData({ selectedRateId: 0 });
    await wrapper.find("#delete").trigger("click");

    expect(global.confirm).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
  });
});
