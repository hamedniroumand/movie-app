import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import {Genres} from "../models/Genres";
import httpService from "../services/HttpService";
import {GenresResponse} from "../definations/interfaces";

export interface State {
    genres: Genres[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        genres: [],
    },
    getters: {
        genres: state => state.genres,
    },
    actions: {
        async initialGenres({ commit, state }) {
            if (state.genres.length) {
                return state.genres;
            }
            const genresResponse = await httpService.get('/genre/movie/list');
            const { genres } = genresResponse.data as GenresResponse;
            commit('SET_GENRES', genres);
            return genres;
        },
        findGenre({ commit }, payload: number) {
            commit('FIND_GENRE', payload);
        }
    },
    mutations: {
        SET_GENRES(state, payload: Genres[]) {
            state.genres = payload;
        },
        FIND_GENRE(state, payload: number) {
            return state.genres.find(g => g.id === payload);
        }
    }
})