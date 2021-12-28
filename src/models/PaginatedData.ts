import {BaseEntity} from "./BaseEntity";

export class PaginatedData<TEntity extends BaseEntity> {
    public page: number
    public results: TEntity[];
    public total_pages: number;
    public total_results: number;
}