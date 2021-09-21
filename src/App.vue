<template>
  <div class="app">
    <div class="content">
      <h1>Calculadora de salarios</h1>
      <nav id="nav">
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link :to="{ name: 'Technologies' }">Tecnologías</router-link> |
        <router-link :to="{ name: 'RateList' }">Tarifas</router-link> |
        <router-link :to="{ name: 'CalcRatesParams' }">Calcular</router-link>
      </nav>
      <router-view />
    </div>
    <footer>
      <p>
        Laboratorio de Computacíon III - Trabajo integrador - Pietenchuk,
        Rodrigo
      </p>
    </footer>
  </div>
</template>

<script>
import CalculatorServices from "./services/CalculatorServices";

export default {
  mounted() {
    this.onMount();
  },
  methods: {
    async onMount() {
      try {
        this.$toast.show("Cargando...", { duration: false });
        const technologies = await CalculatorServices.getTechnologies();
        const rates = await CalculatorServices.getRates();
        this.$store.commit("setTechnologies", technologies.data);
        this.$store.commit("setRates", rates.data);
        this.$toast.clear();
        this.$toast.success("Datos cargados correctamente");
      } catch (error) {
        this.$toast.clear();
        this.$toast.error(error.message);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a:visited {
  color: #2c3e50;
}
</style>
