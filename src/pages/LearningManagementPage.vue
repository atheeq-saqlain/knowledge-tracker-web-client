<template>
  <q-page padding>
    <div class="text-h4">Learning Management</div>
    <select-subject v-on:subject-selected="onSubjectSelected"></select-subject>
    <!-- <router-view></router-view> -->

    <!-- list of subjects -->
    <q-card class="q-mt-md" v-for="subject in studentProgress" :key="subject._id">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{ subject.name }} - {{ subject.mastery }}%</div>
          <button class="text-primary" v-on:click="removeSubject(subject)">Del</button>
        </div>
        <q-linear-progress :value="subject.mastery / 100" class="q-mt-md" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import SelectSubject from "src/components/subjects/SelectSubject.vue";
import StudentsApi from "src/services/api/Students.api";
import { userStore } from "src/stores/user-store";
const store = userStore();

export default {
  name: "LearningManagementPage",

  components: {
    SelectSubject,
  },

  data() {
    return {
      subjects: [],
      studentProfile: null,
      studentProgress: null,
    };
  },

  computed: {
    user() {
      return store.user;
    },
  },

  async mounted() {
    await this.initialize();
  },

  methods: {
    async initialize() {
      let res = await this.getStudentProfileByUser(this.user._id);
      this.studentProfile = res.studentDetails;
      this.studentProgress = res.studentProgress;

      this.subjects = this.studentProfile.subjects;
    },

    getStudentProfileByUser(userId) {
      return StudentsApi.getStudentByUser(userId);
    },

    async onSubjectSelected(subject) {
      // add subject to student profile and update student profile
      this.studentProfile.subjects.push(subject._id);
      await StudentsApi.updateStudent(this.studentProfile._id, this.studentProfile);
      await this.initialize();
    },

    async removeSubject(subject) {
      this.studentProfile.subjects.splice(this.studentProfile.subjects.indexOf(subject._id), 1);
      await StudentsApi.updateStudent(this.studentProfile._id, this.studentProfile);
      await this.initialize();
    },
  },
};
</script>

<style scoped></style>
