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
  static postSubtasks = {
    title: "",
    isCompleted: false,
    boardid: 0,
    tasksid: 0,
  };
}

export default TaskRequest;
