<template>
  <div>
    <q-btn flat label="Logout" @click="logout" />
  </div>
</template>

<script>
import router from "src/router";
import AuthenticationApi from "src/services/api/Authentication.api";

export default {
  name: "LogoutButton",
  methods: {
    async logout() {
      try {
        await AuthenticationApi.logout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
