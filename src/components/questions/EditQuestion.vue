<template>
  <div>
    <question-form v-if="questionId" :question-id="questionId"></question-form>
  </div>
</template>

<script>
import QuestionForm from "./QuestionForm.vue";

export default {
  name: "ViewQuestion",

  components: { QuestionForm },

  data() {
    return {
      questionId: null,
    };
  },

  mounted() {
    this.getQuestionIdFromParams();
  },

  methods: {
    getQuestionIdFromParams() {
      this.questionId = this.$route.params.questionId;
    },
  },
};
</script>

<style scoped></style>
