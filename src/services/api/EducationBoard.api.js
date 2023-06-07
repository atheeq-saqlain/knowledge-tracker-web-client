import { api } from "src/boot/axios";

export default {
  async listEducationBoards() {
    return (await api.get("education-board")).data;
  },
};
