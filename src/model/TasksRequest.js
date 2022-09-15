class TaskRequest {
  static getBoards = {};
  static postBoard = { name: "" };
  static getTasks = { boardid: 1 };
  static postTasks = {
    title: " UI 2 for onboarding flow",
    description: "",
    status: "DONE",
    boardid: 1,
  };
}

export default TaskRequest;
