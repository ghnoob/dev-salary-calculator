<template>
  <form v-if="technologies" @submit.prevent="submit">
    <ul class="wrapper">
      <li class="form-row">
        <label for="technology">Tecnología</label>
        <select v-model.number="newRate.technology_id" required>
          <option v-if="search" value="all">Todas</option>
          <option
            id="technology"
            v-for="tech in technologies"
            :key="tech.id"
            :value="tech.id"
          >
            {{ tech.name }}
          </option>
        </select>
      </li>
      <li class="form-row">
        <label for="seniority">Seniority</label>
        <select id="seniority" v-model="newRate.seniority" required>
          <option v-if="search" value="all">Todas</option>
          <option value="junior">Junior</option>
          <option value="semi_senior">Semi senior</option>
          <option value="senior">Senior</option>
        </select>
      </li>
      <li class="form-row">
        <label for="language">Idioma</label>
        <select id="language" v-model="newRate.language" required>
          <option v-if="search" value="all">Todos</option>
          <option value="spanish">Español</option>
          <option value="english">Inglés</option>
        </select>
      </li>
      <li class="form-row" v-if="!search">
        <label for="salary">Salario promedio (centavos)</label>
        <input
          type="number"
          id="salary"
          min="0"
          v-model.number="newRate.average_salary_in_cents"
          required
        />
      </li>
      <li class="form-row" v-if="!search">
        <label for="gross-margin">Margen bruto (centavos)</label>
        <input
          type="number"
          id="gross-margin"
          min="0"
          v-model.number="newRate.gross_margin_in_cents"
          required
        />
      </li>
      <li class="form-row">
        <label for="currency">Moneda</label>
        <select id="currency" v-model="newRate.currency" required>
          <option value="ars">Peso argentino (ARS)</option>
          <option value="usd">Dólar estadounidense (USD)</option>
        </select>
      </li>
      <li class="form-row">
        <button type="submit">Aceptar</button>
        <button type="button" @click="cancel">Cancelar</button>
      </li>
    </ul>
  </form>
</template>

<script>
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  name: "RateForm",
  props: {
    id: {
      type: Number,
      required: false,
      default: null,
    },
    search: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      newRate: {
        id: null,
        technology_id: null,
        seniority: "",
        language: "",
        average_salary_in_cents: null,
        gross_margin_in_cents: null,
        currency: "",
      },
    };
  },

  mounted() {
    if (this.id !== null) {
      CalculatorServices.getRateById(this.id)
        .then((response) => (this.newRate = response.data[0]))
        .catch((error) => console.error(error));
    }
  },

  methods: {
    submit() {
      if (this.id === null) this.newRate.id = this.highestId;
      this.$emit("submitted", this.newRate);
    },

    cancel() {
      this.$router.go(-1);
    },
  },

  computed: {
    technologies() {
      return this.$store.state.technologies.filter((tech) => tech.id !== null);
    },
    rates() {
      return this.$store.state.rates.filter((rate) => rate.id !== null);
    },
    highestId() {
      return Math.max(...this.rates.map((rate) => rate.id)) + 1;
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: whitesmoke;
  list-style-type: none;
  padding: 0;
  border-radius: 3px;
}
.form-row {
  display: flex;
  justify-content: flex-end;
  padding: 0.5em;
}

.form-row > button {
  margin: 2px;
}

.form-row > label {
  padding: 0.5em 1em 0.5em 0;
  text-align: right;
  flex: 1;
}
.form-row > input,
.form-row > select {
  flex: 2;
}
.form-row > input,
.form-row > select,
.form-row > button {
  padding: 0.5em;
}

@media screen and (min-width: 768px) {
  .form-row > input,
  .form-row > select {
    flex: 3;
  }
}
@media screen and (min-width: 992px) {
  .form-row > input,
  .form-row > select {
    flex: 4;
  }
}
@media screen and (min-width: 1200px) {
  .form-row > input,
  .form-row > select {
    flex: 5;
  }
}
</style>
