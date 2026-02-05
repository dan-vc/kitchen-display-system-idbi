/* 
    Componente: OrdersFilterBar

    Este componente renderiza una barra de navegación superior que permite
    filtrar la lista de pedidos según su estado (Pendiente, En progreso, 
    Listo, etc...)
*/

import styled from "styled-components";
import type { OrderStatus } from "../types"
import { Button } from "./ui/Button";
import { useDispatch } from "react-redux";
import { setFilter } from "../state/orders/ordersSlice";

// Estilos
const Container = styled.div`
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;
gap: .5rem;

@media (max-width: 600px){
display: grid;
grid-template-columns: 1fr 1fr;
}
`;

const FilterButton = styled(Button)<{$status: OrderStatus | 'all'}>`
padding: .5rem 1rem;
border: 2px solid;
background: transparent;
color: ${props =>
    props.$status === 'ready' ? 'var(--color-ready)' :
    props.$status === 'cooking' ? 'var(--color-cooking)' :
    props.$status === 'pending' ? 'var(--color-pending)' : 
    '#222'};
border-color: ${props =>
    props.$status === 'ready' ? 'var(--color-ready)' :
    props.$status === 'cooking' ? 'var(--color-cooking)' :
    props.$status === 'pending' ? 'var(--color-pending)' : 
    '#222'};
    
&:hover,
&.active{
background: ${props =>
    props.$status === 'ready' ? 'var(--color-ready)' :
    props.$status === 'cooking' ? 'var(--color-cooking)' :
    props.$status === 'pending' ? 'var(--color-pending)' : 
    '#222'};
color: #fff;
}
`;

// Tipado de Props
interface Props {
    actualFilter: OrderStatus | 'all';
}

// Componente Funcional
export const OrdersFilterBar = ({actualFilter} : Props) => {
    const dispatch = useDispatch();

    const filters: { value: OrderStatus | "all"; label: string }[] = [
        { value: "all", label: "Todos" },
        { value: "pending", label: "Pendientes" },
        { value: "cooking", label: "En Proceso" },
        { value: "ready", label: "Completados" },
    ];

    function onFilterChange(filter: OrderStatus | "all"){
        dispatch(setFilter(filter));
    }

    return (
        <Container>
            {filters.map((filter) => (
                <FilterButton
                    $status={filter.value}
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={filter.value === actualFilter ? 'active' : ''}
                >
                    {filter.label}
                </FilterButton>
            ))}
        </Container>
    )
}