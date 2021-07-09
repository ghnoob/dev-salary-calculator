<template>
  <h3>Ingresar datos de la nueva tarifa</h3>
  <rate-form @submitted="addRate" />
</template>

<script>
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  components: {
    RateForm,
  },

  methods: {
    async addRate(rate) {
      await CalculatorServices.postRate(rate);
      await this.$store.commit("pullRates");
      this.$router.push({ name: "RateList" });
    },
  },
};
</script>
