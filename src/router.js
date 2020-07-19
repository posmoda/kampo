import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Questionnaire from './components/Questionnaire.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/questionnaire', component: Questionnaire }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
