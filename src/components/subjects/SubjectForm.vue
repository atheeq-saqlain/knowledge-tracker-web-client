<template>
  <div v-if="simple" class="row">
    <q-input class="col-8" v-model="name" placeholder="Enter new subject name" />
    <div class="col-2 row justify-center items-center">
      <q-btn icon="add" @click="createSubject" round color="primary"></q-btn>
    </div>
  </div>

  <div v-else>
    <q-form class="q-gutter-sm" v-on:submit="onSubmit" v-on:reset="resetSubjectForm">
      <q-input v-model="name" label="Subject name" filled type="text" />
      <q-input v-model="definition" label="Definition" filled type="textarea" autogrow />
      <q-input v-model="description" label="Description" filled type="textarea" autogrow />
      <div>
        <select-subject
          v-if="!parentSubject"
          label="Parent subject"
          @subject-selected="onParentSubjectSelected"
        ></select-subject>
        <q-card v-else>
          <q-card-section>
            <div class="row">
              <div class="col-10">{{ parentSubject.name }}</div>
              <div class="col-2">
                <q-btn class="col-2" flat icon="close" @click="parentSubject = null"></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-mt-lg">
        <span class="text-h5">concepts</span>
        <select-concept
          :reset-after-selection="true"
          label="Search and add concepts"
          v-model="selectedConcept"
          @update:model-value="onConceptSelected"
        ></select-concept>
        <div class="q-gutter-sm">
          <q-card v-for="(concept, index) in concepts" :key="concept._id">
            <q-card-section>
              <div class="row">
                <div class="col-10">{{ concept.name }}</div>
                <!-- <div>{{ concept.description }}</div> -->
                <div class="col-2">
                  <q-btn flat icon="close" @click="concepts.splice(index, 1)"></q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div>
        <q-btn label="Submit" v-if="!existingSubject" type="submit" color="primary" />
        <q-btn label="Update" v-if="existingSubject" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import SubjectsApi from "src/services/api/Subjects.api";
import SelectSubject from "./SelectSubject.vue";
import SelectConcept from "../concepts/SelectConcept.vue";

export default {
  name: "SubjectForm",

  props: ["defaultParentSubject", "simple", "existingSubject"],

  components: { SelectSubject, SelectConcept },

  data() {
    return {
      name: "",
      description: "",
      definition: "",
      parentSubject: null,
      concepts: [],
      questions: [],
      selectedConcept: null,
    };
  },

  mounted() {
    if (this.defaultParentSubject) {
      this.parentSubject = this.defaultParentSubject;
    }

    if (this.existingSubject) {
      this.setPropertiesFromExistingSubject(this.existingSubject);
    }
  },

  methods: {
    setPropertiesFromExistingSubject(subject) {
      this.name = subject.name;
      this.description = subject.description;
      this.definition = subject.definition;
      this.parentSubject = subject.parentSubject;
      this.concepts = subject.concepts;
      this.questions = subject.questions;
    },

    onSubmit() {
      if (this.existingSubject) {
        this.updateSubject();
      } else {
        this.createSubject();
      }
    },

    async updateSubject() {
      let subjectPayload = {
        name: this.name,
        parentSubject: this.parentSubject._id,
        definition: this.definition,
        description: this.description,
        concepts: this.concepts,
        questions: this.questions,
      };
      let updatedSubject = await SubjectsApi.updateSubject(this.existingSubject._id, subjectPayload);
      this.$emit("subjectUpdated", updatedSubject);
    },

    async createSubject() {
      // return;
      let subjectPayload = {
        name: this.name,
        definition: this.definition,
        description: this.description,
        concepts: this.concepts,
        questions: this.questions,
      };

      if (this.parentSubject) {
        subjectPayload.parentSubject = this.parentSubject._id;
      }

      console.log("subject payload : ", subjectPayload);
      // return;
      let createdSubject = await SubjectsApi.createSubject(subjectPayload);
      console.log("created subject : ", createdSubject);
      this.$emit("subjectCreated", createdSubject);
    },

    resetSubjectForm() {
      this.name = "";
      this.description = "";
      this.definition = "";
    },

    onConceptSelected(concept) {
      this.concepts.push(concept);
      this.selectedPreConcept = null;
    },

    onParentSubjectSelected(subject) {
      this.parentSubject = subject;
    },
  },
};
</script>

<style scoped></style>
