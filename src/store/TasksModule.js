import TasksService from "@/service/TasksService";

export const state = {
  boards: [],
  displayedBoard: { default: true },
  boardsFetched: false,
};

export const mutations = {
  storeBoards(state, payload) {
    state.boards = payload;
  },
  setDisplayedBoard(state, payload) {
    const displayedJob = state.boards.find((board) => board.id === payload);
    state.displayedBoard = displayedJob;
  },
  setBoardsFetched(state, payload) {
    state.boardsFetched = payload;
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
    } else {
      commit("setBoardsFetched", false);
      return "";
    }
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
