<template>
  <h2>Tecnologías</h2>
  <div class="technologies">
    <span
      class="tech-card"
      v-for="technology in technologies"
      :key="technology.id"
    >
      {{ technology.name }}
    </span>
  </div>
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

<style scoped>
.technologies {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tech-card {
  padding: 20px;
  width: 250px;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
</style>
