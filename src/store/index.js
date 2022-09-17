import { createStore } from "vuex";
// import getTasks from "@/api/getTasks";
import { Board } from "@/taskmanagement/Boards";
import tasksJson from "@/data.json";
import getDefaultColorScheme from "@/helper/getDefaultTheme";

import TasksModule from "./TasksModule";

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
    infoScreenDisplayed: false,
  };
};

export const mutations = {
  setInfoScreen(state) {
    // let displayScreen = JSON.parse(sessionStorage.getItem("info-displayed"));
    // if (!displayScreen) {
    //   state.infoScreenDisplayed = true;
    //   sessionStorage.setItem("info-displayed", true);
    // } else {
    //   state.infoScreenDisplayed = false;
    //   sessionStorage.setItem("info-displayed", true);
    // }
    state.infoScreenDisplayed = false;
  },
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
    localStorage.setItem("kanban-theme", false);
  },
  [DARKMODE_ON](state) {
    state.darkmode = true;
    localStorage.setItem("kanban-theme", true);
  },
  setDarkMode(state, payload) {
    state.darkmode = payload.scheme === "dark" ? true : false;
    if (payload.override) {
      localStorage.setItem("kanban-theme", payload.scheme);
    }
    /////////

    document.getElementsByTagName("HTML")[0].classList.remove("light");
    document.getElementsByTagName("HTML")[0].classList.remove("dark");
    document.getElementsByTagName("HTML")[0].classList.add(payload.scheme);
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
  [FETCH_TASKS](context) {
    // const tasksObject = await getTasks();
    const tasksObject = tasksJson.boards;
    context.commit(RECEIVE_TASKS, tasksObject);
  },
  [ADD_BOARD](context) {
    const newBoard = new Board("Untitled");
    context.commit(RECEIVE_BOARD, newBoard);
  },
  fetchDefaultTheme({ commit }) {
    let savedScheme = localStorage.getItem("kanban-theme");
    let schemeObject = {};
    if (savedScheme) {
      schemeObject.scheme = savedScheme;
      schemeObject.override = false;
    } else {
      schemeObject.scheme = getDefaultColorScheme();
      schemeObject.override = false;
    }
    commit("setDarkMode", schemeObject);
  },
};

export const modules = { TasksModule };

export default createStore({
  state,
  mutations,
  actions,
  modules,
});
