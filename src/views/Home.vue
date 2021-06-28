<template>
  <h2>Página principal</h2>
  <p>¿Qué desea hacer?</p>
  <nav>
    <router-link class="link" :to="{ name: 'Technologies' }">
      Consultar las tecnologías disponibles
    </router-link>
    <router-link class="link" :to="{ name: 'RateList' }">
      Consultar las tarifas
    </router-link>
  </nav>

  <footer>
    <p>
      Laboratorio de Computacíon III - Trabajo integrador - Pietenchuk, Rodrigo
    </p>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}

nav {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

nav .link {
  margin: 0.3em;
}
</style>
