<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-tree accordion :nodes="subjects" node-key="name" label-key="name" @lazy-load="onLazyLoad">
      <template v-slot:header-new="prop">
        <button @click="initiateSubjectCreation(prop.node)">Create Subject</button>
      </template>
    </q-tree>
  </div>
</template>

<script>
import SubjectsApi from "src/services/api/Subjects.api";

export default {
  name: "ListSubjects",

  data() {
    return {
      subjects: [],
    };
  },

  async mounted() {
    let subjects = await this.getRootSubjects();
    subjects.forEach((sub) => {
      sub.lazy = true;
    });
    this.subjects = subjects;
  },

  methods: {
    async onLazyLoad({ node: subject, done }) {
      let childrenSubjects = await this.getChildrenSubjects(subject._id);
      childrenSubjects.forEach((subject) => {
        subject.lazy = true;
      });
      childrenSubjects.push({ header: "new", lazy: false, parentId: subject._id });

      done(childrenSubjects);
    },

    initiateSubjectCreation(subject) {
      console.log("initiate subject creation for : ", subject);
    },

    async getRootSubjects() {
      return await SubjectsApi.getRootSubjects();
    },

    async getChildrenSubjects(parentId) {
      return await SubjectsApi.getChildrenSubjects(parentId);
    },
  },
};
</script>

<style scoped></style>
