import styled from 'styled-components';
import { OrderCard } from './components/OrderCard';
import type { Order, OrderStatus } from './types';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
  color: #333;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;

  @media (max-width: 600px){
    flex-direction: column;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const CurrentOrders = styled.span`
  text-align: right;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 0 auto;
`;

export const MOCK_ORDERS: Order[] = [
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


function App() {
  // Usamos un estado local temporal solo para probar
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  // Pedidos activos (excluimos los que están listos)
  const currentOrders = orders.reduce((count, el) => {
    el.status === 'ready' ? '' : count++;
    return count;
  }, 0)

  const orderPriority: Record<OrderStatus, number> = {
    pending: 1,
    cooking: 2,
    ready: 3,
  };

  const sortedOrders = [...orders].sort((a, b) => {
    // Primero por prioridad del estado
    if (orderPriority[a.status] !== orderPriority[b.status]) {
      return orderPriority[a.status] - orderPriority[b.status];
    }

    // Si tienen el mismo estado → ordenar por antigüedad
    return a.startTime - b.startTime;
  });

  return (
    <Container>
      <Header >
        <Title>
          <span>KDS</span>
          <span> - {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </Title>

        <CurrentOrders>
          {currentOrders} pedidos activos
        </CurrentOrders>
      </Header>

      <Wrapper>
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Wrapper>
    </Container>
  );
}

export default App;