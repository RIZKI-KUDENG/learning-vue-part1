import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import TodoListPage from "../pages/TodoListPage.vue";
import WeatherPage from "../pages/WeatherPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
    {
        path: "/login",
        component: LoginPage,
        meta: {guestOnly : true}
    },
    {
        path: "/register",
        component: RegisterPage,
        meta: {guestOnly : true}
    },
    {
        path: "/",
        component: TodoListPage,
        meta: {requiresAuth : true}
    },
    {
        path: "/weather",
        component: WeatherPage,
        meta: {requiresAuth : true}
    },
    {
        path: "/products",
        component: ProductPage,
        meta: {requiresAuth : true}
    },
    {
        path: "/products/:id",
        component: ProductDetailPage,
        name: "product-detail",
        props: true,
        meta: {requiresAuth : true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();


  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next("/login");
  }


  if (to.meta.guestOnly && auth.isAuthenticated) {
    return next("/");
  }

  next();
});

export default router;
