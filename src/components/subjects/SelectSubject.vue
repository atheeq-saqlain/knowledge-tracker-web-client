<template>
  <div>
    <q-select
      filled
      use-input
      input-debounce="500"
      v-model="selectedSubject"
      :label="label || 'Subject'"
      :options="subjects"
      @filter="filterFn"
      option-label="name"
      emit-value
      @update:model-value="onSubjectSelected"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import SubjectsApi from "src/services/api/Subjects.api";

export default {
  name: "SelectSubject",
  data() {
    return {
      selectedSubject: null,
      subjects: [],
    };
  },

  props: {
    label: {
      type: String,
      default: "",
    },
    clearOnSelect: {
      type: Boolean,
      default: false,
    },
  },

  async mounted() {
    this.subjects = await this.getSubjects();
  },

  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(async () => {
          this.subjects = await this.getSubjects();

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(async () => {
        this.subjects = await SubjectsApi.searchSubjects(val);
      });
    },

    async getSubjects() {
      let subjects = await SubjectsApi.getSubjects();
      return subjects;
    },
    onSubjectSelected(subject) {
      this.$emit("subject-selected", subject);
      // this.selectedSubject = subject;
      if (this.clearOnSelect) {
        this.selectedSubject = null;
      }
    },
  },
};
</script>

<style scoped></style>
