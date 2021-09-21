<template>
  <form class="mx-1" @submit.prevent="submit">
    <div class="form-row">
      <label class="form-label" for="technology">Tecnología</label>
      <select
        class="form-select"
        id="technology"
        v-model.number="newRate.technology_id"
        required
      >
        <option v-if="search" value="all" class="search-all">Todas</option>
        <option v-for="tech in technologies" :key="tech.id" :value="tech.id">
          {{ tech.name }}
        </option>
      </select>
    </div>
    <div class="form-row">
      <label class="form-label" for="seniority">Seniority</label>
      <select
        class="form-select"
        id="seniority"
        v-model="newRate.seniority"
        required
      >
        <option v-if="search" value="all" class="search-all">Todas</option>
        <option value="junior">Junior</option>
        <option value="semi_senior">Semi senior</option>
        <option value="senior">Senior</option>
      </select>
    </div>
    <div class="form-row">
      <label class="form-label" for="language">Idioma</label>
      <select
        class="form-select"
        id="language"
        v-model="newRate.language"
        required
      >
        <option v-if="search" value="all" class="search-all">Todos</option>
        <option value="spanish">Español</option>
        <option value="english">Inglés</option>
      </select>
    </div>
    <div class="form-row" v-if="!search">
      <label class="form-label" for="salary">Salario promedio (centavos)</label>
      <input
        class="form-control"
        type="number"
        id="salary"
        min="0"
        v-model="newRate.average_salary_in_cents"
        required
      />
    </div>
    <div class="form-row" v-if="!search">
      <label class="form-label" for="gross-margin">
        Margen bruto (centavos)
      </label>
      <input
        class="form-control"
        type="number"
        id="gross-margin"
        min="0"
        v-model="newRate.gross_margin_in_cents"
        required
      />
    </div>
    <div class="form-row">
      <label class="form-label" for="currency">Moneda</label>
      <select
        class="form-select"
        id="currency"
        v-model="newRate.currency"
        required
      >
        <option value="ars">Peso argentino (ARS)</option>
        <option value="usd">Dólar estadounidense (USD)</option>
      </select>
    </div>
    <div class="btn-group mt-3">
      <button class="btn btn-primary" type="submit">Aceptar</button>
      <button
        class="btn btn-secondary"
        id="cancel"
        type="button"
        @click="cancel"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "RateForm",
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
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
    if (this.edit) {
      const rate = this.rates.find((item) => item.id == this.id);
      if (rate !== undefined) {
        this.newRate = rate;
      } else {
        this.$router.push({ name: "NotFound" });
      }
    }
  },
  methods: {
    submit() {
      this.$emit("submitted", this.newRate);
    },

    cancel() {
      this.$router.go(-1);
    },
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
    technologies() {
      return this.$store.state.technologies.filter((tech) => tech.id !== null);
    },
    rates() {
      return this.$store.state.rates.filter((rate) => rate.id !== null);
    },
  },
};
</script>
