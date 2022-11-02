import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type CartItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}

interface CartSliceState {
    totalPrice: number
    items: CartItemType[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addItem: (state, action: PayloadAction<CartItemType>) => {
                const findItem = state.items.find(el => el.id === action.payload.id)
                if (findItem) {
                    findItem.count++
                } else {
                    state.items.push({
                        ...action.payload, count: 1
                    })
                }

                state.totalPrice = state.items.reduce((sum, el) => {
                    return el.price * el.count + sum
                }, 0)
            },
            minusItem: (state, action: PayloadAction<string>) => {
                const findItem = state.items.find(el => el.id === action.payload)

                if (findItem) {
                    findItem.count--
                }
            },
            removeItem: (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(el => el.id !== action.payload)
                if (!(state.items.length > 0)) {
                    state.totalPrice = 0
                }
            },
            clearItems: (state) => {
                state.items = []
                state.totalPrice = 0
            }

        }
    }
)

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(el => el.id === id)

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions
export default cartSlice.reducer