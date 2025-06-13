<template>
  <div>
    <div>
      <span>Questions</span>
      <div class="q-gutter-sm">
        <q-card v-for="(question, index) in questions" :key="question._id" @click="editQuestion(question)">
          <q-card-section>
            <div class="row justify-between">
              <div>{{ question.statement }}</div>
              <div class="q-gutter-sm">
                <!-- <q-btn @click="editQuestion(question)" icon="edit"></q-btn> -->
                <q-btn @click="removeQuestion(questions, index)" icon="delete"></q-btn>
              </div>
            </div>
            <div>{{ question.description }}</div>
          </q-card-section>
        </q-card>
      </div>
      <q-btn label="Add Question" v-on:click="goToCreateQuestion" color="primary" class="q-ma-lg"></q-btn>
    </div>
  </div>
</template>

<script>
import QuestionsApi from "src/services/api/Questions.api";

export default {
  name: "ListQuestions",
  data() {
    return {
      questions: [],
    };
  },

  components: {},

  async mounted() {
    this.questions = await this.getQuestions();
  },

  methods: {
    async getQuestions() {
      let questions = await QuestionsApi.getQuestions();
      console.log(" questions : ", questions);
      return questions;
    },

    goToCreateQuestion() {
      // this.$emit("showAddQuestionDialog");
      this.$router.push("questions/create");
    },

    editQuestion(question) {
      this.$router.push("questions/edit/" + question._id, question);
    },

    async removeQuestion(questions, index) {
      console.log("to be implemented");

      // let question = questions[index];
      // await QuestionsApi.deleteQuestion(question._id);
      // this.questions = await this.getQuestions();
    },
  },
};
</script>

<style scoped></style>
