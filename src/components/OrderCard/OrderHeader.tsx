/* 
    Componente OrderHeader

    Este componente renderiza el encabezado del pedido con sus detalles (tipo,
    cliente, hora del pedido, ID del pedido)
*/

import styled from "styled-components";
import type { OrderStatus, OrderType } from "../../types";

// Estilos
const Header = styled.div<{ $status: string }>`
display: flex;
justify-content: space-between;
padding: 1rem;
background: ${props =>
    props.$status === 'ready' ? 'var(--color-ready)' :
    props.$status === 'cooking' ? 'var(--color-cooking)' :
    props.$status === 'pending' ? 'var(--color-pending)' :
    'var(--color-danger)'};
color: #fff;
border-bottom: 1px solid #e2e8f0;
padding-bottom: 8px;
`;

const TableInfo = styled.div``;

const OrderInfo = styled.div`
display: flex;
flex-direction: column;
text-align: right;
`;

const OrderTitle = styled.h3`
margin: 0;
font-size: 1.2rem;
font-weight: 600;
line-height: 1.2;
`;
const CustomerName = styled.span`
margin: 0;
font-size: .9rem;
color: #f5f5f5;
`;

const OrderNumber = styled.span`
font-size: 0.85rem;
font-family: "Roboto Mono", monospace;
`;

const TimeText = styled.span`
font-size: 0.9rem;
color: #f5f5f5;
font-family: "Roboto Mono", monospace;
`;

// Tipado de Props
interface Props {
    type: OrderType;
    status: OrderStatus;
    tableNumber?: number;
    customer: string;
    timeString: string;
    id: string
}

// Componente funcional
export const OrderHeader = ({ type, status, tableNumber, customer, timeString, id }: Props) => {

    return (
        <Header $status={status}>
            <TableInfo>
                {type === 'local' ?
                    <OrderTitle>Mesa {tableNumber}</OrderTitle>
                    :
                    <OrderTitle>Para llevar</OrderTitle>
                }
                <CustomerName>{customer}</CustomerName>
            </TableInfo>

            <OrderInfo>
                <TimeText>{timeString}</TimeText>
                <OrderNumber>#{id}</OrderNumber>
            </OrderInfo>
        </Header>
    )
}