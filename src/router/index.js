import VueRouter from "vue-router";
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

export default router;
