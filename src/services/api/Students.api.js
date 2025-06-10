import { api } from "src/boot/axios";

export default {
  async createStudent(studentData) {
    return (await api.post("students", studentData)).data;
  },

  async getStudentByUser(userId) {
    return (await api.get(`students/user/${userId}`)).data;
  },

  async getStudents() {
    return (await api.get("students")).data;
  },

  async getStudentById(id) {
    return (await api.get(`students/${id}`)).data;
  },

  async updateStudent(id, studentData) {
    return (await api.put(`students/${id}`, studentData)).data;
  },

  async deleteStudent(id) {
    await api.delete(`students/${id}`);
  },
};
