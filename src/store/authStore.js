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

        getToken(state) {
            return state.accessToken
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
                console.error(error);
                commit('SET_ERROR', error.message)
            }
        },

        async signUp({commit}, payload) {
            try {
                const response = await axios.post('https://dist.nd.ru/api/reg', { ...payload})
                commit('SET_AUTH', true);
                commit('SET_EMAIL', response.data.email)

                return response
            } catch (error) {
                console.error(error);
                commit('SET_ERROR', error.message)
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
                console.error(error);
                commit('SET_ERROR', error.message)
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
