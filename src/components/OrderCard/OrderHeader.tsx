import styled from "styled-components";
import type { OrderType } from "../../types";

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: top;
border-bottom: 1px solid #e2e8f0;
padding-bottom: 8px;
`;

const TableInfo = styled.div``;

const OrderInfo = styled.div`
display: flex;
flex-direction: column;
align-items: right;
text-align: right;
`;

const OrderTitle = styled.h3`
margin: 0;
font-size: 1.2rem;
line-height: 1.2;
color: #1e293b;
`;
const CustomerName = styled.span`
margin: 0;
font-size: .9rem;
color: #64748b;
`;

const OrderNumber = styled.span`
font-size: 0.85rem;
`;

const TimeText = styled.span`
font-size: 0.9rem;
color: #64748b;
`;

interface Props {
    type: OrderType;
    tableNumber?: number;
    customer: string;
    timeString: string;
    id: string
}

export const OrderHeader = ({ type, tableNumber, customer, timeString, id } : Props) => {

    return (
        <Header>
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