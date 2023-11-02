<template>
  <div>
    <span>concepts </span>
    <div class="padding container">
      <q-card class="q-my-md" v-for="(concept, index) in concepts" :key="index">
        <q-card-section>
          <div class="row justify-between">
            <div>{{ concept.name }}</div>
            <div class="q-gutter-sm">
              <q-btn @click="viewConcept(concept)" icon="link"></q-btn>
            </div>
          </div>
          <div>{{ concept.description }}</div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="SHOW_CONCEPT_FORM">
      <q-card style="width: 80vw">
        <q-card-section>
          <concept-form subject="math"></concept-form>
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
  data() {
    return {
      SHOW_CONCEPT_FORM: false,
      concepts: [],
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
  },
  components: { ConceptForm },
};
</script>

<style scoped></style>
