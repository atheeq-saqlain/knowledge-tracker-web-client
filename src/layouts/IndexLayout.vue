<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Learning Tracker App </q-toolbar-title>
        <logout-button></logout-button>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import LogoutButton from "src/components/authentication/LogoutButton.vue";

const linksList = [
  {
    title: "Test page",
    caption: "test componets here",
    icon: "school",
    link: "/index/test-component",
  },
  {
    title: "Syllabus",
    caption: "Manage syllabus",
    icon: "code",
    link: "/index/syllabus",
  },
  {
    title: "Students",
    caption: "View and manage students",
    icon: "chat",
    link: "/index/students",
  },
  {
    title: "Concepts",
    caption: "View and manage concepts",
    icon: "record_voice_over",
    link: "/index/concepts",
  },
  {
    title: "Subjects",
    caption: "Veiw and manage Subjects",
    icon: "rss_feed",
    link: "/index/subjects",
  },
  {
    title: "Learn",
    caption: "Manage and track learning",
    icon: "school",
    link: "/index/learning",
  },
  {
    title: "Questions",
    caption: "Manage questions",
    icon: "question_answer",
    link: "/index/questions",
  },
];

export default defineComponent({
  name: "IndexLayout",

  components: {
    EssentialLink,
    LogoutButton,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
