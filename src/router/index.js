import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import TodoListPage from "../pages/TodoListPage.vue";

const routes = [
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/register",
        component: RegisterPage,
    },
    {
        path: "/",
        component: TodoListPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
