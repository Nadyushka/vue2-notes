import Vue from "vue";
import Vuex from "vuex"
import authStore from "@/store/authStore";
import notesStore from "@/store/notesStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authStore,
    notesStore,
  },
})
