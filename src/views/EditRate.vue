<template>
  <h3>Editar Tarifa</h3>
  <rate-form :id="id" @submitted="editRate" />
</template>

<script>
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  components: {
    RateForm,
  },

  methods: {
    async editRate(rate) {
      await CalculatorServices.putRate(this.id, rate);
      await this.$store.commit("pullRates");
      this.$router.push({ name: "RateList" });
    },
  },

  computed: {
    id() {
      return parseInt(this.$route.query.id);
    },
  },
};
</script>
