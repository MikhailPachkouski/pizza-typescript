import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export enum SortList {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title'
}

export type SortType = {
    name: string
    sortValue: SortList // 'rating' | 'price' | 'title'
}

export interface FilterSliceState {
    searchValue: string
    categoryId: number
    currentPage: number
    selectedSort: SortType
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    selectedSort: {
        name: 'популярности',
        sortValue: SortList.RATING //'rating'
    }
}

export const filterSlice = createSlice({
        name: 'filters',
        initialState,
        reducers: {
            setCategoryId: (state, action: PayloadAction<number>) => {
                state.categoryId = action.payload
            },
            setSearchValue: (state, action: PayloadAction<string>) => {
                state.searchValue = action.payload
            },
            setSelectedSort: (state, action: PayloadAction<SortType>) => {
                state.selectedSort = action.payload
            },
            setCurrentPage: (state, action: PayloadAction<number>) => {
                state.currentPage = action.payload
            },
            setFilters: (state, action: PayloadAction<FilterSliceState>) => {
                state.currentPage = Number(action.payload.currentPage)
                state.selectedSort = action.payload.selectedSort
                state.categoryId = Number(action.payload.categoryId)
            },
        }
    }
)

export const selectFilter = (state: RootState) => state.filter
export const selectFilterSelectedSort = (state: RootState) => state.filter.selectedSort

export const {setCategoryId, setSelectedSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions
export default filterSlice.reducer