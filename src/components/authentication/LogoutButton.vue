<template>
  <div>
    <q-btn flat label="Logout" @click="logout" />
  </div>
</template>

<script>
import router from "src/router";
import AuthenticationApi from "src/services/api/Authentication.api";
import { userStore } from "src/stores/user-store";
const UserStore = userStore();
export default {
  name: "LogoutButton",
  methods: {
    async logout() {
      try {
        await AuthenticationApi.logout();
        UserStore.user = null;
        UserStore.isAuthenticated = false;
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
