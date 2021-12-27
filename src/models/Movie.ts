import {BaseEntity} from "./BaseEntity";

export class Movie extends BaseEntity {
    // @ts-ignore
    public adult: boolean;
    // @ts-ignore
    public backdrop_path: string;
    // @ts-ignore
    public genre_ids: number[];
    // @ts-ignore
    public id: number;
    // @ts-ignore
    public original_language: string;
    // @ts-ignore
    public original_title: string;
    // @ts-ignore
    public overview: string;
    // @ts-ignore
    public popularity: number;
    // @ts-ignore
    public poster_path: string;
    // @ts-ignore
    public release_date: string;
    // @ts-ignore
    public title: string;
    // @ts-ignore
    public video: boolean;
    // @ts-ignore
    public vote_average: number;
    // @ts-ignore
    public vote_count: number;
}