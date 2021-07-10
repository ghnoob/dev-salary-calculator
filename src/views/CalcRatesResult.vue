<template>
  <div class="result">
    <h4>Información</h4>
    <div>
      <table id="params">
        <tr>
          <th>Tecnología</th>
          <td>{{ technologyName }}</td>
        </tr>
        <tr>
          <th>Senority</th>
          <td>{{ seniority }}</td>
        </tr>
        <tr>
          <th>Idioma</th>
          <td>{{ language }}</td>
        </tr>
        <tr>
          <th>Moneda</th>
          <td>{{ currency }}</td>
        </tr>
      </table>
      <div v-if="queryHasResults" id="query-results">
        <h4>Costos</h4>
        <table>
          <tr>
            <th>Salario promedio</th>
            <td>${{ averageSalary.toFixed(2) }}</td>
          </tr>
          <tr>
            <th>Márgen bruto promedio</th>
            <td>${{ averageGrossMargin.toFixed(2) }}</td>
          </tr>
          <tr>
            <th>Costo total promedio</th>
            <td>${{ totalCost.toFixed(2) }}</td>
          </tr>
        </table>
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
import CalculatorServices from "@/services/CalculatorServices.js";

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
      const response = await CalculatorServices.searchRates(this.query);
      this.queryResult = response.data;
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
      if (id === undefined) return "Todas";
      const tech = this.technologies.find((tech) => tech.id === id);
      if (tech !== undefined) return tech.name;
      return "";
    },
    seniority() {
      const seniority = this.query.seniority;
      if (seniority === undefined) return "Todas";
      return (
        seniority.charAt(0).toUpperCase() + seniority.replace("_", " ").slice(1)
      );
    },
    language() {
      const language = this.query.language;
      if (language === undefined) return "Todos";
      if (language === "spanish") return "Español";
      return "Inglés";
    },
    currency() {
      return this.query.currency.toUpperCase();
    },
    averageSalary() {
      let sum = 0;
      for (let rate of this.queryResult)
        if (!isNaN(rate.average_salary_in_cents))
          sum += rate.average_salary_in_cents;

      return sum / 100 / this.queryResult.length;
    },
    averageGrossMargin() {
      let sum = 0;
      for (let rate of this.queryResult)
        if (!isNaN(rate.gross_margin_in_cents))
          sum += rate.gross_margin_in_cents;

      return sum / 100 / this.queryResult.length;
    },
    totalCost() {
      return this.averageSalary + this.averageGrossMargin;
    },
    queryHasResults() {
      return this.queryResult.length > 0;
    },
  },

  watch: {
    queryResult() {
      for (let i in this.queryResult) {
        const salary = parseInt(this.queryResult[i].average_salary_in_cents);
        this.queryResult[i].average_salary_in_cents = salary;
        const grossMargin = parseInt(this.queryResult[i].gross_margin_in_cents);
        this.queryResult[i].gross_margin_in_cents = grossMargin;
      }
    },
  },
};
</script>

<style>
table {
  margin: auto;
  width: 40%;
}
th {
  text-align: left;
}
td {
  text-align: right;
}
</style>
