<template>
  <div v-if="syllabus && syllabus.educationBoard">
    <h5>{{ syllabus.grade }} {{ syllabus.educationBoard.abbreviation }} {{ syllabus.subject }}</h5>
    <div>{{ syllabus.description }}</div>

    <!-- chapters list  -->
    <div>
      <div class="q-pa-md">
        <q-list bordered>
          <q-expansion-item v-for="(chapter, index) in syllabus.chapters" :key="index" group="somegroup">
            <template v-slot:header>
              <div class="col-11">
                <div class="row q-gutter-sm">
                  <div class="col-10">
                    <q-input dense outlined v-model="chapter.title" type="text" />
                  </div>
                  <div class="col-1">
                    <q-btn @click="removeChapter(syllabus.chapters, index)" icon="delete"></q-btn>
                  </div>
                </div>
              </div>
            </template>

            <q-card>
              <q-card-section class="q-gutter-sm">
                <div v-for="section in chapter.sections" :key="section.title" class="padding container">
                  <div v-if="section.editTitle" class="row">
                    <q-input v-model="editedSectionTitle" class="col-10"></q-input>
                    <q-btn @click="editSectionTitle(section)" icon="done" class="col-1"></q-btn>
                    <q-btn @click="cancelSectionTitleEdit(section)" icon="close" class="col-1"></q-btn>
                  </div>
                  <div class="text-h6" v-else>
                    {{ section.title }}
                    <q-btn @click="section.editTitle = true" class="q-ml-sm" icon="edit"></q-btn>
                  </div>
                  <span>concepts </span>
                  <q-card class="q-my-md" v-for="(concept, index) in section.concepts" :key="concept.name">
                    <q-card-section>
                      <div class="row justify-between">
                        <div>{{ concept.name }}</div>
                        <div class="q-gutter-sm">
                          <q-btn @click="removeConcept(section.concepts, index)" icon="delete"></q-btn>
                        </div>
                      </div>
                      <div>{{ concept.description }}</div>
                    </q-card-section>
                  </q-card>

                  <!-- add concept button -->
                  <div class="row justify-center">
                    <q-btn class="text-primary" v-on:click="openConceptModal(section)" outline>Add concept</q-btn>
                  </div>

                  <q-dialog v-model="SHOW_CONCEPT_FORM">
                    <q-card style="width: 80vw">
                      <q-card-section>
                        <add-concept @concept-selected="addConceptToSeciton" :subject="syllabus.subject"></add-concept>
                      </q-card-section>
                    </q-card>
                  </q-dialog>

                  <q-separator class="q-my-md" />

                  <span>Questions</span>
                  <q-card class="q-my-md" v-for="(question, index) in section.questions" :key="question._id">
                    <q-card-section>
                      <div class="row justify-between">
                        <div>{{ question.statement }}</div>
                        <div class="q-gutter-sm">
                          <q-btn @click="editQuestion(question)" icon="edit"></q-btn>
                          <q-btn @click="removeQuesiton(section.questions, index)" icon="delete"></q-btn>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <!-- add question button -->
                  <div class="row justify-center">
                    <q-btn class="text-primary" outline v-on:click="openQuestionModal(section)">Add Question</q-btn>
                  </div>

                  <q-dialog v-model="SHOW_QUESTION_FORM">
                    <q-card style="width: 80vw">
                      <q-card-section>
                        <question-form
                          :syllabus-id="syllabus._id"
                          :suggested-concepts="managedSection"
                          @question-added="addQuestionToSection"
                        ></question-form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>

                  <q-dialog v-model="SHOW_EDIT_QUESTION_FORM">
                    <q-card style="width: 80vw">
                      <q-card-section>
                        <question-form
                          :question-id="editQuestionId"
                          :syllabus-id="syllabus._id"
                          :suggested-concepts="section"
                          @question-updated="getSyllabusById"
                        ></question-form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </div>

                <!-- add section  -->
                <div class="q-mt-sm">
                  <div v-if="SHOW_SECTION_INPUT">
                    <q-card>
                      <q-card-section>
                        <div class="row q-gutter-sm">
                          <div class="col-10">
                            <q-input v-model="newSectionTitle" label="Section title" filled type="input" />
                          </div>
                          <q-btn class="primary" @click="confirmSectionTitle(chapter)">ok</q-btn>
                          <q-btn class="primary" @click="closeNewSectionInput">X</q-btn>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="q-mt-md row justify-center" v-else>
                    <q-btn class="text-primary" v-on:click="SHOW_SECTION_INPUT = true" outline>Add section</q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>

        <!-- chapter addition -->
        <div class="q-mt-md">
          <div v-if="SHOW_CHAPTER_INPUT">
            <q-card>
              <q-card-section>
                <div class="row q-gutter-sm">
                  <div class="col-10">
                    <q-input v-model="newChapterName" label="Chapter name" filled type="input" />
                  </div>
                  <q-btn class="primary" @click="confirmChapterName" icon="done"></q-btn>
                  <q-btn class="primary" @click="closeNewChapterInput" icon="cancel"></q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mt-md row justify-center">
            <q-btn class="text-primary" v-on:click="SHOW_CHAPTER_INPUT = true" outline>Add chapter</q-btn>
          </div>
        </div>
      </div>
      <q-btn label="Save" v-on:click="updateSyllabus" color="primary" class="fixed-bottom-right q-ma-lg"> </q-btn>
    </div>
  </div>
