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
    editRate(rate) {
      CalculatorServices.putRate(this.id, rate)
        .then(() => {
          this.$store.commit("pullTechnologies");
          this.$router.push({ name: "RateList" });
        })
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
