import { api } from "src/boot/axios";

export default {
  listEducationBoard() {
    return api.get("education-board");
  },
};
