<template>
  <q-layout view="hHh lpR fFf">
    <q-header secondary>
      <q-toolbar>
        <q-toolbar-title> Learning Tracker App </q-toolbar-title>
        <q-btn @click="goToLoginPage()">Login</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- <router-view /> -->
      <IndexPage></IndexPage>
    </q-page-container>
  </q-layout>
</template>

<script>
import IndexPage from "src/pages/IndexPage.vue";

export default {
  components: { IndexPage },
  methods: {
    goToLoginPage() {
      try {
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
