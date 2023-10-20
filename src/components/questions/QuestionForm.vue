<template>
  <div>
    <div class="text-h6">Add Question</div>
    <q-form class="q-gutter-sm" v-on:submit="submitQuestion" v-on:reset="resetQuestionForm">
      <q-input v-model="questionStatment" label="Question statment" filled type="textarea" autogrow />
      <q-input v-model="correctAnswer" label="Correct Answer" filled type="textarea" autogrow />
      <q-input v-model="description" label="Description" filled type="textarea" autogrow />
      <select-concept :section-concepts="suggestedConcepts.concepts" required v-model="concept"></select-concept>
      <div>
        <q-btn label="Update" v-if="questionId" type="submit" color="primary" />
        <q-btn label="Submit" v-else type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <div class="q-pa-md"></div>
  </div>
</template>

<script>
import QuestionsApi from "src/services/api/Questions.api";
import { defineComponent, ref } from "vue";
import SelectConcept from "../concepts/SelectConcept.vue";

export default defineComponent({
  // setup() {
  //   return { text: ref() };
  // },
  components: { SelectConcept },
  name: "QuestionForm",
  data() {
    return {
      questionStatment: "",
      correctAnswer: "",
      description: "",
      concept: null,
      originalQuestion: null,
    };
  },
  props: {
    syllabusId: {
      type: String,
      required: true,
    },
    suggestedConcepts: {
      type: Object,
    },
    questionId: {
      type: String,
    },
  },

  async mounted() {
    if (this.questionId) {
      let res = await QuestionsApi.getQuestionById(this.questionId);
      this.originalQuestion = res;
      this.resetQuestionForm();
    }
  },

  methods: {
    async submitQuestion() {
      if (this.questionId) {
        this.updateQuestion();
        return;
      }
      let newQuestion = {
        statement: this.questionStatment,
        correctAnswer: this.correctAnswer,
        description: this.description,
        syllabus: this.syllabusId,
        coreConcept: this.concept._id,
      };
      let addedQuestion = await QuestionsApi.addQuesiton(newQuestion);
      this.$emit("questionAdded", addedQuestion);
    },

    resetQuestionForm() {
      if (this.questionId) {
        this.questionStatment = this.originalQuestion.statement;
        this.correctAnswer = this.originalQuestion.correctAnswer;
        this.description = this.originalQuestion.description;
        this.concept = this.originalQuestion.concept;
      } else {
        this.questionStatment = "";
        this.correctAnswer = "";
        this.description = "";
        this.concept = null;
      }
    },

    async updateQuestion() {
      let updatedQuestion = {
        statement: this.questionStatment,
        correctAnswer: this.correctAnswer,
        description: this.description,
        syllabus: this.syllabusId,
        coreConcept: this.concept._id,
      };
      let savedQuestion = await QuestionsApi.updateQuestion(updatedQuestion, this.originalQuestion._id);
      this.$emit("questionUpdated", savedQuestion);
    },
  },
});
</script>

<style scoped></style>
