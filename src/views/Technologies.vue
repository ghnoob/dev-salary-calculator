<template>
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
// @ is an alias to /src
import store from "@/services/store.js";

export default {
  name: "Technologies",
  data() {
    return {
      technologies: store.technologies,
    };
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
