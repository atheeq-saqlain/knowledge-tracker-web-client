<template>
  <div>
    <span>concepts </span>
    <div class="padding container">
      <q-card class="q-my-md" v-for="(concept, index) in concepts" :key="index">
        <q-card-section>
          <div class="row justify-between">
            <div>{{ concept.name }}</div>
            <div class="q-gutter-sm">
              <q-btn @click="viewConcept(concept)" icon="edit"></q-btn>
              <q-btn @click="showDeleteConfirmationDialoge(concept)" icon="delete"></q-btn>
            </div>
          </div>
          <div>{{ concept.definition }}</div>
        </q-card-section>
      </q-card>
    </div>
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

    <q-dialog v-model="SHOW_CONCEPT_FORM">
      <q-card style="width: 80vw">
        <q-card-section>
          <concept-form @concept-created="onConceptCreated()" subject="math"></concept-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-btn label="Add" v-on:click="showConceptForm()" color="primary" class="fixed-bottom-right q-ma-lg"> </q-btn>
  </div>
</template>

<script>
import ConceptForm from "src/components/concepts/ConceptForm.vue";
import ConceptsApi from "src/services/api/Concepts.api";

ConceptsApi;
export default {
  name: "ConceptsList",
  async mounted() {
    this.concepts = await this.getConcepts();
  },
  components: { ConceptForm },
  data() {
    return {
      SHOW_CONCEPT_FORM: false,
      concepts: [],
      SHOW_DELETE_CONFIRMATION: false,
      conceptToDelete: null,
    };
  },
  methods: {
    showConceptForm() {
      this.SHOW_CONCEPT_FORM = true;
    },
    viewConcept(concept) {
      this.$router.push({ name: "edit-concept", params: { id: concept._id } });
    },
    async getConcepts() {
      return await ConceptsApi.getConcetps();
    },
    showDeleteConfirmationDialoge(concept) {
      this.SHOW_DELETE_CONFIRMATION = true;
      this.conceptToDelete = concept;
    },
    async deleteConcept() {
      await ConceptsApi.deleteConcept(this.conceptToDelete._id);
      this.concepts = await this.getConcepts();
    },

    onConceptCreated() {
      this.SHOW_CONCEPT_FORM = false;
      this.concepts = this.getConcepts();
    },
  },
};
</script>

<style scoped></style>
