/* 
    Slice para el estado global de los pedidos

    - Contiene todos los pedidos
    - Expone actions:
        - Agregar pedidos
        - Actualizar el estado del pedido
        - Actualizar el Filtro de los pedidos

*/

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrdersState } from "../../types";

const initialState: OrdersState = {
    orders: [],
    filter: 'all'
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload)
        },

        updateOrderStatus: (state, action) => {
            const order = state.orders.find(order => order.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    },
});

export const { addOrder, updateOrderStatus, setFilter } = ordersSlice.actions;
export default ordersSlice.reducer;

