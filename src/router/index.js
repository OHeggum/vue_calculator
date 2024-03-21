// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CalculatorView from '../views/CalculatorView.vue';
import FormView from '../views/FormView.vue';
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/store/authStore.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/calculator',
            component: CalculatorView,
        },
        {
            path: '/contact',
            component: FormView,
            meta: { requiresAuth: true },
        },
        {
            path: '/',
            component: LoginView,
            meta: { requiresAuth: false },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
