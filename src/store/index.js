import { createStore } from "vuex";
import getTasks from "@/api/getTasks";
import { Board } from "@/taskmanagement/Boards";

export const OPEN_MOBILE_NAV = "OPEN_MOBILE_NAV";
export const CLOSE_MOBILE_NAV = "CLOSE_MOBILE_NAV";
export const OPEN_DESKTOP_NAV = "OPEN_DESKTOP_NAV";
export const CLOSE_DESKTOP_NAV = "CLOSE_DESKTOP_NAV";

export const SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH";

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const FETCH_TASKS = "FETCH_TASKS";

export const DARKMODE_ON = "DARKMODE_ON";
export const DARKMODE_OFF = "DARKMODE_OFF";

export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const ADD_BOARD = "ADD_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const state = () => {
  return {
    tasks: [],
    darkmode: true,
    nav: {
      mobileNavIsOpen: false,
      desktopNavIsOpen: true,
    },
    windowWidth: 0,
    BoardsList: [],
    modalOpen: false,
  };
};

export const mutations = {
  [OPEN_MOBILE_NAV](state) {
    state.nav.mobileNavIsOpen = true;
  },
  [CLOSE_MOBILE_NAV](state) {
    state.nav.mobileNavIsOpen = false;
  },
  [SET_WINDOW_WIDTH](state, value) {
    state.windowWidth = value;
  },
  [RECEIVE_TASKS](state, value) {
    state.tasks = value;
  },
  [DARKMODE_OFF](state) {
    state.darkmode = false;
  },
  [DARKMODE_ON](state) {
    state.darkmode = true;
  },
  [OPEN_DESKTOP_NAV](state) {
    state.nav.desktopNavIsOpen = true;
  },
  [CLOSE_DESKTOP_NAV](state) {
    state.nav.desktopNavIsOpen = false;
  },
  [RECEIVE_BOARD](state, value) {
    state.tasks.push(value);
  },
  [DELETE_BOARD](state, value) {
    state.tasks = state.tasks.filter((Board) => {
      return Board.name != value;
    });
  },
  [OPEN_MODAL](state) {
    state.modalOpen = true;
  },
  [CLOSE_MODAL](state) {
    state.modalOpen = false;
  },
};

export const actions = {
  async [FETCH_TASKS](context) {
    const tasksObject = await getTasks();
    context.commit(RECEIVE_TASKS, tasksObject);
  },
  [ADD_BOARD](context) {
    const newBoard = new Board("Untitled");
    context.commit(RECEIVE_BOARD, newBoard);
  },
};

export default createStore({
  state,
  mutations,
  actions,
});
