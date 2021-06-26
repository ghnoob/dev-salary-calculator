<template>
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
      <tr v-for="rate in rates" :key="rate.id">
        <td>
          {{ getTechnologyName(rate.technology_id) }}
        </td>
        <td>{{ getSeniority(rate.seniority) }}</td>
        <td>{{ getLanguage(rate.language) }}</td>
        <td>${{ rate.average_salary_in_cents / 100 }}</td>
        <td>${{ rate.gross_margin_in_cents / 100 }}</td>
        <td>{{ rate.currency }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  data() {
    return {
      technologies: [],
      rates: [],
    };
  },

  mounted() {
    CalculatorServices.getTechnologies()
      .then((response) => (this.technologies = response.data))
      .catch((error) => console.error(error));
    CalculatorServices.getRates()
      .then((response) => (this.rates = response.data))
      .catch((error) => console.error(error));
  },

  methods: {
    getTechnologyName(id) {
      const tech = this.technologies.find((tech) => tech.id === id);
      return tech.name;
    },

    getSeniority(seniority) {
      switch (seniority) {
        case "junior":
          return "Junior";
        case "semi_senior":
          return "Semi senior";
        case "senior":
          return "Senior";
        default:
          return "";
      }
    },

    getLanguage(language) {
      if (language === "spanish") return "Español";
      if (language === "english") return "Inglés";
      return "";
    },
  },
};
</script>

<style>
table.green-table {
  border: 2px solid #24943a;
  background-color: #d4eed1;
  width: 75%;
  text-align: center;
  margin: auto;
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
</style>
