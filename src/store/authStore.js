import axios from "axios";
import {instance} from "@/utils/axios";

export default {
    namespaced: true,

    state() {
        return {
            isAuth: false,
            errorMessage: null,
            userEmail: null,
        }
    },

    getters: {
        isUserAuth(state) {
            return state.isAuth
        },

        getUserEmail(state) {
            return state.userEmail
        },

        getErrorMessage(state) {
            return state.errorMessage
        }
    },

    actions: {
        async me({commit}) {
            try {
                const response = await instance.get('/auth')
                commit('SET_AUTH', true);
                commit('SET_EMAIL', response.data.email)

                return response
            } catch (error) {
                if (typeof error.response.data.message === "string") {
                    commit('SET_ERROR', error.response.data.message)
                } else {
                    commit('SET_ERROR', error.response.data.message[0])
                }
            }
        },

        async signUp({commit}, payload) {
            try {
                const response = await axios.post('https://dist.nd.ru/api/reg', { ...payload})
                commit('SET_AUTH', true);
                commit('SET_EMAIL', response.data.email)

                return response
            } catch (error) {
                if (typeof error.response.data.message === "string") {
                    commit('SET_ERROR', error.response.data.message)
                } else {
                    commit('SET_ERROR', error.response.data.message[0])
                }
            }
        },

        async signIn({commit}, payload) {
            try {
                const response = await axios.post('https://dist.nd.ru/api/auth', { ...payload})

                commit('SET_AUTH', true);
                commit('SET_EMAIL', payload.email)
                localStorage.setItem('accessToken', response.data.accessToken)

                return response
            } catch (error) {
                if (typeof error.response.data.message === "string") {
                    commit('SET_ERROR', error.response.data.message)
                } else {
                    commit('SET_ERROR', error.response.data.message[0])
                }

            }
        },


        async logOut({commit}) {
            try {
                await instance.delete('/auth')
                commit('SET_AUTH', false);

                localStorage.removeItem('accessToken')

            } catch (error) {
                console.error(error);
                commit('SET_ERROR', error.message)
            }
        },
    },

    mutations: {
        SET_AUTH(state, data) {
            state.isAuth = data;
        },
        SET_EMAIL(state, data) {
            state.userEmail = data;
        },
        SET_ERROR(state, data) {
            state.errorMessage = data
        }
    }
}
