/* 
  Componente OrderActions

  Este componente renderiza los botones de acción para cada pedido 
  (Iniciar, Completar y Cancelar)
*/

import { useDispatch } from "react-redux";
import styled from "styled-components"
import { updateOrderStatus } from "../../state/orders/ordersSlice";
import type { OrderStatus } from "../../types";
import { Button } from "../ui/Button";

// Estilos
const Actions = styled.div`
  padding: .5rem 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: .5rem;
`;

const FinishButton = styled(Button)`
  background-color: var(--color-ready);

  &:hover {
    background-color: var(--color-ready-hover);
  }
`;

const DangerButton = styled(Button)`
  background-color: var(--color-danger);

  &:hover {
    background-color: var(--color-danger-hover);
  }
`;

// Tipado de Props
interface Props {
  id: string,
  status: OrderStatus
}

// Componente Funcional
export const OrderActions = ({ id, status }: Props) => {
  const dispatch = useDispatch();

  const changeStatus = (newStatus: OrderStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  return (
    <Actions>
      {status === 'pending' ?
        <Button onClick={() => changeStatus('cooking')}>
          Iniciar
        </Button>
        :
        <FinishButton onClick={() => changeStatus('ready')}>
          Completar
        </FinishButton>
      }
      <DangerButton onClick={() => ''}>
        Cancelar
      </DangerButton>
    </Actions>
  )
}