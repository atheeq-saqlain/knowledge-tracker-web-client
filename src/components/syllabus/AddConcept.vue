<template>
  <div>
    <div class="text-h5">Concept</div>
    <div class="text-caption">Search for existing concept</div>
    <select-concept v-model="existingConcept" @update:model-value="onConceptSelected"></select-concept>
    <q-separator class="q-my-md"> or </q-separator>
    <div class="text-caption">Create new concept</div>
    <concept-form :subject="subject" @concept-created="onConceptSelected"></concept-form>
  </div>
</template>

<script>
import ConceptForm from "../concepts/ConceptForm.vue";
import SelectConcept from "../concepts/SelectConcept.vue";

export default {
  name: "AddConcept",
  props: ["subject", "concept"],
  data() {
    return {
      existingConcept: null,
    };
  },
  components: { ConceptForm, SelectConcept },
  methods: {
    onConceptSelected(concept) {
      this.$emit("conceptSelected", concept);
    },
  },
};
</script>

<style scoped></style>
