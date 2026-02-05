/* 
    Componente OrderItemsList

    Este componente renderiza la lista de productos y su cantidad en cada pedido.
*/

import styled from "styled-components";
import type { OrderItem } from "../../types"

// Estilos
const ItemList = styled.ul`
  list-style: none;
  padding: .5rem 1rem;
  flex-grow: 1;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: .5rem;
  border-radius: 4px;
  background: #e2e2e2d5;
  border: 1px solid #cacaca;
  margin-bottom: .25rem;
  font-size: 1rem;
`;

const Notes = styled.div`
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 2px;
`;

// Tipado de Props
interface Props {
    items: OrderItem[];
}

// Componente funcional
export const OrderItemsList = ({ items }: Props) => {

    return (
        <ItemList>
            {items.map((item) => (
                <Item key={item.id}>
                    <div>
                        <strong>{item.quantity}x</strong> {item.name}
                        {item.notes && <Notes>{item.notes}</Notes>}
                    </div>
                </Item>
            ))}
        </ItemList>
    )
}