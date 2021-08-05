<template>
  <h3>Editar Tarifa</h3>
  <rate-form :id="id" :edit="true" @submitted="editRate" />
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
        await CalculatorServices.putRate(rate);
        await this.$store.commit("editRate", rate);
        this.$toast.clear();
        this.$toast.success("Editada correctamente");
        this.$router.push({ name: "RateList" });
      } catch (error) {
        this.$toast.clear();
        this.$toast.error(error.toString());
      }
    },
  },

  computed: {
    id() {
      return this.$route.query.id;
    },
  },
};
</script>
