import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    selectedSort: {
        name: 'популярности',
        sortValue: 'rating'
    }
}

export const filterSlice = createSlice({
        name: 'filters',
        initialState,
        reducers: {
            setCategoryId: (state, action) => {
                state.categoryId = action.payload
            },
            setSearchValue: (state, action) => {
                state.searchValue = action.payload
            },
            setSelectedSort: (state, action) => {
                state.selectedSort = action.payload
            },
            setCurrentPage: (state, action) => {
                state.currentPage = action.payload
            },
            setFilters: (state, action) => {
                state.currentPage = Number(action.payload.currentPage)
                state.selectedSort = action.payload.selectedSort
                state.categoryId = Number(action.payload.categoryId)
            },
        }
    }
)

export const selectFilter = (state) => state.filter
export const selectFilterSelectedSort = state => state.filter.selectedSort

export const {setCategoryId, setSelectedSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions
export default filterSlice.reducer