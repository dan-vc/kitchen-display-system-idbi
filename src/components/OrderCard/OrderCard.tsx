import styled from 'styled-components';
import type { Order } from '../../types';
import { OrderHeader } from './OrderHeader';
import { OrderItemsList } from './OrderItemsList';
import { OrderActions } from './OrderActions';

/* 
    Tarjeta principal
    Cambios el color del borde segun el estado con props
*/
const Card = styled.div<{ $status: string }>`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 2px solid;
  border-top: 5px solid;
  border-color: ${props =>
    props.$status === 'ready' ? '#22c55e' :
      props.$status === 'cooking' ? '#f59e0b' :
        '#9ca0a5'};
  opacity: ${props => props.$status === 'ready' ? .9 : 1};
  user-select: ${props => props.$status === 'ready' ? 'none' : 'initial'};
`;

const CompletedTag = styled.span`
  font-size: 1rem;
  border: 1px solid #22c55e;
  color: #22c55e;
  font-weight: 600;
  border-radius: 6px;
  text-align: center;
  padding: 10px;
`;

interface Props {
  order: Order;
}

// Componente
export const OrderCard = ({ order }: Props) => {
  const timeString = new Date(order.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isOrderReady = order.status === 'ready';

  return (
    <Card $status={order.status}>
      <OrderHeader
        type={order.type}
        tableNumber={order.tableNumber}
        customer={order.customer}
        timeString={timeString}
        id={order.id}
      />

      <OrderItemsList
        items={order.items}
      />

      {!isOrderReady ?
        <OrderActions
          id={order.id}
          status={order.status}
        />
        :
        <CompletedTag>
          Lista para servir
        </CompletedTag>
      }

    </Card>
  );
};