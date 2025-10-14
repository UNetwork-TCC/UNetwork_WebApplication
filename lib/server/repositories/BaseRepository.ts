import { Repository } from "@/lib/api-framework/database";
import { ResponseDTO } from "@/lib/api-framework/models";
import { Model, UpdateQuery, FilterQuery, QueryOptions } from "mongoose";

@Repository
export class BaseRepository<T> {
    protected readonly entity: Model<any>;

    constructor(entity: Model<any>) { this.entity = entity }

    async fetchAll(
        query?: FilterQuery<any> | (QueryOptions & { populate?: any; select?: any; lean?: boolean }),
        options: QueryOptions & { populate?: any; select?: any; lean?: boolean } = { limit: 20 }
    ) {
        const knownOptionKeys = new Set(['sort','limit','skip','select','populate','lean','projection','maxTimeMS','collation']);
        let filter: FilterQuery<any> = {};
        let finalOptions: QueryOptions & { populate?: any; select?: any; lean?: boolean } = { ...options };

        if (query && typeof query === 'object' && !Array.isArray(query)) {
            const maybeOptions: any = {};
            const maybeFilter: any = {};
            for (const [k, v] of Object.entries(query)) {
                if (knownOptionKeys.has(k)) maybeOptions[k] = v; else maybeFilter[k] = v;
            }

            if (Object.keys(maybeFilter).length === 0) {
                finalOptions = { ...finalOptions, ...maybeOptions };
            } else {
                filter = maybeFilter as FilterQuery<any>;
                finalOptions = { ...finalOptions, ...maybeOptions };
            }
        }

        let queryBuilder = this.entity.find(filter, null, finalOptions);
        
        if (finalOptions.populate) queryBuilder = queryBuilder.populate(finalOptions.populate as any);
        if (finalOptions.select) queryBuilder = queryBuilder.select(finalOptions.select as any);
        if (finalOptions.lean) queryBuilder = queryBuilder.lean();
        return await queryBuilder as unknown as ResponseDTO<T[]>;
    }
    async findById(id: string) { return await this.entity.findById(id) as unknown as ResponseDTO<T> }
    async create<K = Partial<T>>(data: K) { return await this.entity.create(data) as unknown as ResponseDTO<T> }
    async update(id: string, data: UpdateQuery<T> | Partial<T>) { return await this.entity.findByIdAndUpdate(id, data) as unknown as ResponseDTO<T> }
    async delete(id: string) { return await this.entity.findByIdAndDelete(id) as unknown as ResponseDTO<T> }
}