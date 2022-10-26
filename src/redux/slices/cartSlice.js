import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addItem: (state, action) => {
                const findItem = state.items.find(el => el.id === action.payload.id)
                if (findItem) {
                    findItem.count ++
                } else {
                    state.items.push({
                        ...action.payload, count :1
                    })
                }

                state.totalPrice = state.items.reduce((sum, el) => {
                    return el.price * el.count + sum
                }, 0 )
            },
            minusItem: (state, action) => {
                const findItem = state.items.find(el => el.id === action.payload.id)

                if (findItem) {
                    findItem.count --
                }
            },
            removeItem: (state, action) => {
               state.items = state.items.filter(el => el.id !== action.payload)
                if (!state.items.length > 0) {
                    state.totalPrice = 0
                }
            },
            clearItems: (state, action) => {
                state.items = []
                state.totalPrice = 0
            }

        }
    }
)

export const selectCart = state => state.cart
export const selectCartItemById = id => state => state.cart.items.find(el => el.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions
export default cartSlice.reducer