<template>
  <div>
    <q-card>
      <q-card-section>
        <question-form></question-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import QuestionForm from "./QuestionForm.vue";

export default {
  name: "CreateQuestion",

  components: { QuestionForm },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped></style>
