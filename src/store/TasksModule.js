import TasksService from "@/service/TasksService";

export const state = {
  boards: [],
  displayedBoard: { default: true },
  boardsFetched: false,
  functionality: {
    addBoard: false,
    addTask: false,
    viewTask: false,
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
  },
  setFunctionalityOn(state, payload) {
    state.functionality[payload] = true;
  },
  setFunctionalityOff(state, payload) {
    state.functionality[payload] = false;
  },
};

export const actions = {
  async fetchTasks({ commit }) {
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
        let firstBoard = response.data[0].id;
        commit("setDisplayedBoard", firstBoard);
      }
    } else {
      commit("setBoardsFetched", false);
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
  async deleteBoard({ dispatch, commit, state }) {
    let deleteBoardId = state.displayedBoard.id;
    const response = await TasksService.deleteBoard(deleteBoardId);
    if (response.status === 200) {
      console.log("Hmmm");
    }
    dispatch("fetchTasks");
    let boardId = state.boards[0].id;
    commit("setDisplayedBoard", boardId);
  },
  async addTask({ dispatch, state }, payload) {
    payload.boardid = state.displayedBoard.id;
    console.log(payload);
    await TasksService.postTask(payload);
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
