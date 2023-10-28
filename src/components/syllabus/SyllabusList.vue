<template>
  <div>
    <div id="education-board-list">
      <q-card v-for="board in educationBoards" :key="board._id">
        <span>{{ board.name }}</span>
      </q-card>
    </div>
    <hr />

    <div class="pt-4">
      <q-card
        class="cursor-pointer"
        @click="selectSyllabus(syllabus._id)"
        v-for="syllabus in syllabusList"
        :key="syllabus._id"
        padding
      >
        <q-item clickable>
          <q-card-section>
            <div class="text-h5">{{ syllabus.name }}</div>
            <div>{{ syllabus.description }}</div>
          </q-card-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
import SyllabusApi from "src/services/api/Syllabus.api";
import EducationBoardApi from "src/services/api/EducationBoard.api";

export default {
  name: "SyllabusList",
  data() {
    return {
      educationBoards: null,
      syllabusList: null,
      selectedSyllabusId: "",
    };
  },
  async mounted() {
    this.educationBoards = await EducationBoardApi.listEducationBoards();
    this.syllabusList = await SyllabusApi.getSyllabus();
  },

  methods: {
    selectSyllabus(id) {
      this.$router.push({ name: "edit-syllabus", params: { id: id } });
    },
  },
};
</script>

<style scoped></style>
