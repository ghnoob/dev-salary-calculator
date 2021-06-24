<template>
  <h1>Calculadora de salarios</h1>
  <p>¿Qué desea hacer?</p>
  <router-link :to="{ name: 'Technologies' }">
    Consultar las tecnologías disponibles
  </router-link>

  <footer>
    <p>
      Laboratorio de Computacíon III - Trabajo integrador - Pietenchuk, Rodrigo
    </p>
  </footer>
</template>

<style>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
