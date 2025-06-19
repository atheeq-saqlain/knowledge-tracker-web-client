<template>
  <div>
    <div v-if="questionLearning">
      <div class="text-h4">Question</div>
      <q-card v-if="questionLearning && questionLearning.question" class="q-mt-md">
        <q-card-section>
          <question-render :question="questionLearning.question"></question-render>
        </q-card-section>
      </q-card>

      <h4>Core Concept</h4>
      <concept-trackers
        @conceptTrackerAdded="onTrackerAdd"
        :question="questionLearning.question"
        :concept-trackers="questionLearning.coreConceptTrackers"
      ></concept-trackers>

      <h4>Refered Concepts</h4>
      <concept-trackers
        @conceptTrackerAdded="onTrackerAdd"
        :concept-trackers="questionLearning.referedConceptTrackers"
      ></concept-trackers>
    </div>
  </div>
</template>

<script>
import QuestionRender from "../questions/QuestionRender.vue";
import ConceptTrackers from "../conceptTrackers/ConceptTrackers.vue";
import ConceptTrackerApi from "src/services/api/ConceptTracker.api";

import { userStore } from "src/stores/user-store";
const store = userStore();

export default {
  name: "EvaluateQuestion",

  computed: {
    user() {
      return store.user;
    },
  },

  components: {
    QuestionRender,
    ConceptTrackers,
  },

  data() {
    return {
      questionId: null,
      question: null,
      questionLearning: null,
      questionConceptTrackers: null,
    };
  },

  async mounted() {
    this.questionId = this.$route.params.questionId;
    this.questionLearning = await this.getQuestionLearning(this.questionId);
  },

  methods: {
    async getQuestionLearning(questionId) {
      let res = await ConceptTrackerApi.getQuestionLearning({
        questionId: questionId,
        studentId: this.user.student,
      });
      return res;
    },

    async onTrackerAdd(tracker) {
      this.question = await this.getQuestionLearning(this.questionId);
    },
  },
};
</script>

<style scoped></style>
