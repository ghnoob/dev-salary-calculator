import { shallowMount } from "@vue/test-utils";
import CalcRatesParams from "@/views/CalcRatesParams.vue";
import RateForm from "@/components/RateForm.vue";

describe("CalcRatesParams", () => {
  test("Los datos recibidos del formulario se deben pasar a otra vista correctamente", async () => {
    const $router = { push: jest.fn() };

    const wrapper = shallowMount(CalcRatesParams, {
      global: {
        mocks: { $router },
      },
    });

    await wrapper.findComponent(RateForm).vm.$emit("submitted", {
      id: null,
      technology_id: "3",
      seniority: "semi_senior",
      language: "all",
      average_salary_in_cents: null,
      gross_margin_in_cents: null,
      currency: "usd",
    });

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({
      name: "CalcRatesResult",
      query: {
        technology_id: "3",
        seniority: "semi_senior",
        currency: "usd",
      },
    });
  });
});
