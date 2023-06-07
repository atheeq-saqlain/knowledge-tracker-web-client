<template>
  <div>
    <div class="text-h5">Create Syllabus</div>
    <q-form class="q-gutter-sm" v-on:submit="submitSyllabus" v-on:reset="resetSyllabusForm">
      <q-input v-model="name" label="Name" filled type="text" />
      <q-input v-model="description" label="Description" filled type="textarea" autogrow />
      <q-input v-model="grade" label="Grade/class" filled type="number" />
      <select-education-board v-model="educationBoard"></select-education-board>
      <q-select filled label="Subject" :options="availableSubjects" v-model="subject"></q-select>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import SyllabusApi from "src/services/api/Syllabus.api";
import SelectEducationBoard from "../education_board/SelectEducationBoard.vue";
import QuestionForm from "../questions/QuestionForm.vue";

export default {
  name: "CreateSyllabusForm",
  data() {
    return {
      name: "",
      description: "",
      grade: "",
      educationBoard: null,
      subject: "",
      availableSubjects: ["Math", "Physics"],
    };
  },
  components: { SelectEducationBoard },
  methods: {
    submitSyllabus() {
      let newSyllabus = {
        name: this.name,
        description: this.description,
        grade: this.grade,
        subject: this.subject,
        educationBoard: this.educationBoard._id,
      };
      console.log(newSyllabus);
      SyllabusApi.createSyllabus(newSyllabus);
    },

    resetSyllabusForm() {
      this.name = "";
      this.description = "";
      this.grade = "";
      this.educationBoard = null;
      this.subject = "";
    },
  },
};
</script>

<style scoped></style>
