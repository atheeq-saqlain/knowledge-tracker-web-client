<template>
  <concept-form v-if="concept" @concept-updated="onConceptUpdated()" :existing-concept="concept"></concept-form>
</template>

<script>
import ConceptForm from "src/components/concepts/ConceptForm.vue";
import ConceptsApi from "src/services/api/Concepts.api";

export default {
  name: "EditConcept",
  components: { ConceptForm },
  data() {
    return {
      concept: null,
    };
  },
  async mounted() {
    let conceptId = this.$route.params.id;
    this.concept = await ConceptsApi.getConcetpById(conceptId);
  },
  methods: {
    onConceptUpdated() {
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
