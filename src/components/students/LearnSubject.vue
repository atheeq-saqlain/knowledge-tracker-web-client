<template>
  <div v-if="subjectLearning">
    <div class="text-h4">
      {{ subjectLearning.subject.name }} <span v-if="subjectLearning.mastery"> - {{ subjectLearning.mastery }} %</span>
    </div>

    <div class="q-mt-lg q-gutter-sm">
      <div class="text-h5">Concepts</div>

      <concept-trackers
        v-if="subjectLearning"
        @conceptTrackerAdded="onTrackerAdd"
        :concept-trackers="subjectLearning.conceptTrackers"
      ></concept-trackers>
    </div>

    <div class="q-mt-lg q-gutter-sm">
      <div class="text-h5">Questions</div>
      <q-card v-for="question in subjectLearning.questions" :key="question.id">
        <q-card-section>
          <span class="text-body1">{{ question.statement }}</span>

          <div class="row justify-end q-gutter-md">
            <q-btn color="primary" @click="goToEvaluateQuestion(question)">Evaluate</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import ConceptTrackerApi from "src/services/api/ConceptTracker.api";
import ConceptTrackers from "../conceptTrackers/ConceptTrackers.vue";
import { userStore } from "src/stores/user-store";
const store = userStore();

export default {
  name: "LearnSubject",

  components: { ConceptTrackers },

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

    async onTrackerAdd(data) {
      this.subjectLearning = await this.getSubjectLearning(this.$route.params.subjectId);
    },

    goToEvaluateQuestion(question) {
      this.$router.push({
        name: "evaluate-question",
        params: {
          questionId: question._id,
        },
      });
    },
  },
};
</script>

<style scoped></style>
