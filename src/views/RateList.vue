<template>
  <div v-if="render">
    <table class="green-table">
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
          :class="{ selected: selectedRateId === rate.id }"
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
    <div class="buttons-container">
      <router-link :to="{ name: 'NewRate' }">
        <button id="new" type="button">Nuevo</button>
      </router-link>
      <router-link :to="{ name: 'EditRate', query: { id: selectedRateId } }">
        <button type="button" :disabled="selectedRateId === null">
          Editar
        </button>
      </router-link>
      <button
        id="delete"
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
          this.$toast.error(error.toString());
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

<style scoped>
table.green-table {
  border: 2px solid #24943a;
  background-color: #d4eed1;
  width: 75%;
  text-align: center;
  margin: auto;
  cursor: default;
}

table.green-table td,
table.green-table th {
  border: 1px solid #24943a;
  padding: 3px 2px;
}

table.green-table tbody td {
  font-size: 13px;
}

table.green-table thead {
  background: #24943a;
  background: -moz-linear-gradient(top, #5baf6b 0%, #3a9e4d 66%, #24943a 100%);
  background: -webkit-linear-gradient(
    top,
    #5baf6b 0%,
    #3a9e4d 66%,
    #24943a 100%
  );
  background: linear-gradient(to bottom, #5baf6b 0%, #3a9e4d 66%, #24943a 100%);
  border-bottom: 0px solid #444444;
}

table.green-table thead th {
  font-size: 19px;
  font-weight: bold;
  color: #f0f0f0;
  text-align: left;
  border-left: 2px solid #24943a;
}

table.green-table thead th:first-child {
  border-left: none;
}

table.green-table tfoot td {
  font-size: 13px;
}

table.green-table tfoot .links {
  text-align: right;
}

table.green-table tfoot .links a {
  display: inline-block;
  background: #ffffff;
  color: #24943a;
  padding: 2px 8px;
  border-radius: 5px;
}

.buttons-container {
  width: max-content;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: auto;
  margin-top: 20px;
}

.selected {
  background-color: #42b983;
}
</style>
