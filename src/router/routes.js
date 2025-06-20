// pages
const LandingPage = { path: "", component: () => import("src/pages/LandingPage.vue") };
const LoginPage = { path: "login", component: () => import("pages/LoginPage.vue") };
const SyllabusManager = {
  path: "syllabus",
  component: () => import("pages/SyllabusManager.vue"),
  children: [
    { path: "", component: () => import("components/syllabus/SyllabusList.vue") },
    {
      path: "edit/:id",
      name: "edit-syllabus",
      component: () => import("components/syllabus/SyllabusDetails.vue"),
    },
  ],
};
const StudentsManager = {
  path: "students",
  component: () => import("src/pages/StudentsPage.vue"),
  children: [
    { path: "", component: () => import("components/students/StudentsManager.vue") },
    {
      path: "details/:id",
      name: "student-details",
      component: () => import("components/students/StudentDetails.vue"),
    },
  ],
};
const ConceptsPage = {
  path: "concepts",
  component: () => import("pages/concept/ConceptsPage.vue"),
  children: [
    { path: "", component: () => import("pages/concept/ConceptsList.vue") },
    {
      path: "edit/:id",
      name: "edit-concept",
      component: () => import("pages/concept/EditConcept.vue"),
    },
  ],
};

const SubjectsPage = {
  path: "subjects",
  component: () => import("pages/SubjectsPage.vue"),
  children: [{ path: "", component: () => import("src/components/subjects/SubjectTree.vue") }],
};

const QuestionsPage = {
  path: "questions",
  component: () => import("pages/QuestionsManagementPage.vue"),
  children: [
    { path: "", component: () => import("src/components/questions/ListQuestions.vue") },
    {
      path: "edit/:questionId",
      name: "edit-question",
      component: () => import("src/components/questions/EditQuestion.vue"),
    },
    {
      path: "create",
      name: "create-question",
      component: () => import("src/components/questions/CreateQuestion.vue"),
    },
  ],
};

const LearningManagementPage = {
  path: "learning",
  component: () => import("pages/LearningManagementPage.vue"),
  children: [
    { path: "", component: () => import("src/components/students/StudentSubjectsList.vue") },
    {
      name: "learning-subject",
      path: "subject/:subjectId",
      component: () => import("src/components/students/LearnSubject.vue"),
    },
    {
      name: "evaluate-question",
      path: "question/:questionId",
      component: () => import("src/components/students/EvaluateQuestion.vue"),
    },
  ],
};
const TestComponentPage = { path: "test-component", component: () => import("pages/TestComponents.vue") };

const routes = [
  {
    // Landing page layout
    path: "/",
    component: () => import("src/layouts/LandingLayout.vue"),
  },
  {
    path: "/index",
    component: () => import("src/layouts/IndexLayout.vue"),
    children: [
      LandingPage,
      StudentsManager,
      SyllabusManager,
      ConceptsPage,
      TestComponentPage,
      SubjectsPage,
      LearningManagementPage,
      QuestionsPage,
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
