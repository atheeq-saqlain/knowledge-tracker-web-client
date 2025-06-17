<template>
  <q-page padding>
    <div class="row">
      <div class="col-8 q-pa-sm">
        <!-- Add the custom component here  -->
        <!-- <create-syllabus-form></create-syllabus-form> -->
        <!-- <login-form></login-form> -->
        <!-- <concept-form v-if="existingConcept" :existing-concept="null"></concept-form> -->
        <!-- <student-card :student="{ name: 'John Doe' }"></student-card> -->
        <!-- <select-subject @subject-selected="eventHandler"></select-subject> -->
        <subject-form @createSubject="eventHandler($event, 'test')"></subject-form>
      </div>
      <div class="col q-pa-sm">
        <!-- Variable to check the value of the coomponent -->
        <div class="text-h6">component output values</div>
        <span v-if="result">{{ result }}</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import LoginForm from "src/components/authentication/LoginForm.vue";
import ConceptForm from "src/components/concepts/ConceptForm.vue";
import StudentCard from "src/components/students/StudentCard.vue";
import SelectSubject from "src/components/subjects/SelectSubject.vue";
import SubjectForm from "src/components/subjects/SubjectForm.vue";
import ConceptsApi from "src/services/api/Concepts.api";
import { userStore } from "src/stores/user-store";

export default {
  components: { SubjectForm },
  data() {
    return {
      result: null,
      existingConcept: null,
      selectedConcept: null,
      sectionConcepts: [
        {
          name: "Arithmetic progression",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
        },
        {
          name: "geometric progression",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
        },
      ],
    };
  },

  async mounted() {
    let concepts = await ConceptsApi.getConcetps();
    this.existingConcept = await ConceptsApi.getConcetpById(concepts[1]._id);
  },

  methods: {
    eventHandler(val, data) {
      console.log("arguments :  ", data);
      console.log("Event recived from component ... value :  ", val.name);
      this.result = {
        value: val,
        args: data,
      };
    },
  },

  computed: {
    ...mapState(userStore, ["user"]),
  },
};
</script>

<style scoped></style>
