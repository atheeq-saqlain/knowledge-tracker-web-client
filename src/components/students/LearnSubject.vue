<template>
  <div v-if="subjectLearning">
    <div class="text-h4">
      {{ subjectLearning.subject.name }} <span v-if="subjectLearning.mastery"> - {{ subjectLearning.mastery }} %</span>
    </div>

    <div class="q-mt-lg q-gutter-sm">
      <div class="text-h5">Concepts to learn</div>
      <q-card v-for="conceptData in subjectLearning.conceptTrackers" :key="conceptData.id">
        <q-card-section>
          <span class="text-h6"
            >{{ conceptData.concept.name }} - {{ (conceptData.conceptTracker.masteryLevel * 100) / 5 }}%</span
          >
          <div>
            <q-linear-progress :value="conceptData.conceptTracker.masteryLevel / 5" class="q-my-lg" />
          </div>
          <div class="row justify-end q-gutter-md">
            <q-btn @click="addTracker(conceptData.concept, 0)">Reset</q-btn>
            <q-btn color="primary" @click="addTracker(conceptData.concept, 5)">Done</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import ConceptTrackerApi from "src/services/api/ConceptTracker.api";
import { userStore } from "src/stores/user-store";
const store = userStore();

export default {
  name: "LearnSubject",

  data() {
    return {
      subjectLearning: null,
    };
  },

  computed: {
    user() {
      return store.user;
    },
  },

  async mounted() {
    let subjectId = this.$route.params.subjectId;
    this.subjectLearning = await this.getSubjectLearning(subjectId);
  },

  methods: {
    async getSubjectLearning(subjectId) {
      let subjectLearning = await ConceptTrackerApi.getSubjcetLearning({
        subjectId: subjectId,
        studentId: this.user.student,
      });
      return subjectLearning;
    },

    async addTracker(concept, score) {
      let tracker = await ConceptTrackerApi.addConceptTracker({
        concept: concept._id,
        student: this.user.student,
        masteryLevel: score,
      });
      this.subjectLearning = await this.getSubjectLearning(this.$route.params.subjectId);
      return tracker;
    },
  },
};
</script>

<style scoped></style>
