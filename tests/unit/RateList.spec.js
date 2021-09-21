import { shallowMount, flushPromises } from "@vue/test-utils";
import RateList from "@/views/RateList.vue";
import CalculatorServices from "@/services/CalculatorServices.js";
import { $store, emptyStore } from "./mocks/store";
import $toast from "./mocks/toast";

describe("RateList", () => {
  describe("Sin rates", () => {
    test("La lista no se renderiza", () => {
      const wrapper = shallowMount(RateList, {
        global: {
          mocks: { $store: emptyStore },
          stubs: ["router-link"],
        },
      });
      expect(wrapper.find("table").exists()).toBe(false);
    });
  });

  describe("Con rates", () => {
    beforeAll(() => {
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

      expect(cells[0].text()).toBe("PHP");
      expect(cells[1].text()).toBe("Senior");
      expect(cells[2].text()).toBe("Inglés");
      expect(cells[3].text()).toBe("$100000");
      expect(cells[4].text()).toBe("$2000");
      expect(cells[5].text()).toBe("ars");

      expect(cells[6].text()).toBe("JavaScript");
      expect(cells[7].text()).toBe("Senior");
      expect(cells[8].text()).toBe("Inglés");
      expect(cells[9].text()).toBe("$80000");
      expect(cells[10].text()).toBe("$2000");
      expect(cells[11].text()).toBe("ars");
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
      expect(CalculatorServices.deleteRate).toHaveBeenCalledWith(1);

      await flushPromises();

      expect($store.commit).toHaveBeenCalled();
      expect($store.commit).toHaveBeenCalledWith("deleteRate", 1);

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
      expect(CalculatorServices.deleteRate).toHaveBeenCalledWith(1);

      await flushPromises();

      expect($toast.clear).toHaveBeenCalled();
      expect($toast.error).toHaveBeenCalled();
    });
  });
});
