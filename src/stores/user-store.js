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
    async checkLoggedInUserAndRoute() {
      let foundUser;
      try {
        foundUser = await AuthenticationApi.getLoggedInUser();
        if (foundUser) {
          // route to the user home page
          this.router.push("/syllabus");
        } else {
          // route to signin page
        }
      } catch (error) {
        console.log("logged in error : ", error.response);
        if (error.response.status == 401) this.router.push("/login");
      }
      console.log("found user : ", foundUser);
    },
  },
});
