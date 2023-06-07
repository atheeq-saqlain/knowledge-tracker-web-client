<template>
  <div>
    <q-select
      filled
      input-debounce="0"
      v-model="educationBoard"
      label="Education board"
      option-value="abbreviation"
      option-label="abbreviation"
      :options="educationBoards"
      @update:model-value="selectedOption"
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
import EducationBoardApi from "src/services/api/EducationBoard.api";

export default {
  name: "SelectEducationBoard",

  data() {
    return {
      educationBoard: null,
      educationBoards: [],
    };
  },

  async mounted() {
    this.educationBoards = await EducationBoardApi.listEducationBoards();
  },

  methods: {
    selectedOption(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style scoped></style>
