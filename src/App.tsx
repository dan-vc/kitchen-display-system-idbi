import styled from 'styled-components';
import { OrderCard } from './components/OrderCard/OrderCard';
import type { Order, OrderStatus } from './types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './state/store';
import { act, useEffect, useState } from 'react';
import { addOrder } from './state/orders/ordersSlice';
import { OrdersFilterBar } from './components/OrdersFilterBar';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  color: #333;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background: #f5f5f5;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 1rem;
  background: var(--color-ready);
  color: #fff;

  @media (max-width: 600px){
    flex-direction: column;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

const ActualTime = styled.span`
font-family: 'Roboto mono';
`;

const CurrentOrders = styled.span`
  text-align: right;
  font-size: 1.25rem;
  font-weight: 600;

  @media (max-width: 600px){
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: minmax(350px, 1fr);
  gap: 1rem;

  @media (max-width: 600px){
    grid-template-columns: 1fr;
  }
`;


function App() {
  // Obtenemos los pedidos desde el estado global
  const orders = useSelector((state: RootState) => state.orders.value);
  const actualFilter = useSelector((state: RootState) => state.orders.filter);
  const filteredOrders = actualFilter === 'all' ? orders : orders.filter(o => o.status === actualFilter);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dispatch = useDispatch();

  // Simulamos un nuevo pedido
  const testOrder: Order = {
    id: 'ORD4564',
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
  useEffect(() => {
    const interval = setTimeout(() => {
      dispatch(addOrder(testOrder));
    }, 5000);

    return () => clearTimeout(interval);
  }, [])


  // Pedidos activos (excluimos los que están listos)
  const currentOrders = orders.filter(o => o.status != 'ready').length;

  // Prioridad del pedido segun su estado
  const orderPriority: Record<OrderStatus, number> = {
    pending: 1,
    cooking: 2,
    ready: 3,
    cancelled: 4,
  };

  // Ordenamos los pedidos por prioridad y tipo
  const sortedOrders = [...filteredOrders].sort((a, b) => {
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
        <TopBar>
          <Title>
            ChefStack SDK
          </Title>

          <ActualTime>
            {time.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </ActualTime>

          <CurrentOrders>
            {currentOrders} pedidos activos
          </CurrentOrders>
        </TopBar>

        <OrdersFilterBar
          actualFilter={actualFilter}
        />
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