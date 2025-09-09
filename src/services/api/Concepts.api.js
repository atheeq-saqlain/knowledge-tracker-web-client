import { api } from "src/boot/axios";

export default {
  async getConcetps() {
    let res = await api.get("concepts");
    return res.data;
  },
  async getConcetpById(id) {
    let res = await api.get(`concepts/${id}`);
    return res.data;
  },
  async searchConcepts(searchText) {
    let res = await api.get("concepts/search/" + searchText);
    return res.data;
  },

  async filterConcepts(options) {
    let res = await api.post("concepts/filter", options);
    return res.data;
  },

  async createConcept(concept) {
    let res = await api.post("concepts", concept);
    return res.data;
  },
  async updateConcept(id, body) {
    let res = await api.put("concepts/" + id, body);
    return res.data;
  },
  async deleteConcept(id) {
    await api.delete("concepts/" + id);
  },
};
