import { api } from "src/boot/axios";

export default {
  async getQuestions() {
    return (await api.get("questions")).data;
  },
  async addQuesiton(body) {
    return (await api.post("questions", body)).data;
  },
};
