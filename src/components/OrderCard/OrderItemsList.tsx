import styled from "styled-components";
import type { OrderItem } from "../../types"


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

interface Props {
    items: OrderItem[];
}

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