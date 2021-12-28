import {Genres} from "../models/Genres";

export interface GenresResponse {
    genres: Genres[];
}

export interface Company {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface Contry {
    name: string;
    iso_3166_1: string;
}

export interface Language {
    english_name: string;
    name: string;
    iso_639_1: string;
}