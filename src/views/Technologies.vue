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
import CalculatorServices from "@/services/CalculatorServices.js";

export default {
  name: "Technologies",
  data() {
    return {
      technologies: [],
    };
  },

  mounted() {
    CalculatorServices.getTechnologies()
      .then((response) => (this.technologies = response.data))
      .catch((error) => console.error(error));
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
