<template>
  <q-page padding>
    <div class="row">
      <div class="col-8 q-pa-sm">
        <!-- Add the custom component here  -->
        <!-- <create-syllabus-form></create-syllabus-form> -->
        <!-- <login-form></login-form> -->
        <concept-form v-if="existingConcept" subject="math" :existing-concept="existingConcept"></concept-form>
      </div>
      <div class="col q-pa-sm">
        <!-- Variable to check the value of the coomponent -->
        <div class="text-h6">component output values</div>
        <span v-if="existingConcept">{{ existingConcept.name }}</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import LoginForm from "src/components/authentication/LoginForm.vue";
import ConceptForm from "src/components/concepts/ConceptForm.vue";
import ConceptsApi from "src/services/api/Concepts.api";
import { userStore } from "src/stores/user-store";

export default {
  components: { ConceptForm },
  data() {
    return {
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
    eventHandler(val) {
      console.log("Event recived from component ... value :  ", val);
    },
  },

  computed: {
    ...mapState(userStore, ["user"]),
  },
};
</script>

<style scoped></style>
