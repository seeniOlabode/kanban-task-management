class TaskRequest {
  static getBoards = {};
  static postBoard = { name: "" };
  static getTasks = { boardid: 1 };
  static postTasks = {
    title: "",
    description: "",
    status: "TODO",
    boardid: 1,
  };
}

export default TaskRequest;
