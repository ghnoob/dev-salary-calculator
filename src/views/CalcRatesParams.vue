<template>
  <h4>Ingrese los criterios de búsqueda</h4>
  <rate-form :search="true" @submitted="createQuery" />
</template>

<script>
import RateForm from "@/components/RateForm.vue";

export default {
  components: {
    RateForm,
  },

  methods: {
    createQuery(rate) {
      const queryObject = { currency: rate.currency };

      if (rate.technology_id !== "all") {
        queryObject.technology_id = rate.technology_id;
      }
      if (rate.seniority !== "all") {
        queryObject.seniority = rate.seniority;
      }
      if (rate.language !== "all") {
        queryObject.language = rate.language;
      }

      this.$router.push({ name: "CalcRatesResult", query: queryObject });
    },
  },
};
</script>
