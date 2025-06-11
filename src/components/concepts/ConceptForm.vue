<template>
  <div>
    <q-form class="q-gutter-sm" v-on:submit="submitConcept" v-on:reset="resetConceptForm">
      <q-input v-model="name" label="Concept name" filled type="text" />
      <q-input v-model="definition" label="Definition" filled type="textarea" autogrow />
      <q-input v-model="description" label="Description" filled type="textarea" autogrow />

      <div class="text-h5 q-mt-lg">Subjects</div>
      <div class="q-gutter-sm">
        <q-card v-for="subject in subjects" :key="subject._id">
          <q-card-section>
            <div class="row justify-between">
              <div>{{ subject.name }}</div>
              <div><button @click="removeSubject(subject)">Del</button></div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <select-subject
        label="Serch and add subject"
        clear-on-select
        @subject-selected="onSubjectSelected"
      ></select-subject>

      <div class="text-h5 q-mt-lg">Pre requisite concepts</div>
      <div class="q-gutter-sm">
        <q-card v-for="concept in preRequisitConcepts" :key="concept._id">
          <q-card-section>
            <div>
              <div>{{ concept.name }}</div>
              <div>{{ concept.description }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <select-concept
        :reset-after-selection="true"
        label="Search and add pre-requisite concept"
        v-model="selectedPreConcept"
        @update:model-value="onConceptSelected"
      ></select-concept>

      <div>
        <q-btn v-if="existingConcept" label="Update" type="submit" color="primary" />
        <q-btn v-else label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="Delete" v-if="existingConcept" @click="showDeleteConfirmationDialoge()" color="negative"></q-btn>
      </div>
    </q-form>
    <q-dialog v-model="SHOW_DELETE_CONFIRMATION" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="warning" text-color="white" />
          <span class="q-ml-sm">Are you sure, this action cannot be undone !</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" @click="deleteConcept()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ConceptsApi from "src/services/api/Concepts.api";
import SelectConcept from "./SelectConcept.vue";
import SelectSubject from "../subjects/SelectSubject.vue";

export default {
  name: "ConceptForm",

  props: ["existingConcept"],

  components: { SelectConcept, SelectSubject },

  data() {
    return {
      name: "",
      definition: "",
      description: "",
      selectedPreConcept: null,
      preRequisitConcepts: [],
      subjects: [],
      SHOW_DELETE_CONFIRMATION: false,
    };
  },

  mounted() {
    this.resetConceptForm();
  },

  methods: {
    onSubjectSelected(subject) {
      this.subjects.push(subject);
    },

    removeSubject(subject) {
      this.subjects.splice(this.subjects.indexOf(subject), 1);
    },

    async submitConcept() {
      if (this.existingConcept) {
        await this.updateConcept();
        return;
      }
      let newConcept = {
        name: this.name,
        definition: this.definition,
        description: this.description,
        preRequisitConcepts: this.preRequisitConcepts,
        subjects: this.subjects,
      };
      let createdConcept = await ConceptsApi.createConcept(newConcept);
      this.$emit("conceptCreated", createdConcept);
    },

    onConceptSelected(concept) {
      this.preRequisitConcepts.push(concept);
      this.selectedPreConcept = null;
    },

    showDeleteConfirmationDialoge() {
      this.SHOW_DELETE_CONFIRMATION = true;
    },

    async deleteConcept() {
      await ConceptsApi.deleteConcept(this.existingConcept._id);
      this.$router.back();
    },

    resetConceptForm() {
      if (this.existingConcept) {
        this.name = this.existingConcept.name;
        this.definition = this.existingConcept.definition;
        this.description = this.existingConcept.description;
        this.preRequisitConcepts = this.existingConcept.preRequisitConcepts;
        this.subjects = this.existingConcept.subjects;
      } else {
        this.name = "";
        this.definition = "";
        this.description = "";
        this.preRequisitConcepts = [];
      }
    },

    async updateConcept() {
      let concept = {
        name: this.name,
        definition: this.definition,
        description: this.description,
        preRequisitConcepts: this.preRequisitConcepts,
        subjects: this.subjects,
      };
      let updatedConcept = await ConceptsApi.updateConcept(this.existingConcept._id, concept);
      this.$emit("conceptUpdated", updatedConcept);
    },
  },
};
</script>

<style scoped></style>
