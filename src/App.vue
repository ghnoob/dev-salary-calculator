<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="d-flex flex-column flex-grow-1">
      <header class="position-sticky top-0">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Calculadora de salarios</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <router-link
                    class="nav-link active"
                    aria-current="page"
                    :to="{ name: 'Home' }"
                  >
                    Home
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'Technologies' }">
                    Tecnologías
                  </router-link>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tarifas
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'RateList' }"
                      >
                        Ver
                      </router-link>
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'NewRate' }"
                      >
                        Crear
                      </router-link>
                    </li>
                    <li>
                      <router-link
                        class="dropdown-item"
                        :to="{ name: 'CalcRatesParams' }"
                      >
                        Calcular
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <router-view />
      </main>
    </div>
    <footer class="footer text-center">
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
a.router-link-exact-active {
  color: #000000 !important;
}

.footer {
  font-size: xx-small;
}

@media screen and (min-width: 480px) {
  .footer {
    font-size: small;
  }
}

@media screen and (min-width: 768px) {
  .footer {
    font-size: medium;
  }
}
</style>
