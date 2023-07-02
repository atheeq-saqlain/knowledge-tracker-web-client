import { defineStore } from "pinia";
import AuthenticationApi from "src/services/api/Authentication.api";

export const userStore = defineStore("user", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async checkLoggedInUser() {
      try {
        this.user = await AuthenticationApi.getLoggedInUser();
        this.isAuthenticated = true;
        return this.user;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async checkLoggedInUserAndRouteToUserHome() {
      let foundUser;
      try {
        foundUser = await this.checkLoggedInUser();
        if (foundUser) {
          // route to the user home page based on role
          this.router.push("/admin/syllabus");
        } else {
          // route to signin page
        }
      } catch (error) {
        console.log("logged in error : ", error.response);
        // if (error.response.status == 401) this.router.push("/login");
      }
    },
  },
});
