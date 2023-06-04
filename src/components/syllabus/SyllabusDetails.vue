<template>
  <div v-if="syllabus && syllabus.educationBoard">
    <h5>{{ syllabus.grade }} {{ syllabus.educationBoard.abbreviation }} {{ syllabus.subject }}</h5>
    <div>{{ syllabus.description }}</div>

    <!-- chapters list  -->
    <div>
      <div class="q-pa-md">
        <q-list bordered>
          <q-expansion-item
            v-for="chapter in syllabus.chapters"
            :key="chapter.title"
            group="somegroup"
            icon="explore"
            :label="chapter.title"
          >
            <q-card>
              <q-card-section class="q-gutter-sm">
                <div v-for="section in chapter.sections" :key="section.title" class="padding container">
                  <div v-if="section.editTitle" class="row">
                    <q-input v-model="editedSectionTitle" class="col-10 q-mr-md"></q-input>
                    <q-btn @click="editSectionTitle(section)">ok</q-btn>
                  </div>
                  <div class="text-h6" v-else>
                    {{ section.title }} <q-btn @click="section.editTitle = true" class="q-ml-sm">edit</q-btn>
                  </div>
                  <span>concepts </span>
                  <q-card class="q-my-md" v-for="concept in section.concepts" :key="concept.name">
                    <q-card-section>
                      <div class="row justify-between">
                        <div>{{ concept.name }}</div>
                        <q-btn @click="editConcept">Edit</q-btn>
                      </div>
                      <div>{{ concept.description }}</div>
                    </q-card-section>
                  </q-card>

                  <!-- add concept button -->
                  <div class="row justify-center">
                    <q-btn class="text-primary" v-on:click="SHOW_CONCEPT_FORM = true" outline>Add concept</q-btn>
                  </div>

                  <q-separator class="q-my-md" />

                  <span>Questions</span>
                  <q-card class="q-my-md" v-for="question in section.questions" :key="question._id">
                    <q-card-section>
                      <div class="row justify-between">
                        <div>{{ question.statement }}</div>
                        <q-btn @click="editQuestion">Edit</q-btn>
                      </div>
                    </q-card-section>
                  </q-card>

                  <!-- add question button -->
                  <div class="row justify-center">
                    <q-btn class="text-primary" outline v-on:click="SHOW_QUESTION_FORM = true">Add Question</q-btn>
                  </div>

                  <q-dialog v-model="SHOW_QUESTION_FORM">
                    <q-card style="width: 80vw">
                      <q-card-section>
                        <question-form
                          :syllabus-id="syllabusId"
                          :section="section"
                          @question-added="addCreatedQuestion"
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
                  <q-btn class="primary" @click="confirmChapterName">ok</q-btn>
                  <q-btn class="primary" @click="closeNewChapterInput">X</q-btn>
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

    <q-dialog v-model="SHOW_CONCEPT_FORM">
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, molestias fugit illo nisi id dolorem fuga,
          assumenda autem quasi odio inventore? Iure tenetur, cumque commodi labore quasi ipsa explicabo architecto.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import SyllabusApi from "src/services/api/Syllabus.api";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import QuestionForm from "../questions/QuestionForm.vue";

const sampleSyllabus = {
  name: "10th ICSE Math",
  description: "10th ICSE Math",
  grade: "10",
  _id: "lknsdfnnsdfl232",
  educationBoard: {
    name: "Indian secondary board",
    abbreviation: "ICSE",
  },
  subject: "Math",
  chapters: [
    {
      title: "Chapter 1",
      sections: [
        {
          title: "Arithmetic Progression",
          concepts: [
            {
              name: "concept of AP",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              name: "concept of AP 2",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
          questions: [
            {
              _id: "241234234",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "24234kjn234",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "sdih87387kjs",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
        },
        {
          title: "Arithmetic Progression section 2",
          concepts: [
            {
              name: "concept of AP",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              name: "concept of AP 2",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
          questions: [
            {
              _id: "241234234",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "24234kjn234",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "sdih87387kjs",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
        },
      ],
    },
    {
      title: "Chapter 2",
      sections: [
        {
          title: "Triangles",
          concepts: [
            {
              name: "concept of triangles",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              name: "concept of triangles 2",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
          questions: [
            {
              _id: "sdkj98u9w8",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "sdu989sdulsdf9",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "lkjsf98398",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
        },
        {
          title: "Similarity of Triangles",
          concepts: [
            {
              name: "concept of triangles",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              name: "concept of triangles 2",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
          questions: [
            {
              _id: "lkjsd987w89",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "9809ujsd98u",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "lsld98w298u",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
        },
      ],
    },
    {
      title: "Chapter 3",
      sections: [
        {
          title: "Linear equations",
          concepts: [
            {
              name: "concept of AP",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              name: "concept of AP 2",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
          questions: [
            {
              _id: "jsdo9s8uiu",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
            {
              _id: "posfdoifu",
              statement:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste eveniet doloribus ullam aliquid. ",
            },
          ],
        },
      ],
    },
  ],
};

export default defineComponent({
  name: "SyllabusDetails",
  props: ["syllabusId"],
  // setup() {
  //   return {
  //     syllabus: sampleSyllabus,
  //   };
  // },
  components: { QuestionForm },
  data() {
    return {
      SHOW_QUESTION_FORM: false,
      SHOW_CONCEPT_FORM: false,
      SHOW_CHAPTER_INPUT: false,
      newChapterName: "",
      SHOW_SECTION_INPUT: false,
      newSectionTitle: "",
      syllabus: null,
      editedSectionTitle: "",
    };
  },
  async mounted() {
    console.log("syllabus id : ", this.syllabusId);
    await this.getSyllabusById();
  },
  methods: {
    async getSyllabusById() {
      // get syllabus detials from id
      let res = await SyllabusApi.getSyllabusById(this.syllabusId);
      this.syllabus = res;
    },

    async addCreatedQuestion(quesiton, section) {
      section.questions.push(quesiton);
      this.SHOW_QUESTION_FORM = false;
      await this.updateSyllabus();
    },

    async updateSyllabus() {
      this.syllabus = await SyllabusApi.updateSyllabus(this.syllabus);
    },

    showConfirmationDialog() {
      // Need to add dialoge to decide if we need to remove the questions and concepts if the chapter or seciton is deleted
    },

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
      });
      this.closeNewSectionInput();
    },

    editSectionTitle(section) {
      section.title = this.editedSectionTitle;
      delete section.editTitle;
    },

    editConcept(concept) {},
    editQuestion(question) {},
  },
});
</script>

<style scoped></style>
