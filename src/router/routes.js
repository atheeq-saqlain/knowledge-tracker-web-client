// pages
const IndexPage = { path: "", component: () => import("pages/IndexPage.vue") };
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
const TestComponentPage = { path: "test-component", component: () => import("pages/TestComponents.vue") };

const routes = [
  {
    // Landing page layout
    path: "/",
    component: () => import("layouts/IndexLayout.vue"),
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [IndexPage, StudentsManager, SyllabusManager, ConceptsPage, TestComponentPage],
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/content-moderator",
  //   component: () => import("layouts/ContentModeratorLayout.vue"),
  //   children: [
  //     IndexPage,
  //     {
  //       path: "syllabus",
  //       component: () => import("pages/SyllabusManager.vue"),
  //       children: [
  //         { path: "", component: () => import("components/syllabus/SyllabusList.vue") },
  //         {
  //           path: "edit/:id",
  //           name: "edit-syllabus",
  //           component: () => import("components/syllabus/SyllabusDetails.vue"),
  //         },
  //       ],
  //     },
  //   ],
  //   meta: { requiresAuth: true },
  // },
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
