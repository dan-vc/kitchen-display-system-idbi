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

const StartButton = styled(Button)`
`;

const FinishButton = styled(Button)`
  background-color: var(--color-ready);

  &:hover {
    background-color: var(--color-ready-hover);
  }
`;

const DangerButton = styled(Button)`
  background-color: #f63b3b;

  &:hover {
    background-color: #eb2525;
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

  function handleStartButton() {
    dispatch(updateOrderStatus({
      id: id,
      status: 'cooking'
    }))
  }
  function handleFinishButton() {
    dispatch(updateOrderStatus({
      id: id,
      status: 'ready'
    }))
  }

  return (
    <Actions>
      {status === 'pending' ?
        <StartButton onClick={() => handleStartButton()}>
          Iniciar
        </StartButton>
        :
        <FinishButton onClick={() => handleFinishButton()}>
          Completar
        </FinishButton>
      }
      <DangerButton onClick={() => ''}>
        Cancelar
      </DangerButton>
    </Actions>
  )
}