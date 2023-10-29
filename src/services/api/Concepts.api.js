import { api } from "src/boot/axios";

export default {
  async getConcetps() {
    let res = await api.get("concepts");
    return res.data;
  },
  async searchConcepts(searchText) {
    let res = await api.get("concepts/search/" + searchText);
    return res.data;
  },
  async createConcept(concept) {
    let res = await api.post("concepts", concept);
    return res.data;
  },
  async deleteConcept(id) {
    await api.delete("concepts/" + id);
  },
};
