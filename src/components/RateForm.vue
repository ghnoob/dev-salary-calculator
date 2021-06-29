<template>
  <form v-if="technologies" @submit.prevent="submit">
    <ul class="wrapper">
      <li class="form-row">
        <label for="technology">Tecnología</label>
        <select v-model.number="newRate.technology_id" required>
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
          <option value="junior">Junior</option>
          <option value="semi_senior">Semi senior</option>
          <option value="senior">Senior</option>
        </select>
      </li>
      <li class="form-row">
        <label for="language">Idioma</label>
        <select id="language" v-model="newRate.language" required>
          <option value="spanish">Español</option>
          <option value="english">Inglés</option>
        </select>
      </li>
      <li class="form-row">
        <label for="salary">Salario promedio (centavos)</label>
        <input
          type="number"
          id="salary"
          min="0"
          v-model.number="newRate.average_salary_in_cents"
          required
        />
      </li>
      <li class="form-row">
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
        <router-link :to="{ name: 'RateList' }">
          <button type="button">Cancelar</button>
        </router-link>
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: "RateForm",
  data() {
    return {
      newRate: {
        technology_id: null,
        seniority: "",
        language: "",
        average_salary_in_cents: null,
        gross_margin_in_cents: null,
        currency: "",
      },
    };
  },

  methods: {
    submit() {
      this.$emit("submit", this.newRate);
      this.$router.push({ name: "RateList" });
    },
  },

  computed: {
    technologies() {
      return this.$store.state.technologies;
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
