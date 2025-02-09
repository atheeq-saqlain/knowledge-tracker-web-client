<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ student.name }}</div>
      <div>{{ student.email }}</div>
      <div>{{ student.dateOfBirth }}</div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="primary">View</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "StudentCard",
  props: ["student"],
  mounted() {},
};
</script>

<style scoped></style>
