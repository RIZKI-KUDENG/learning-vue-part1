import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import TodoListPage from "../pages/TodoListPage.vue";
import WeatherPage from "../pages/WeatherPage.vue";

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
    },
    {
        path: "/weather",
        component: WeatherPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
