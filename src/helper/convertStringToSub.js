import TaskRequest from "@/model/TasksRequest";

export function convertStringTosub(stringArray) {
  var output = [];
  stringArray.forEach((string) => {
    let newSub = TaskRequest.postSubtasks;
    newSub.title = string;
    output.push(newSub);
  });
  return output;
}
