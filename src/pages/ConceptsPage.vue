<template>
  <div>
    <div v-for="concept in concepts" :key="concept._id">
      <div>{{ concept.name }}</div>
    </div>
  </div>
</template>

<script>
import ConceptsApi from "src/services/api/Concepts.api";

ConceptsApi;
export default {
  name: "ConceptsPage",

  async mounted() {
    this.concepts = await this.getConcepts();
  },

  data() {
    return {
      concepts: [],
    };
  },

  methods: {
    async getConcepts() {
      return await ConceptsApi.getConcetps();
    },
  },
};
</script>

<style scoped></style>
