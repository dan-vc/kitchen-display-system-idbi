import styled from "styled-components";
import type { Order, OrderStatus } from "../types"
import { Button } from "./ui/Button";

const Container = styled.div`
padding: 1rem 1rem 0;
display: flex;
justify-content: center;
align-items: center;
gap: .5rem;
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

interface Props {
    orders: Order[];
}

export const OrdersFilterBar = ({ orders }: Props) => {

    const filters: { value: OrderStatus | "all"; label: string }[] = [
        { value: "all", label: "Todos" },
        { value: "pending", label: "Pendientes" },
        { value: "cooking", label: "En Proceso" },
        { value: "ready", label: "Completados" },
    ];

    function onFilterChange(args: OrderStatus | "all"){}

    return (
        <Container>
            {filters.map((filter) => (
                <FilterButton
                    $status={filter.value}
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                >
                    {filter.label}
                </FilterButton>
            ))}
        </Container>
    )
}