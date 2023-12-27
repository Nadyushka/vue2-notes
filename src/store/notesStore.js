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

                if (typeof error.response.data.message === "string") {
                    commit('SET_ERROR', error.response.data.message)
                } else {
                    commit('SET_ERROR', error.response.data.message[0])
                }
            }
        },

        async createNote({commit}, payload) {
            try {
                await instance.post('/notes', {...payload})

                const response = await instance.get('/notes')

                commit('SET_NOTES', response.data)

                return response
            } catch (error) {
                if (typeof error.response.data.message === "string") {
                    commit('SET_ERROR', error.response.data.message)
                } else {
                    commit('SET_ERROR', error.response.data.message[0])
                }
            }
        },

        async deleteNote({commit}, noteId) {
            try {
                await instance.delete(`/notes/${noteId}`)

                const response = await instance.get('/notes')

                commit('SET_NOTES', response.data)

                return response
            } catch (error) {
                if (typeof error.response.data.message === "string") {
                    commit('SET_ERROR', error.response.data.message)
                } else {
                    commit('SET_ERROR', error.response.data.message[0])
                }
            }
        },


    },

    mutations: {
        SET_NOTES (state, data) {
            state.notes = data;
        },

    }
}

