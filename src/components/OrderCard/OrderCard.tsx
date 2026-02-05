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
  color: #0a0a0a;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-color: ${props =>
    props.$status === 'ready' ? 'var(--color-ready)' :
    props.$status === 'cooking' ? 'var(--color-cooking)' :
    'var(--color-pending)'};
  opacity: ${props => props.$status === 'ready' ? .9 : 1};
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
        status={order.status}
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
        ''
      }

    </Card>
  );
};