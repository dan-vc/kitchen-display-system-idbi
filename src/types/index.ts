export type OrderStatus = 'pending' | 'cooking' | 'ready';

export type OrderType = 'local' | 'delivery' | 'takeout';

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    notes?: string;
}

export interface Order {
  id: string;
  tableNumber?: number;
  type: OrderType;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;
  startTime: number;
}