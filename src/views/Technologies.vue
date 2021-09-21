<template>
  <h2>Tecnologías</h2>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="technology in technologies"
      :key="technology.id"
    >
      {{ technology.name }}
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    technologies() {
      return this.$store.state.technologies.filter((tech) => tech.id !== null);
    },
  },
};
</script>
