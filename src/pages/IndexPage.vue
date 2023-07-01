<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />
  </q-page>
</template>

<script>
import { userStore } from "src/stores/user-store";
import { defineComponent } from "vue";
const store = userStore();

export default defineComponent({
  name: "IndexPage",

  mounted() {
    // hit the check login api and
    store.checkLoggedInUserAndRoute();
  },
});
</script>
