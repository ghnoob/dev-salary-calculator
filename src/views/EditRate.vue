<template>
  <h3>Editar Tarifa</h3>
  <rate-form :edit="true" @submitted="editRate" />
</template>

<script>
import RateForm from "../components/RateForm.vue";
import CalculatorServices from "../services/CalculatorServices.js";

export default {
  components: {
    RateForm,
  },

  methods: {
    async editRate(rate) {
      try {
        this.$toast.show("Editando...", { duration: false });
        const newRate = await CalculatorServices.putRate(rate);
        await this.$store.commit("editRate", newRate.data);
        this.$toast.clear();
        this.$toast.success("Editada correctamente");
        this.$router.push({ name: "RateList" });
      } catch (error) {
        this.$toast.clear();
        this.$toast.error(error.toString());
      }
    },
  },
};
</script>
