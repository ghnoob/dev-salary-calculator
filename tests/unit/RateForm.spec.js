import { shallowMount, flushPromises } from "@vue/test-utils";
import RateForm from "@/components/RateForm.vue";
import { createStore } from "vuex";
import CalculatorServices from "@/services/CalculatorServices.js";

describe("RateForm", () => {
  const store = createStore({
    state: {
      technologies: [
        { id: 1, name: "JavaScript" },
        { id: 2, name: "C#" },
      ],
      rates: [
        {
          id: 1,
          technology_id: 2,
          seniority: "senior",
          language: "english",
          average_salary_in_cents: 4500000,
          gross_margin_in_cents: 32000,
          currency: "usd",
        },
      ],
    },
  });

  const spy = jest
    .spyOn(CalculatorServices, "getRateById")
    .mockImplementation((id) => {
      const rate = store.state.rates.find((rate) => rate.id === id);
      const response = { data: [] };
      if (rate !== undefined) response.data.push(rate);
      return response;
    });

  const $router = {
    push: jest.fn(),
    go: jest.fn(),
  };

  afterEach(() => jest.clearAllMocks());

  test("El formulario debe mostrar ciertos campos cuando se crea o se edita", () => {
    const wrapper = shallowMount(RateForm, {
      global: { plugins: [store] },
    });
    expect(wrapper.find("#salary").exists()).toBe(true);
    expect(wrapper.find("#gross-margin").exists()).toBe(true);
    expect(wrapper.findAll(".search-all").length).toBe(0);
  });

  test("El formulario debe mostrar ciertos campos cuando se busca", () => {
    const wrapper = shallowMount(RateForm, {
      global: { plugins: [store] },
      props: { search: true },
    });
    expect(wrapper.find("#salary").exists()).toBe(false);
    expect(wrapper.find("#gross-margin").exists()).toBe(false);
    expect(wrapper.findAll(".search-all").length).toBe(3);
  });

  test("Submit debe pasar los atributos correctamente", async () => {
    const wrapper = shallowMount(RateForm, {
      global: { plugins: [store] },
    });

    await wrapper.find("#technology").setValue(1);
    await wrapper.find("#seniority").setValue("junior");
    await wrapper.find("#language").setValue("spanish");
    await wrapper.find("#salary").setValue(2000000);
    await wrapper.find("#gross-margin").setValue(10000);
    await wrapper.find("#currency").setValue("ars");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("submitted");
    expect(wrapper.emitted("submitted")[0][0]).toStrictEqual({
      id: 2,
      technology_id: 1,
      seniority: "junior",
      language: "spanish",
      average_salary_in_cents: 2000000,
      gross_margin_in_cents: 10000,
      currency: "ars",
    });
  });

  test("Editar un id carga los datos en el formulario", async () => {
    const wrapper = shallowMount(RateForm, {
      global: {
        plugins: [store],
      },
      props: { id: 1 },
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);

    await flushPromises();

    expect(wrapper.find("#technology").element.value).toBe("2");
    expect(wrapper.find("#seniority").element.value).toBe("senior");
    expect(wrapper.find("#language").element.value).toBe("english");
    expect(wrapper.find("#salary").element.value).toBe("4500000");
    expect(wrapper.find("#gross-margin").element.value).toBe("32000");
    expect(wrapper.find("#currency").element.value).toBe("usd");
  });

  test("Un id que no existe redirige a la página de error", async () => {
    shallowMount(RateForm, {
      global: {
        plugins: [store],
        mocks: { $router },
      },
      props: { id: 2 },
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(2);

    await flushPromises();

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({ name: "NotFound" });
  });

  test("Presionar 'Cancelar' devuelve a la página anterior", async () => {
    const wrapper = shallowMount(RateForm, {
      global: {
        plugins: [store],
        mocks: { $router },
      },
    });

    await wrapper.find("#cancel").trigger("click");

    expect($router.go).toHaveBeenCalled();
    expect($router.go).toHaveBeenCalledWith(-1);
  });
});