</template>

<script>
import SyllabusApi from "src/services/api/Syllabus.api";
import { defineComponent } from "vue";
import QuestionForm from "../questions/QuestionForm.vue";
import AddConcept from "./AddConcept.vue";

export default defineComponent({
  name: "SyllabusDetails",
  props: ["syllabusId"],
  // setup() {
  //   const $q = useQuasar();
  //   function showUpdateSuccess() {
  //     $q.dialog({
  //       title: "success",
  //       message: "Syllabus saved successfully ",
  //     });
  //   }
  //   return { showUpdateSuccess };
  // },
  components: { QuestionForm, AddConcept },
  data() {
    return {
      SHOW_QUESTION_FORM: false,
      SHOW_CONCEPT_FORM: false,
      SHOW_EDIT_QUESTION_FORM: false,
      editQuestionId: null,
      SHOW_EDIT_CONCEPT_FORM: false,
      editConceptId: null,

      SHOW_CHAPTER_INPUT: false,
      newChapterName: "",
      editedChapterTitle: "",

      SHOW_SECTION_INPUT: false,
      editedSectionTitle: "",
      newSectionTitle: "",
      managedSection: null,
      syllabus: null,
    };
  },
  async mounted() {
    let syllabusId = this.$route.params.id;
    await this.getSyllabusById(syllabusId);
  },
  methods: {
    async getSyllabusById(id) {
      let res = await SyllabusApi.getSyllabusById(id);
      this.syllabus = res;
    },

    // question related functionality ...
    openQuestionModal(section) {
      this.managedSection = section;
      this.SHOW_QUESTION_FORM = true;
    },
    async addQuestionToSection(quesiton) {
      this.managedSection.questions.push(quesiton);
      this.managedSection = null;
      this.SHOW_QUESTION_FORM = false;
      await this.updateSyllabus();
    },
    editQuestion(question) {
      this.editQuestionId = question._id;
      this.SHOW_EDIT_QUESTION_FORM = true;
    },
    removeQuesiton(questions, index) {
      questions.splice(index, 1);
    },

    // concept related functionality ...
    openConceptModal(section) {
      this.managedSection = section;
      this.SHOW_CONCEPT_FORM = true;
    },
    async addConceptToSeciton(concept) {
      this.managedSection.concepts.push(concept);
      this.SHOW_CONCEPT_FORM = false;
      this.managedSection = null;
      await this.updateSyllabus();
    },
    removeConcept(concepts, index) {
      concepts.splice(index, 1);
    },

    async updateSyllabus() {
      this.syllabus = await SyllabusApi.updateSyllabus(this.syllabus);
      this.showUpdateSuccess();
    },

    showUpdateSuccess() {
      let dialog = this.$q
        .dialog({
          // title: "Success",
          message: "Syllabus saved successfully!",
          color: "blue",
        })
        .onOk(() => console.log("saved"));
      setTimeout(() => {
        dialog.hide();
      }, 1000);
    },

    showConfirmationDialog() {
      // Need to add dialoge to decide if we need to remove the questions and concepts if the chapter or section is deleted
    },

    // chapters functionality...
    confirmChapterName() {
      this.syllabus.chapters.push({
        title: this.newChapterName,
        sections: [],
      });
      this.closeNewChapterInput();
    },
    closeNewChapterInput() {
      this.SHOW_CHAPTER_INPUT = false;
      this.newChapterName = "";
    },
    closeNewSectionInput() {
      this.SHOW_SECTION_INPUT = false;
      this.newSectionTitle = "";
    },
    confirmSectionTitle(chapter) {
      chapter.sections.push({
        title: this.newSectionTitle,
        concepts: [],
        questions: [],
      });
      this.closeNewSectionInput();
    },
    removeChapter(chapters, index) {
      chapters.splice(index, 1);
    },

    // sections functionality ...
    editSectionTitle(section) {
      section.title = this.editedSectionTitle;
      delete section.editTitle;
    },
    cancelSectionTitleEdit(section) {
      delete section.editTitle;
    },
    removeSection(sections, index) {
      sections.splice(index, 1);
    },
  },
});
</script>

<style scoped></style>
