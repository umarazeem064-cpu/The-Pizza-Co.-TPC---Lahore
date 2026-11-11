export type ProductCategory =
  | 'all'
  | 'pizza'
  | 'burger'
  | 'steak'
  | 'sandwich'
  | 'continental'
  | 'wrap'
  | 'roll'
  | 'chicken'
  | 'pasta'
  | 'starter'
  | 'kids'
  | 'fries'
  | 'beverage'
  | 'sauce'
  | 'deal';

export interface ProductVariant {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  variants?: ProductVariant[];
  description: string;
  descriptionUrdu: string;
  image: string;
  isSpicy?: boolean;
  isPopular?: boolean;
  isSignature?: boolean;
  isAvailable: boolean;
  rating: number;
  prepTime: string;
}

export interface CartItem {
  cartId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  customNotes?: string;
  unitPrice: number;
}

export type PaymentMethod = 'cod' | 'card' | 'jazzcash' | 'easypaisa';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'kitchen_preparing'
  | 'baking'
  | 'packing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerNotes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  rider?: {
    name: string;
    phone: string;
    vehicle: string;
    currentLocation: string;
  };
}

export interface Reservation {
  id: string;
  bookingCode: string;
  guestName: string;
  phone: string;
  email: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatingArea: 'family_hall' | 'cozy_booth' | 'rooftop' | 'executive_lounge';
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  savedAddresses: { label: string; address: string }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'deal' | 'reservation' | 'system';
  read: boolean;
  linkAction?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  source: 'Google Maps' | 'Verified Order';
  avatar?: string;
}
