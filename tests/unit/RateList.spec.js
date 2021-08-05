import { shallowMount, flushPromises } from "@vue/test-utils";
import RateList from "@/views/RateList.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

describe("RateList", () => {
  const $store = {
    state: {
      technologies: [
        { id: "1", name: "PHP" },
        { id: "2", name: "JavaScript" },
        { id: "3", name: "C#" },
        { id: "4", name: "React.js" },
      ],
      rates: [],
    },
    commit: jest.fn(),
  };

  const $toast = {
    show: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    clear: jest.fn(),
  };

  describe("Sin rates", () => {
    test("La lista no se renderiza", () => {
      const wrapper = shallowMount(RateList, {
        global: {
          mocks: { $store },
          stubs: ["router-link"],
        },
      });
      expect(wrapper.find("table").exists()).toBe(false);
    });
  });

  describe("Con rates", () => {
    const mockRates = [
      {
        id: "1",
        technology_id: "2",
        seniority: "junior",
        language: "spanish",
        average_salary_in_cents: "4000000",
        gross_margin_in_cents: "20000",
        currency: "ars",
      },
      {
        id: "2",
        technology_id: "3",
        seniority: "semi_senior",
        language: "english",
        average_salary_in_cents: "87000000",
        gross_margin_in_cents: "320000",
        currency: "usd",
      },
    ];

    beforeAll(() => {
      $store.state.rates = mockRates;
      global.confirm = jest.fn(() => true);
    });

    test("Los datos se deben listar correctamente", () => {
      const wrapper = shallowMount(RateList, {
        global: {
          mocks: { $store },
          stubs: ["router-link"],
        },
      });

      expect(wrapper.find("table").exists()).toBe(true);

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
      CalculatorServices.deleteRate = jest.fn();

      const wrapper = shallowMount(RateList, {
        global: {
          mocks: { $store, $toast },
          stubs: ["router-link"],
        },
      });

      await wrapper.find("tbody tr").trigger("click");
      await wrapper.find("#delete").trigger("click");

      expect(global.confirm).toHaveBeenCalled();

      expect($toast.show).toHaveBeenCalled();

      expect(CalculatorServices.deleteRate).toHaveBeenCalled();
      expect(CalculatorServices.deleteRate).toHaveBeenCalledWith("1");

      await flushPromises();

      expect($store.commit).toHaveBeenCalled();
      expect($store.commit).toHaveBeenCalledWith("deleteRate", "1");

      expect($toast.clear).toHaveBeenCalled();
      expect($toast.success).toHaveBeenCalled();
    });

    test("Si hay un error al eliminar se muestra un mensaje", async () => {
      CalculatorServices.deleteRate = jest.fn(() => {
        throw new Error();
      });

      const wrapper = shallowMount(RateList, {
        global: {
          mocks: { $store, $toast },
          stubs: ["router-link"],
        },
      });

      await wrapper.find("tbody tr").trigger("click");
      await wrapper.find("#delete").trigger("click");

      expect(global.confirm).toHaveBeenCalled();

      expect($toast.show).toHaveBeenCalled();

      expect(CalculatorServices.deleteRate).toHaveBeenCalled();
      expect(CalculatorServices.deleteRate).toHaveBeenCalledWith("1");

      await flushPromises();

      expect($toast.clear).toHaveBeenCalled();
      expect($toast.error).toHaveBeenCalled();
    });
  });
});
