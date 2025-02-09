<template>
  <!-- will hava multiple student list components -->
  <div>
    <StudentsList v-if="students.length > 0" :students="students"></StudentsList>
  </div>
</template>

<script>
import StudentsApi from "src/services/api/Students.api";
import StudentsList from "./StudentsList.vue";

export default {
  name: "StudentsManager",
  components: {
    // StudentCard,
    StudentsList,
  },
  data() {
    return {
      students: [],
    };
  },
  async mounted() {
    const students = await StudentsApi.getStudents();
    this.students = students;
  },
};
</script>

<style scoped></style>
