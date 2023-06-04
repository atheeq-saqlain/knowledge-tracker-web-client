import { api } from "src/boot/axios";
// import axios from "axios";

export default {
  async getSyllabus() {
    return (await api.get("syllabus")).data;
  },
  async getSyllabusById(id) {
    return (await api.get(`syllabus/${id}`)).data;
  },
  async updateSyllabus(syllabus) {
    return (await api.put(`syllabus/${syllabus._id}`, syllabus)).data;
  },
};
