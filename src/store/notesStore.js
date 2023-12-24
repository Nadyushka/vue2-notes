import {instance} from "@/utils/axios";

export default {
    namespaced: true,

    state() {
        return {
            notes: [],
        }
    },

    getters: {
        getNotes(state) {
            return state.notes
        },
    },

    actions: {
        async getNotes({commit}) {
            try {
                const response = await instance.get('/notes')

                commit('SET_NOTES', response.data)

                return response
            } catch (error) {
                console.error(error);
                commit('SET_ERROR', error.message)
            }
        },


    },

    mutations: {
        SET_NOTES (state, data) {
            state.notes = data;
        },

    }
}

