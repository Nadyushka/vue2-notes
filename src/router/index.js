import VueRouter from "vue-router";
// import {authGuard} from "@/router/authGuard/authGuard.js";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "AuthPage",
        component: async () => import("@/views/AuthPage.vue"),
        meta: {
            layout: 'auth',
        },
    },
    {
        path: "/home",
        name: "HomePage",
        component: async () => import("@/views/HomePage.vue"),
        meta: {
            layout: 'default',
        },
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// router.beforeEach(authGuard)

export default router;
