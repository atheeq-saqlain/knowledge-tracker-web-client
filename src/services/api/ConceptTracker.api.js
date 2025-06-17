import { api } from "src/boot/axios";

export default {
  async addConceptTracker(conceptTracker) {
    return (await api.post("concepts-tracker", conceptTracker)).data;
  },

  async getSubjcetLearning(payload) {
    return (await api.post(`concepts-tracker/subject/learn`, payload)).data;
  },
};
