<template>
  <div>
    <div class="text-h6">Add Question</div>
    <q-form class="q-gutter-sm" v-on:submit="submitQuestion" v-on:reset="resetQuestionForm">
      <q-input v-model="questionStatment" label="Question statment" filled type="textarea" autogrow />
      <q-input v-model="correctAnswer" label="Correct Answer" filled type="textarea" autogrow />
      <q-input v-model="description" label="Description" filled type="textarea" autogrow />
      <select-concept :section-concepts="suggestedConceptsArray" v-model="concept"></select-concept>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
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
    };
  },
  props: {
    syllabusId: {
      type: String,
      required: true,
    },
    suggestedConceptsArray: {
      type: Array,
    },
  },

  methods: {
    async submitQuestion() {
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
      this.questionStatment = null;
    },
  },
});
</script>

<style scoped></style>
