import { api } from "src/boot/axios";

export default {
  async getQuestions() {
    return (await api.get("questions")).data;
  },
  async getQuestionById(id) {
    return (await api.get(`questions/${id}`)).data;
  },
  async addQuesiton(body) {
    return (await api.post("questions", body)).data;
  },
  async updateQuestion(body, id) {
    return (await api.put(`questions/${id}`, body)).data;
  },
};
