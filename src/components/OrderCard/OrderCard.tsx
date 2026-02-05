/* 
  Componente OrderCard

  Este componente renderiza la tarjeta principal que muestra la información
  de cada pedido. 

  Usa los componentes:
  - OrderHeader
  - OrderItemsList
  - OrderActions
*/

import styled from 'styled-components';
import type { Order } from '../../types';
import { OrderHeader } from './OrderHeader';
import { OrderItemsList } from './OrderItemsList';
import { OrderActions } from './OrderActions';

// Estilos
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
    props.$status === 'pending' ? 'var(--color-pending)' :
    'var(--color-danger)'};
  opacity: ${props => props.$status === 'cancelled' ? .5 : 1};
`;

// Tipado de Props
interface Props {
  order: Order;
}

// Componente Funcional
export const OrderCard = ({ order }: Props) => {
  const timeString = new Date(order.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isOrderActive = order.status != 'ready' && order.status != 'cancelled';

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

      {isOrderActive ?
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