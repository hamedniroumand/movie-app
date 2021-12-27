import {BaseEntity} from "./BaseEntity";

export class PaginatedData<TEntity extends BaseEntity> {
    // @ts-ignore
    public page: number
    // @ts-ignore
    public results: TEntity[];
    // @ts-ignore
    public total_pages: number;
    // @ts-ignore
    public total_results: number;
}