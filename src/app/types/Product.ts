export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductCardProps {
  product: Product;
}

export interface LayoutProps {
    children?: React.ReactNode;
}

export interface CartProps {
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LeftbarProps {
  children: React.ReactNode;
}

export interface ProductState {
  products: Product[];
  darkMode: boolean;
  cart: CartItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  filterLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  filterError: string | null;
}
