<template>
  <div>
    <q-select
      filled
      v-model="concept"
      use-input
      input-debounce="0"
      :label="label || 'Existing Concept'"
      :options="concepts"
      @filter="filterFn"
      option-value="name"
      option-label="name"
      @update:model-value="selectedOption"
      :rules="[validate]"
    >
      <!-- <template v-slot:option="concept">{{ concept.opt.name }}</template> -->
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import ConceptsApi from "src/services/api/Concepts.api";

export default {
  name: "SelectConcept",
  props: {
    label: { type: String },
    sectionConcepts: { type: Array },
    required: { type: Boolean },
    modelValue: { type: Object },
    resetAfterSelection: { type: Boolean, default: false },
  },

  data() {
    return {
      concept: null,
      concepts: [],
    };
  },

  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.concepts = this.sectionConcepts;

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(async () => {
        this.concepts = await ConceptsApi.searchConcepts(val);
      });
    },

    validate(val) {
      if (this.required && !val) {
        return "Field is required";
      }
      return true;
    },

    selectedOption(value) {
      this.$emit("update:modelValue", value);
      if (this.resetAfterSelection) {
        this.concept = null;
      }
    },
  },
};
</script>

<style scoped></style>
