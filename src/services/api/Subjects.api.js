import { api } from "src/boot/axios";

export default {
  async getSubjects() {
    return (await api.get("subjects")).data;
  },

  async createSubject(body) {
    return (await api.post("subjects", body)).data;
  },

  async getSubject(subjectId) {
    return (await api.get(`subjects/${subjectId}`)).data;
  },

  async searchSubjects(searchText) {
    return (await api.get(`subjects/search/${searchText}`)).data;
  },

  async updateSubject(subjectId, body) {
    return (await api.put(`subjects/${subjectId}`, body)).data;
  },

  async deleteSubject(subjectId) {
    return (await api.delete(`subjects/${subjectId}`)).data;
  },
};
