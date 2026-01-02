import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import TodoListPage from "../pages/TodoListPage.vue";
import WeatherPage from "../pages/WeatherPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";

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
    },
    {
        path: "/products",
        component: ProductPage
    },
    {
        path: "/products/:id",
        component: ProductDetailPage,
        name: "product-detail",
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
