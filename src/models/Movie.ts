import { Company, Contry, Language } from "../definations/interfaces";
import { BaseEntity } from "./BaseEntity";
import { Genres } from "./Genres";

export class Movie extends BaseEntity {
    public adult: boolean;
    public backdrop_path: string;
    public genre_ids: number[];
    public id: number;
    public original_language: string;
    public original_title: string;
    public overview: string;
    public popularity: number;
    public poster_path: string;
    public release_date: string;
    public title: string;
    public video: boolean;
    public vote_average: number;
    public vote_count: number;
}

export class FullMovieData extends Movie {
    public budget: number;
    public genres: Genres[];
    public homepage: string;
    public imdb_id: string;
    public production_companies: Company[];
    public production_countries: Contry[];
    public revenue: number;
    public runtime: number;
    public spoken_languages: Language[];
    public status: string;
    public tagline: string;
}