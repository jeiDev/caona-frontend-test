export interface IGeneralPaginationResponse {
    pageParam: string
    pageSizeParam: string
    forcePageParam: boolean
    route?: string
    params?: string
    urlManager?: string
    validatePage:boolean
    totalCount: number
    defaultPageSize: number
    pageSizeLimit: number[]
}