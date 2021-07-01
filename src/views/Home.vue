<template>
  <h2>Página principal</h2>
  <p>¿Qué desea hacer?</p>
  <nav>
    <router-link class="link" :to="{ name: 'Technologies' }">
      Consultar las tecnologías disponibles
    </router-link>
    <router-link class="link" :to="{ name: 'RateList' }">
      Consultar, modificar y eliminar las tarifas
    </router-link>
    <router-link class="link" :to="{ name: 'NewRate' }">
      Agregar una nueva tarifa
    </router-link>
    <router-link class="link" :to="{ name: 'CalcRatesParams' }">
      Calcular tarifas
    </router-link>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

nav .link {
  margin: 0.3em;
}

.home {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.home .content {
  flex: 1;
}
</style>
