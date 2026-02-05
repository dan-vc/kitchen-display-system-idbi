import { useDispatch } from "react-redux";
import styled from "styled-components"
import { updateOrderStatus } from "../../state/orders/ordersSlice";
import type { OrderStatus } from "../../types";

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

interface Props {
    id: string,
    status: OrderStatus
}

export const OrderActions = ({id, status} : Props) => {
    const dispatch = useDispatch();


    return (
        <Options>
            <Button onClick={() => dispatch(updateOrderStatus({
                id: id,
                status: status === 'pending' ? 'cooking' : 'ready'
            }))}>
                {status === 'pending' ? 'Iniciar' : 'Finalizar'}
            </Button>
            <DangerButton onClick={() => ''}>
                Cancelar
            </DangerButton>
        </Options>
    )
}