import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SingleMovie from "~/pages/SingleMoviePage.vue";
import Movies from "~/pages/MoviesPage.vue";

const routes:  RouteRecordRaw[] = [
    { path: '/movies', component: Movies, name: 'movies' },
    { path: '/movies/:movie', component: SingleMovie, name: 'single-movie' },
    { path: '/', redirect: '/movies' }
];

const router =  createRouter({
    history: createWebHistory(),
    routes,
});

export default router;