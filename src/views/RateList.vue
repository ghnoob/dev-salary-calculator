<template>
  <div v-if="render">
    <div class="table-responsive mb-2">
      <table class="table">
        <thead>
          <tr>
            <th>Tecnología</th>
            <th>Senority</th>
            <th>Idioma</th>
            <th>Sueldo promedio</th>
            <th>Margen bruto</th>
            <th>Moneda</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rate in rates"
            :key="rate.id"
            @click="rowClick(rate.id)"
            :class="{ 'table-active': selectedRateId === rate.id }"
          >
            <td>
              {{ getTechnologyName(rate.technology_id) }}
            </td>
            <td>{{ getSeniority(rate.seniority) }}</td>
            <td>{{ getLanguage(rate.language) }}</td>
            <td>${{ toCurrencyUnits(rate.average_salary_in_cents) }}</td>
            <td>${{ toCurrencyUnits(rate.gross_margin_in_cents) }}</td>
            <td>{{ rate.currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn-group">
      <router-link :to="{ name: 'NewRate' }">
        <button id="new" class="btn btn-primary" type="button">Nuevo</button>
      </router-link>
      <router-link :to="{ name: 'EditRate', params: { id: selectedRateId } }">
        <button
          class="btn btn-warning"
          type="button"
          :disabled="selectedRateId === null"
        >
          Editar
        </button>
      </router-link>
      <button
        id="delete"
        class="btn btn-danger"
        type="button"
        :disabled="selectedRateId === null"
        @click="deleteRate"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script>
import CalculatorServices from "../services/CalculatorServices.js";

export default {
  data() {
    return {
      selectedRateId: null,
    };
  },

  methods: {
    getTechnologyName(id) {
      const tech = this.technologies.find((tech) => tech.id === id);
      if (tech !== undefined) {
        return tech.name;
      }
      return "";
    },

    getSeniority(seniority) {
      const capitalize = ([first, ...rest], lowerRest = false) =>
        first.toUpperCase() +
        (lowerRest ? rest.join("").toLowerCase() : rest.join(""));
      return capitalize(seniority.replace("_", " "));
    },

    getLanguage(language) {
      if (language === "spanish") {
        return "Español";
      }
      if (language === "english") {
        return "Inglés";
      }
      return "";
    },

    toCurrencyUnits(amountInCents) {
      return amountInCents / 100;
    },

    rowClick(id) {
      if (this.selectedRateId !== id) {
        this.selectedRateId = id;
      } else {
        this.selectedRateId = null;
      }
    },

    async deleteRate() {
      if (confirm("¿Desea borrar el registro seleccionado?")) {
        try {
          this.$toast.show("Eliminando...", { duration: false });
          await CalculatorServices.deleteRate(this.selectedRateId);
          this.$store.commit("deleteRate", this.selectedRateId);
          this.$toast.clear();
          this.$toast.success("Eliminada correctamente");
        } catch (error) {
          this.$toast.clear();
          this.$toast.error(error.message);
        }
      }
    },
  },

  computed: {
    technologies() {
      return this.$store.state.technologies.filter((tech) => tech.id !== null);
    },
    rates() {
      return this.$store.state.rates.filter((rate) => rate.id !== null);
    },

    render() {
      return this.technologies.length > 0 && this.rates.length > 0;
    },
  },
};
</script>
