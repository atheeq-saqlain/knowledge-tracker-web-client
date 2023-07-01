import { api } from "src/boot/axios";

export default {
  async loginWithPassword(data) {
    return (
      await api.post("users/login", {
        username: data.username,
        password: data.password,
      })
    ).data;
  },

  async logout() {
    return await api.delete("users/logout");
  },

  async getLoggedInUser() {
    return (await api.get("users/loggedin")).data;
  },
};
