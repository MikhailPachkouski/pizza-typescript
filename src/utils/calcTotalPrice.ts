import {CartItemType} from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, el) => {
        return el.price * el.count + sum
    }, 0)
}