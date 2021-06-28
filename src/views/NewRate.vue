<template>
  <h3>Ingresar datos de la nueva tarifa</h3>
  <rate-form @submit="addRate" />
</template>

<script>
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  components: {
    RateForm,
  },

  methods: {
    addRate(rate) {
      CalculatorServices.postRate(rate)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    },
  },
};
</script>
