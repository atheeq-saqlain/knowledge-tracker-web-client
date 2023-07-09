const routes = [
  {
    // Landing page layout
    path: "/",
    component: () => import("layouts/IndexLayout.vue"),
  },
  {
    path: "/admin",
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
    meta: { requiresAuth: true },
  },
  {
    path: "/content-moderator",
    component: () => import("layouts/ContentModeratorLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "syllabus",
        component: () => import("pages/SyllabusManager.vue"),
      },
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
