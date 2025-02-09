<template>
  <div>
    students list
    <div class="q-pa-md row items-start q-gutter-md" v-for="student in students" :key="student._id">
      <student-card :student="student"></student-card>
    </div>
  </div>
</template>

<script>
import StudentCard from "./StudentCard.vue";

export default {
  name: "StudentsList",
  props: ["students"],
  components: {
    StudentCard,
  },
  mounted() {},
};
</script>

<style scoped></style>
