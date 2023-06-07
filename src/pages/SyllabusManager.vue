<template>
  <q-page padding>
    <div v-if="!EDIT_SYLLABUS">
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
    <div v-else>
      <q-btn v-on:click="EDIT_SYLLABUS = false">back</q-btn>
      <syllabus-details :syllabus-id="selectedSyllabusId"></syllabus-details>
    </div>
  </q-page>
</template>

<script>
import SyllabusApi from "src/services/api/Syllabus.api";
import SyllabusDetails from "src/components/syllabus/SyllabusDetails.vue";
import EducationBoardApi from "src/services/api/EducationBoard.api";

export default {
  name: "SyllabusManager",

  components: { SyllabusDetails },

  data() {
    return {
      educationBoards: null,
      syllabusList: null,
      EDIT_SYLLABUS: false,
      selectedSyllabusId: "",
    };
  },

  async mounted() {
    this.educationBoards = await EducationBoardApi.listEducationBoards();
    // console.log("education boards ", this.educationBoards);

    this.syllabusList = await SyllabusApi.getSyllabus();
  },

  methods: {
    selectSyllabus(id) {
      this.selectedSyllabusId = id;
      this.EDIT_SYLLABUS = true;
    },
  },
};
</script>

<style scoped></style>
