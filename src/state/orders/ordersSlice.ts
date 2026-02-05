/* 
    Slice para el estado global de los pedidos

    - Contiene todos los pedidos
    - Expone actions:
        - Agregar pedidos
        - Actualizar el estado del pedido
        - Actualizar el Filtro de los pedidos

*/

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrdersState, OrderStatus } from "../../types";

const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD0001',
        tableNumber: 5,
        type: 'local',
        customer: 'Walter White',
        status: 'pending',
        startTime: Date.now() - 1000 * 60 * 5,
        items: [
            { id: 'i1', name: 'Hamburguesa Clásica', quantity: 2, notes: 'Sin pepinillos, doble queso.' },
            { id: 'i2', name: 'Papas Fritas', quantity: 1, notes: 'Sin sal' },
        ],
    },
    {
        id: 'ORD0002',
        tableNumber: 2,
        type: 'local',
        customer: 'Jesse Pinkman',
        status: 'cooking',
        startTime: Date.now() - 1000 * 60 * 15,
        items: [
            { id: 'i3', name: 'Hamburguesa BBQ', quantity: 1 },
            { id: 'i4', name: 'Gaseosa Grande', quantity: 2, notes: 'Coca-Cola' },
        ],
    },
    {
        id: 'ORD0003',
        type: 'delivery',
        customer: 'Saul Goodman',
        status: 'pending',
        startTime: Date.now() - 1000 * 60 * 2,
        items: [
            { id: 'i5', name: 'Combo Familiar', quantity: 1, notes: 'Agregar 2 salsas extras' },
            { id: 'i6', name: 'Alitas Picantes', quantity: 12 },
        ],
    },
    {
        id: 'ORD0004',
        tableNumber: 8,
        type: 'local',
        customer: 'Gustavo Fring',
        status: 'ready',
        startTime: Date.now() - 1000 * 60 * 25,
        items: [
            { id: 'i7', name: 'Pollo a la Brasa', quantity: 1 },
            { id: 'i8', name: 'Ensalada Fresca', quantity: 1, notes: 'Sin tomate' },
        ],
    },
    {
        id: 'ORD0005',
        type: 'takeout',
        customer: 'Mike Ehrmantraut',
        status: 'cooking',
        startTime: Date.now() - 1000 * 60 * 40,
        items: [
            { id: 'i9', name: 'Doble Cheeseburger', quantity: 1 },
            { id: 'i10', name: 'Papas Deluxe', quantity: 1 },
            { id: 'i11', name: 'Malteada de Vainilla', quantity: 1 },
        ],
    },
    {
        id: 'ORD0006',
        type: 'delivery',
        customer: 'Skyler White',
        status: 'pending',
        startTime: Date.now() - 1000 * 60 * 1,
        items: [
            { id: 'i12', name: 'Wrap Mediterráneo', quantity: 1 },
            { id: 'i13', name: 'Limonada Frozen', quantity: 2 },
        ],
    }
];


const initialState: OrdersState = {
    value: MOCK_ORDERS,
    filter: 'all'
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.value.push(action.payload)
        },

        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
            const order = state.value.find(order => order.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
            }
        },

        setFilter: (state, action: PayloadAction<OrderStatus | 'all'>) => {
            state.filter = action.payload;
        }
    },
});

export const { addOrder, updateOrderStatus, setFilter } = ordersSlice.actions;
export default ordersSlice.reducer;