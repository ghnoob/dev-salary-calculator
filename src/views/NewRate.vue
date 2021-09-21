<template>
  <h3>Ingresar datos de la nueva tarifa</h3>
  <rate-form @submitted="addRate" />
</template>

<script>
import RateForm from "../components/RateForm.vue";
import CalculatorServices from "../services/CalculatorServices.js";

export default {
  components: {
    RateForm,
  },

  methods: {
    async addRate(rate) {
      try {
        this.$toast.show("Agregando tarifa...", { duration: false });
        const newRate = await CalculatorServices.postRate(rate);
        this.$store.commit("pushRate", newRate.data);
        this.$toast.clear();
        this.$toast.success("Agregada correctamente");
        this.$router.push({ name: "RateList" });
      } catch (error) {
        this.$toast.clear();
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
