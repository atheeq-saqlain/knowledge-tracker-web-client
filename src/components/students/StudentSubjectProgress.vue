<template>
  <div>
    <q-tree accordion :nodes="subjects" node-key="name" label-key="name">
      <template v-slot:default-header="prop">
        <div class="col-12">
          <div>{{ prop.node.name }} - {{ prop.node.mastery }}%</div>
          <q-linear-progress :value="prop.node.mastery / 100" class="q-mt-md" />
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
export default {
  name: "StudentSubjectProgress",

  data() {
    return {
      subjects: [],
    };
  },

  props: ["studentId", "subjectId", "progressTree"],

  mounted() {
    if (this.progressTree) {
      this.subjects = this.progressTree;
    }
  },
};
</script>

<style scoped></style>
