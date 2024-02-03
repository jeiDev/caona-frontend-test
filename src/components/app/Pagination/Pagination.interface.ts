export interface IPaginationProps{
    totalItems: number
    itemsPage: number
    onPageChange: (page: number) => void
}