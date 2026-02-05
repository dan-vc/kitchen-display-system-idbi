import styled from 'styled-components';
import type { Order } from '../types';

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

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed #f1f5f9;
  font-size: 1rem;
`;

const Notes = styled.div`
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 2px;
`;

const Options = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: .5rem;
`;

const Button = styled.button`
  font-size: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const DangerButton = styled(Button)`
  background-color: #f63b3b;

  &:hover {
    background-color: #eb2525;
  }
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
      <Header>
        <TableInfo>
          {order.type === 'local' ?
            <OrderTitle>Mesa {order.tableNumber}</OrderTitle>
            :
            <OrderTitle>Para llevar</OrderTitle>
          }
          <CustomerName>{order.customer}</CustomerName>
        </TableInfo>

        <OrderInfo>
          <TimeText>{timeString}</TimeText>
          <OrderNumber>#{order.id}</OrderNumber>
        </OrderInfo>
      </Header>

      <ItemList>
        {order.items.map((item) => (
          <Item key={item.id}>
            <div>
              <strong>{item.quantity}x</strong> {item.name}
              {item.notes && <Notes>{item.notes}</Notes>}
            </div>
          </Item>
        ))}
      </ItemList>
      {!isOrderReady ?
        <Options>
          <Button onClick={() => alert(`Avanzar pedido ${order.tableNumber}`)}>
            {order.status === 'pending' ? 'Iniciar' : 'Finalizar'}
          </Button>
          <DangerButton onClick={() => alert(`Cancelando pedido ${order.tableNumber}`)}>
            Cancelar
          </DangerButton>
        </Options>
        :
        <CompletedTag>
          Lista para servir
        </CompletedTag>
      }

    </Card>
  );
};