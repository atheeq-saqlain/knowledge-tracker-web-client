const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "students",
        component: () => import("pages/StudentsManager.vue"),
      },
      {
        path: "syllabus",
        component: () => import("pages/SyllabusManager.vue"),
      },
      {
        path: "test-component",
        component: () => import("pages/TestComponents.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
