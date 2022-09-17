import axios from "axios";

export const baseURL = "https://kbapiapp.herokuapp.com/";

export const apiClient = axios.create({
  baseURL: baseURL,
});

export default {
  getBoards(payload) {
    return apiClient.get("api/boards", payload);
  },
  postBoard(payload) {
    return apiClient.post("api/boards", payload);
  },
  deleteBoard(payload) {
    return apiClient.delete("api/boards/" + payload);
  },
  getTasks(payload) {
    return apiClient.get("api/tasks/board/" + payload.boardid, payload);
  },
  postTask(payload) {
    return apiClient.post("api/tasks/add", payload);
  },
  addSubTask(payload) {
    return apiClient.post("api/subtasks/add", payload);
  },
  getSubtasks(payload) {
    return apiClient.post(payload);
  },
  updateTask(payload) {
    return apiClient.put("api/tasks/update/" + payload.id, payload);
  },
  deleteTask(payload) {
    return apiClient.delete("api/tasks/delete/" + payload);
  },
};
