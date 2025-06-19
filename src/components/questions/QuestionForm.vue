<template>
  <div>
    <div class="text-h6">Add Question</div>
    <div class="row">
      <q-form class="q-gutter-sm q-pa-sm col-6" v-on:submit="submitQuestion" v-on:reset="resetQuestionForm">
        <q-input v-model="questionStatment" label="Question statment" filled type="textarea" autogrow />
        <q-input v-model="correctAnswer" label="Correct Answer" filled type="textarea" autogrow />
        <q-input v-model="description" label="Description" filled type="textarea" autogrow />
        <select-concept
          :section-concepts="suggestedConcepts ? suggestedConcepts.concepts : null"
          required
          v-model="concept"
        ></select-concept>
        <select-subject
          v-if="!subject"
          label="Serch and add subject"
          @subject-selected="onSubjectSelected"
        ></select-subject>
        <q-card v-else>
          <q-card-section>
            <div class="row">
              <div class="col-10">{{ subject.name }}</div>
              <div class="col-2">
                <q-btn class="col-2" flat icon="close" @click="subject = null"></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div>
          <q-btn label="Update" v-if="questionId" type="submit" color="primary" />
          <q-btn label="Submit" v-else type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      <!-- <div class="q-pa-md"></div> -->
      <QuestionRender
        class="col-6 q-pa-sm"
        :question="{ statement: questionStatment }"
        :key="questionStatment"
      ></QuestionRender>
    </div>
  </div>
</template>

<script>
import QuestionsApi from "src/services/api/Questions.api";
import { defineComponent, ref } from "vue";
import SelectConcept from "../concepts/SelectConcept.vue";
import QuestionRender from "./QuestionRender.vue";
import SelectSubject from "../subjects/SelectSubject.vue";

export default defineComponent({
  // setup() {
  //   return { text: ref() };
  // },
  components: { SelectConcept, QuestionRender, SelectSubject },
  name: "QuestionForm",
  data() {
    return {
      questionStatment: "",
      correctAnswer: "",
      description: "",
      concept: null,
      subject: null,
      originalQuestion: null,
    };
  },
  props: {
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
    onSubjectSelected(subject) {
      this.subject = subject;
    },

    async submitQuestion() {
      if (this.questionId) {
        this.updateQuestion();
        return;
      }
      let newQuestion = {
        statement: this.questionStatment,
        correctAnswer: this.correctAnswer,
        description: this.description,
        coreConcept: this.concept._id,
        subject: this.subject._id,
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
        this.subject = this.originalQuestion.subject;
      } else {
        this.questionStatment = "";
        this.correctAnswer = "";
        this.description = "";
        this.concept = null;
        this.subject = null;
      }
    },

    async updateQuestion() {
      let updatedQuestion = {
        statement: this.questionStatment,
        correctAnswer: this.correctAnswer,
        description: this.description,
        coreConcept: this.concept._id,
        subject: this.subject._id,
      };
      let savedQuestion = await QuestionsApi.updateQuestion(updatedQuestion, this.originalQuestion._id);
      this.$emit("questionUpdated", savedQuestion);
    },
  },
});
</script>

<style scoped></style>
