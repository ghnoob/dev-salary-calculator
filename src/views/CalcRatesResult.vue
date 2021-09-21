<template>
  <div class="result">
    <h4 class="text-center">Información</h4>
    <div>
      <div class="table-responsive">
        <table class="table mx-auto" id="params">
          <tr>
            <th scope="row">Tecnología</th>
            <td class="text-end">{{ technologyName }}</td>
          </tr>
          <tr>
            <th scope="row">Senority</th>
            <td class="text-end">{{ seniority }}</td>
          </tr>
          <tr>
            <th scope="row">Idioma</th>
            <td class="text-end">{{ language }}</td>
          </tr>
          <tr>
            <th scope="row">Moneda</th>
            <td class="text-end">{{ currency }}</td>
          </tr>
        </table>
      </div>
      <div v-if="queryHasResults" id="query-results">
        <h4 class="text-center">Costos</h4>
        <div class="table-responsive">
          <table class="table mx-auto">
            <tr>
              <th scope="row">Salario promedio</th>
              <td class="text-end">${{ averageSalary.toFixed(2) }}</td>
            </tr>
            <tr>
              <th scope="row">Márgen bruto promedio</th>
              <td class="text-end">${{ averageGrossMargin.toFixed(2) }}</td>
            </tr>
            <tr>
              <th scope="row">Costo total promedio</th>
              <td class="text-end">${{ totalCost.toFixed(2) }}</td>
            </tr>
          </table>
        </div>
      </div>
      <p v-else id="no-query-results">
        <strong>
          No se encontraron tarifas con los criterios establecidos
        </strong>
      </p>
    </div>
  </div>
</template>

<script>
import CalculatorServices from "../services/CalculatorServices.js";

export default {
  data() {
    return {
      queryResult: [],
    };
  },

  mounted() {
    this.searchRates();
  },

  methods: {
    async searchRates() {
      try {
        this.$toast.show("Buscando...", { duration: false });
        const response = await CalculatorServices.searchRates(this.query);
        this.queryResult = response.data;
        this.$toast.clear();
        this.$toast.success("Búsqueda completada");
      } catch (error) {
        this.$toast.clear();
        this.$toast.error(error.message);
      }
    },
  },

  computed: {
    query() {
      return this.$route.query;
    },
    technologies() {
      return this.$store.state.technologies.filter((tech) => tech.id !== null);
    },
    technologyName() {
      const id = this.query.technology_id;
      if (id === undefined) {
        return "Todas";
      }
      const tech = this.technologies.find((tech) => tech.id === id);
      if (tech !== undefined) {
        return tech.name;
      }
      return "";
    },
    seniority() {
      const seniority = this.query.seniority;
      if (seniority === undefined) {
        return "Todas";
      }
      return (
        seniority.charAt(0).toUpperCase() + seniority.replace("_", " ").slice(1)
      );
    },
    language() {
      const language = this.query.language;
      if (language === undefined) {
        return "Todos";
      }
      if (language === "spanish") {
        return "Español";
      }
      return "Inglés";
    },
    currency() {
      return this.query.currency.toUpperCase();
    },
    averageSalary() {
      const reducer = (a, b) => {
        const salary = Number(b.average_salary_in_cents);
        if (!Number.isNaN(salary)) {
          return a + salary;
        }
        return a;
      };
      const sum = this.queryResult.reduce(reducer, 0);

      return sum / 100 / this.queryResult.length;
    },
    averageGrossMargin() {
      const reducer = (a, b) => {
        const grossMargin = Number(b.gross_margin_in_cents);
        if (!Number.isNaN(grossMargin)) {
          return a + grossMargin;
        }
        return a;
      };
      const sum = this.queryResult.reduce(reducer, 0);

      return sum / 100 / this.queryResult.length;
    },
    totalCost() {
      return this.averageSalary + this.averageGrossMargin;
    },
    queryHasResults() {
      return this.queryResult.length > 0;
    },
  },
};
</script>

<style scoped>
.table {
  max-width: 480px;
}
</style>
