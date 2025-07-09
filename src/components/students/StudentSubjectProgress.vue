<template>
  <div>
    <q-tree accordion :nodes="subjects" node-key="name" label-key="name">
      <template v-slot:default-header="prop">
        <div class="col-12">
          <div>
            <span> {{ prop.node.name }} - {{ prop.node.mastery }}% </span>
            <button v-if="prop.node.concepts.length" @click.stop="learnSubject(prop.node)">Learn</button>
          </div>
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

  methods: {
    learnSubject(subject) {
      // this.$emit("learnSubject", subject);
      console.log("subject : ", subject);
      this.$router.push({
        name: "learning-subject",
        params: {
          // studentId: this.studentId,
          subjectId: subject._id,
        },
      });
    },
  },
};
</script>

<style scoped></style>
