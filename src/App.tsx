import styled from 'styled-components';
import { OrderCard } from './components/OrderCard/OrderCard';
import type { Order, OrderStatus } from './types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './state/store';
import { useEffect } from 'react';
import { addOrder } from './state/orders/ordersSlice';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
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
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: minmax(350px, 1fr);
  gap: 1rem;
`;


function App() {
  const dispatch = useDispatch();
  // Obtenemos los pedidos desde el estado global
  const orders = useSelector((state: RootState) => state.orders.value);


  // Simulamos un nuevo pedido
  const testOrder: Order = {
    id: 'ORD0001',
    tableNumber: Math.floor(Math.random() * 20) + 1,
    type: 'local',
    customer: 'Walter White',
    status: 'pending',
    startTime: Date.now(),
    items: [
      { id: 'i1', name: 'Hamburguesa Clásica', quantity: 2, notes: 'Sin pepinillos, doble queso.' },
      { id: 'i2', name: 'Papas Fritas', quantity: 1, notes: 'Sin sal' },
    ],
  }
/*   useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addOrder(testOrder));
    }, 20000);

    return () => clearInterval(interval);
  }, []) */


  // Pedidos activos (excluimos los que están listos)
  const currentOrders = orders.reduce((count, el) => {
    el.status === 'ready' ? '' : count++;
    return count;
  }, 0)


  // Prioridad del pedido segun su estado
  const orderPriority: Record<OrderStatus, number> = {
    pending: 1,
    cooking: 2,
    ready: 3,
  };

  // Ordenamos los pedidos por prioridad y tipo
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