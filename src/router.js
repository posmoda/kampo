import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
//import Questionnaire from './components/Questionnaire.vue';
import VisitData from '@/components/VisitData.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    //{ path: '/questionnaire', component: Questionnaire }
    { path: '/visitdata', component: VisitData }
];

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

export default router;
