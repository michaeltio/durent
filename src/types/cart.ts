export interface CartDateRange {
  from: Date;
  to: Date;
}

export interface CartItem {
  id: string;
  name: string;
  city: string;
  price: string;
  imageUrl: string;
  tags: string[];
  dateRange: CartDateRange | null;
}

export interface CartItemInput {
  id: string;
  name: string;
  city: string;
  price: string | number;
  imageUrl?: string;
  tags?: string[];
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: string) => void;
  updateDateRange: (id: string, dateRange: CartDateRange) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getDays: (item: CartItem) => number;
}
