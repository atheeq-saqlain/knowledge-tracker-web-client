import { api } from "src/boot/axios";

export default {
  async searchConcepts(searchText) {
    let res = await api.get("concepts/search/" + searchText);
    return res.data;
  },
};
