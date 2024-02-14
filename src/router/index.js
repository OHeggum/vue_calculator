import { createRouter, createWebHistory} from "vue-router";
import Calculator_view from "../views/CalculatorView.vue";
import FormView from "../views/FormView.vue"

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Calculator_view,
        },
        {
            path: "/contact",
            component: FormView,
        }
    ]
})