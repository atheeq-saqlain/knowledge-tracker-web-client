<template>
  <div>
    <div class="text-h4 q-mt-md">Concepts</div>

    <div class="q-my-md row q-gutter-sm">
      <q-input
        v-model="search"
        class="col"
        debounce="500"
        @update:model-value="searchConcepts"
        label="Search"
        filled
        type="text"
      />

      <SelectSubject class="col" :clear-on-select="true" v-on:subject-selected="onSubjectSelected"></SelectSubject>

      <q-btn class="col-1" color="primary" icon="filter_list" @click="filterConcepts" />
      <q-btn class="col-1" color="warning" icon="clear" @click="clearFiltersAndReload" />
    </div>

    <div v-if="conceptFilters && conceptFilters.subjects">
      <q-chip
        removable
        @remove="removeSubjectFilter(subject)"
        v-for="subject in conceptFilters.subjects"
        :key="subject._id"
        >{{ subject.name }}</q-chip
      >
    </div>

    <div class="padding container">
      <div>
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

            <div class="q-mt-sm">
              <q-chip
                v-for="subject in concept.subjects"
                :key="subject._id"
                dense
                square
                color="teal"
                text-color="white"
                >{{ subject.name }}</q-chip
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
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
          <concept-form @concept-created="onConceptCreated()"></concept-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-btn label="Add" v-on:click="showConceptForm()" color="primary" class="fixed-bottom-right q-ma-lg"> </q-btn>
  </div>
</template>

<script>
import ConceptForm from "src/components/concepts/ConceptForm.vue";
import SelectSubject from "src/components/subjects/SelectSubject.vue";
import ConceptsApi from "src/services/api/Concepts.api";

ConceptsApi;
export default {
  name: "ConceptsList",
  async mounted() {
    this.concepts = await this.getConcepts();
  },
  components: { ConceptForm, SelectSubject },
  data() {
    return {
      search: "",
      SHOW_CONCEPT_FORM: false,
      concepts: [],
      filteredConcepts: [],
      conceptFilters: {
        searchText: "",
        subjects: [],
      },
      SHOW_DELETE_CONFIRMATION: false,
      conceptToDelete: null,
    };
  },
  methods: {
    removeSubjectFilter(subject) {
      this.conceptFilters.subjects = this.conceptFilters.subjects.filter((s) => s._id !== subject._id);
      this.filterConcepts();
    },

    resetConceptFilters() {
      this.search = "";
      this.conceptFilters = {
        searchText: "",
        subjects: [],
      };
    },

    async clearFiltersAndReload() {
      this.resetConceptFilters();
      this.concepts = await this.getConcepts();
    },

    async filterConcepts() {
      let conceptFilterQuery = {};
      if (this.conceptFilters.searchText) {
        conceptFilterQuery.searchText = this.conceptFilters.searchText;
      }
      if (this.conceptFilters.subjects && this.conceptFilters.subjects.length) {
        conceptFilterQuery.subjects = this.conceptFilters.subjects.map((s) => s._id);
      }
      console.log("filtering concepts with : ", conceptFilterQuery);
      this.concepts = await ConceptsApi.filterConcepts(conceptFilterQuery);
    },

    async searchConcepts(searchText) {
      console.log("searching : ", searchText);
      this.conceptFilters.searchText = searchText;
      this.filterConcepts();
    },

    onSubjectSelected(subject) {
      console.log("selected subject : ", subject);
      // this.searchConcepts(subject.name);
      this.conceptFilters.subjects.push(subject);
      this.filterConcepts();
    },

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
