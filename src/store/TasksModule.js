import TasksService from "@/service/TasksService";

export const state = {
  boards: [],
  displayedBoard: { default: true },
  boardsFetched: false,
  functionality: {
    addBoard: false,
    addTask: false,
    viewTask: false,
    deleteBoard: false,
    editTask: false,
    deleteTask: false,
    editBoard: true,
  },
  displayedTask: { default: true },
};

export const mutations = {
  storeBoards(state, payload) {
    state.boards = payload;
  },
  setDisplayedBoard(state, payload) {
    localStorage.setItem("kanban-last-displayed", payload);
    const displayedBoard = state.boards.find((board) => board.id === payload);
    state.displayedBoard = displayedBoard;
  },
  setDisplayedTask(state, payload) {
    const displayedTask = state.displayedBoard.tasks.find(
      (task) => task.id == payload
    );
    state.displayedTask = displayedTask;
  },
  setBoardsFetched(state, payload) {
    state.boardsFetched = payload;
  },
  turnOffAllFunctions(state) {
    state.functionality.addBoard = false;
    state.functionality.addTask = false;
    state.functionality.viewTask = false;
    state.functionality.deleteBoard = false;
    state.functionality.editTask = false;
    state.functionality.editBoard = false;
  },
  setFunctionalityOn(state, payload) {
    state.functionality[payload] = true;
  },
  setFunctionalityOff(state, payload) {
    state.functionality[payload] = false;
  },
  clearApp(state) {
    state.boards = [];
    state.displayedBoard = { default: true };
    state.boardsFetched = false;
    state.functionality = {
      addBoard: false,
      addTask: false,
      viewTask: false,
      deleteBoard: false,
      editTask: false,
      deleteTask: false,
      editBoard: false,
    };
    state.displayedTask = { default: true };
  },
};

export const actions = {
  async fetchTasks({ commit }) {
    commit("clearApp");
    const response = await TasksService.getBoards({
      empty: true,
    });
    if (response.status === 200) {
      commit("storeBoards", response.data);
      commit("setBoardsFetched", true);
      let lastBoardId = localStorage.getItem("kanban-last-displayed");
      let formerBoard = response.data.find((board) => board.id == lastBoardId);
      if (formerBoard) {
        commit("setDisplayedBoard", formerBoard.id);
      } else {
        if (response.data[0].id != undefined) {
          let firstBoard = response.data[0].id;
          commit("setDisplayedBoard", firstBoard);
        } else {
          commit("setDisplayedBoard", { default: true });
        }
      }
    } else {
      commit("setBoardsFetched", { default: true });
      return "";
    }
  },
  async addBoard({ dispatch }, payload) {
    await TasksService.postBoard(payload);
    dispatch("fetchTasks");
  },
  turnFunctionalityOn({ commit }, payload) {
    commit("turnOffAllFunctions");
    commit("setFunctionalityOn", payload);
  },
  turnFunctionalityOff({ commit }, payload) {
    commit("setFunctionalityOff", payload);
    commit("turnOffAllFunctions");
  },
  async deleteBoard({ dispatch, state }) {
    let deleteBoardId = state.displayedBoard.id;
    const response = await TasksService.deleteBoard(deleteBoardId);
    if (response.status === 200) {
      dispatch("fetchTasks");
      // let boardId = state.boards[0].id;
      // commit("setDisplayedBoard", boardId);
    } else {
      dispatch("fetchTasks");
      // let boardId = state.boards[0].id;
      // commit("setDisplayedBoard", boardId);
    }
  },
  async addTask({ dispatch, state }, payload) {
    payload.boardid = state.displayedBoard.id;
    await TasksService.postTask(payload);
    dispatch("fetchTasks");
  },
  async updateTask({ state }, payload) {
    await TasksService.updateTask(payload);
    // dispatch("fetchTasks");
    state;
  },
  async postMultipleSubs({ state }, payload) {
    // console.log("module", payload);
    if (payload.length >= 1) {
      payload.forEach(async (sub) => {
        // console.log("addsub", sub);
        await TasksService.addSubTask(sub);
      });
    }
    state;
  },
  async deleteTask({ dispatch, state }) {
    let deleteTaskId = state.displayedTask.id;
    await TasksService.deleteTask(deleteTaskId);
    dispatch("fetchTasks");
  },
  async updateBoard({ dispatch, state }, payload) {
    let id = state.displayedBoard.id;
    await TasksService.updateBoard(id, payload);
    dispatch("fetchTasks");
  },
  async deleteSubtasks({ dispatch, state }, payload) {
    // console.log("we here", payload);
    let existingArray = [];
    state.displayedTask.subtasks.forEach((sub) => {
      existingArray.push(sub);
    });
    let deleteArray = payload.filter((sub) => {
      return !existingArray.includes(sub);
    });
    function getEntryId(entry) {
      // console.log(state.displayedTask.subtasks);
      let entryId = state.displayedTask.subtasks.reduce((idg, sub) => {
        if (sub.title === entry) {
          return (idg = sub.id);
        }
      }, 0);
      return entryId;
    }
    // console.log("delete", deleteArray);
    deleteArray.forEach(async (del) => {
      let id = getEntryId(del);
      await TasksService.deleteSub(id);
    });
    dispatch("fetchTasks");
  },
};
export const namespaced = true;

export const TasksModule = {
  state,
  mutations,
  actions,
  namespaced,
};

export default TasksModule;
