<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-tree accordion :nodes="subjects" node-key="name" label-key="name" @lazy-load="onLazyLoad">
      <template v-slot:default-header="prop">
        <div class="col-8">
          <q-item-section>{{ prop.node.name }}</q-item-section>
        </div>
        <div class="col-2">
          <q-btn v-on:click.stop="initiateSubjectUpdate(prop.node)" icon="edit" dense flat></q-btn>
          <q-btn v-on:click.stop="deleteSubject(prop.node)" icon="delete" dense flat></q-btn>
        </div>
      </template>

      <template v-slot:header-new="prop">
        <q-btn v-on:click.stop="initiateSubjectCreation(prop.node)" icon="add" dense flat>Create Subject</q-btn>
      </template>
    </q-tree>

    <q-dialog v-model="SHOW_EDIT_SUBJECT_FORM">
      <q-card style="width: 80vw">
        <q-card-section>
          <subject-form
            :existing-subject="selectedSubject"
            class="col-10"
            v-on:subjectUpdated="onSubjectUpdated"
          ></subject-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="SHOW_CREATE_SUBJECT_FORM">
      <q-card style="width: 80vw">
        <q-card-section>
          <subject-form
            :default-parent-subject="parentSubjectForCreation"
            class="col-10"
            v-on:subjectCreated="onSubjectCreated"
          ></subject-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import SubjectsApi from "src/services/api/Subjects.api";
import SubjectForm from "./SubjectForm.vue";

export default {
  name: "ListSubjects",

  data() {
    return {
      subjects: [],
      SHOW_EDIT_SUBJECT_FORM: false,
      SHOW_CREATE_SUBJECT_FORM: false,
      selectedSubject: null,
      parentSubjectForCreation: null,
    };
  },

  components: {
    SubjectForm,
  },

  async mounted() {
    let subjects = await this.getRootSubjects();
    subjects.forEach((sub) => {
      sub.lazy = true;
    });
    subjects.push({ header: "new", lazy: false });
    this.subjects = subjects;
  },

  methods: {
    onSubjectCreated(subject) {
      subject.lazy = true;
      let parentSubject = this.parentSubjectForCreation;
      if (parentSubject) {
        let newSubject = parentSubject.children.pop();
        parentSubject.children.push(subject);
        parentSubject.children.push(newSubject);
      } else {
        let newsub = this.subjects.pop();
        this.subjects.push(subject);
        this.subjects.push(newsub);
      }
      this.SHOW_CREATE_SUBJECT_FORM = false;
      this.parentSubjectForCreation = null;
    },

    onSubjectUpdated(subject) {
      this.SHOW_EDIT_SUBJECT_FORM = false;
      Object.assign(this.selectedSubject, subject);
      this.selectedSubject = null;
    },

    async onLazyLoad({ node: subject, done }) {
      let childrenSubjects = await this.getChildrenSubjects(subject._id);
      childrenSubjects.forEach((childSubject) => {
        childSubject.lazy = true;
        childSubject.parentSubject = subject;
      });
      childrenSubjects.push({ header: "new", lazy: false, parentSubject: subject });
      done(childrenSubjects);
    },

    initiateSubjectCreation(subject) {
      this.parentSubjectForCreation = subject.parentSubject;
      this.SHOW_CREATE_SUBJECT_FORM = true;
    },

    initiateSubjectUpdate(subject) {
      this.selectedSubject = subject;
      this.SHOW_EDIT_SUBJECT_FORM = true;
    },

    async deleteSubject(subject) {
      await SubjectsApi.deleteSubject(subject._id);
      if (subject.parentSubject) {
        subject.parentSubject.children.splice(subject.parentSubject.children.indexOf(subject), 1);
      } else {
        this.subjects.splice(this.subjects.indexOf(subject), 1);
      }
    },

    async getRootSubjects() {
      return await SubjectsApi.getRootSubjects();
    },

    async getChildrenSubjects(parentId) {
      return await SubjectsApi.getChildrenSubjects(parentId);
    },
  },
};
</script>

<style scoped></style>
