<template>
  <div>
    <q-form class="q-gutter-sm" v-on:submit="submitConcept" v-on:reset="resetConceptForm">
      <q-input v-model="name" label="Concept name" filled type="text" />
      <q-input v-model="definition" label="Definition" filled type="textarea" autogrow />
      <q-input v-model="description" label="Description" filled type="textarea" autogrow />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <!-- <q-btn label="Submit" type="submit" color="primary" /> -->
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <div class="q-pa-md"></div>
  </div>
</template>

<script>
import ConceptsApi from "src/services/api/Concepts.api";
import SelectConcept from "./SelectConcept.vue";

export default {
  name: "ConceptForm",

  props: ["subject", "concept"],

  data() {
    return {
      name: "",
      definition: "",
      description: "",
      preRequisitConcepts: [],
      // existingConcept: null,
    };
  },

  methods: {
    async submitConcept() {
      // if (this.existingConcept) {
      // } else {
      // }
      let newConcept = {
        name: this.name,
        definition: this.definition,
        description: this.description,
        subject: this.subject,
        preRequisitConcepts: this.preRequisitConcepts,
      };
      let createdConcept = await ConceptsApi.createConcept(newConcept);
      this.$emit("conceptSelected", createdConcept);
    },

    resetConceptForm() {
      this.name = "";
      this.definition = "";
      this.description = "";
      this.preRequisitConcepts = [];
      this.existingConcept = null;
    },
  },
};
</script>

<style scoped></style>
