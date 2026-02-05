import { useDispatch } from "react-redux";
import styled from "styled-components"
import { updateOrderStatus } from "../../state/orders/ordersSlice";
import type { OrderStatus } from "../../types";
import { Button } from "../ui/Button";

const Actions = styled.div`
  padding: .5rem 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: .5rem;
`;

const DangerButton = styled(Button)`
  background-color: #f63b3b;

  &:hover {
    background-color: #eb2525;
  }
`;

interface Props {
  id: string,
  status: OrderStatus
}

export const OrderActions = ({ id, status }: Props) => {
  const dispatch = useDispatch();


  return (
    <Actions>
      <Button onClick={() => dispatch(updateOrderStatus({
        id: id,
        status: status === 'pending' ? 'cooking' : 'ready'
      }))}>
        {status === 'pending' ? 'Iniciar' : 'Finalizar'}
      </Button>
      <DangerButton onClick={() => ''}>
        Cancelar
      </DangerButton>
    </Actions>
  )
}