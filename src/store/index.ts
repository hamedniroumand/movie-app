import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import {Genres} from "../models/Genres";
import httpService from "../services/HttpService";
import {GenresResponse} from "../definations/interfaces";

export interface State {
    genres: Genres[],
    loading: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        genres: [],
        loading: false,
    },
    getters: {
        genres: state => state.genres,
        loading: state => state.loading,
    },
    actions: {
        changeLoadingState({ commit }, state: boolean) {
            commit('CHANGE_LOADING_STATE', state)
        },
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
        CHANGE_LOADING_STATE(store, state) {
            store.loading = state;
        },
        SET_GENRES(store, payload: Genres[]) {
            store.genres = payload;
        },
        FIND_GENRE(store, payload: number) {
            return store.genres.find(g => g.id === payload);
        }
    }
})