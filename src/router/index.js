import Vue from 'vue';
import VueRouter from 'vue-router';
import Locations from '../views/Locations.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/locations',
    },
    {
        path: '/locations',
        name: 'Locations',
        component: Locations,
        children: [{
            path: ':id',
            component: () => import('../components/Weather.vue'),
        },
        ],
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
