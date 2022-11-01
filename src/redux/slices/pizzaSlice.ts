import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzaById',
    async (params) => {
        const {
            currentPage,
            categoryURL,
            sortURL,
            search
        } = params
        const {data} = await axios.get(`https://633dc3e1f2b0e623dc7af0ee.mockapi.io/items?page=${currentPage}&limit=5${categoryURL}&${sortURL}${search}`)

        return data
    }
)

const initialState = {
    items: [],
    status: ''
}
export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }

    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        },

    }
})

export const selectPizza = state => state.pizza

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer