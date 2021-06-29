<template>
  <h3>Editar Tarifa</h3>
  <rate-form :id="id" @submit="editRate" />
</template>

<script>
import RateForm from "@/components/RateForm.vue";
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  components: {
    RateForm,
  },

  methods: {
    editRate(rate) {
      CalculatorServices.putRate(this.id, rate)
        .then(() => this.$store.commit("pullTechnologies"))
        .catch((error) => console.error(error));
    },
  },

  computed: {
    id() {
      return parseInt(this.$route.query.id);
    },
  },
};
</script>
