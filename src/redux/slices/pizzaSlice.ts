import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";

type FetchPizzasType = Record<string, string>

export const fetchPizzas = createAsyncThunk<PizzaType[], FetchPizzasType>(
    'pizza/fetchPizzaById',
    async (params) => {
        const {
            currentPage,
            categoryURL,
            sortURL,
            search
        } = params
        const {data} = await axios.get<PizzaType[]>(`https://633dc3e1f2b0e623dc7af0ee.mockapi.io/items?page=${currentPage}&limit=5${categoryURL}&${sortURL}${search}`)

        return data
    }
)

type PizzaType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[]
}

enum StatusEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaType[],
    status: StatusEnum
}

const initialState: PizzaSliceState = {
    items: [],
    status: StatusEnum.LOADING
}
export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaType[]>) {
            state.items = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = StatusEnum.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = StatusEnum.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = StatusEnum.ERROR
            state.items = []
        })
    }
    // [fetchPizzas.pending]: (state, action) => {
    //     state.status = 'loading'
    //     state.items = []
    // },
    // [fetchPizzas.fulfilled]: (state, action) => {
    //     state.items = action.payload
    //     state.status = 'success'
    // },
    // [fetchPizzas.rejected]: (state, action) => {
    //     state.status = 'error'
    //     state.items = []
    // },


})

export const selectPizza = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer