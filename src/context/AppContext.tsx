import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Reservation,
  UserProfile,
  AppNotification,
  Review,
  PaymentMethod,
  OrderStatus,
  ProductVariant,
} from '../types';
import { productsData } from '../data/products';
import { Language, translations } from '../translations';

interface AppContextType {
  // Theme & Language
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['en'];

  // Products & Inventory
  products: Product[];
  updateProductStock: (id: string, isAvailable: boolean) => void;
  updateProductPrice: (id: string, price: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number, customNotes?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerCity: string;
    customerNotes?: string;
    paymentMethod: PaymentMethod;
  }) => Order;
  trackOrderById: (orderNumberOrId: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Reservations
  reservations: Reservation[];
  createReservation: (reservationData: Omit<Reservation, 'id' | 'bookingCode' | 'status' | 'createdAt'>) => Reservation;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  pushNotification: (title: string, message: string, type?: AppNotification['type']) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Reviews & Feedback
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'source'>) => void;

  // UI Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: (open: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial real customer reviews from Google Maps for The Pizza & Co. (TPC Lahore)
const initialReviews: Review[] = [
  {
    id: 'rev_1',
    author: 'Afeefa Maryam',
    rating: 5,
    comment: 'Cheese sticks was mind blowing. I am a big fan of cheese sticks but never had such an amazing sticks before. The sauce dip was authentic!',
    date: 'March 2026',
    source: 'Google Maps',
  },
  {
    id: 'rev_2',
    author: 'Sheikh Zain',
    rating: 5,
    comment: 'The Pizza & Co. Special pizza and Choco Frappe are outstanding. Very cozy environment for families on Sharaqpur Road.',
    date: 'September 2026',
    source: 'Google Maps',
  },
  {
    id: 'rev_3',
    author: 'Adv Waqas Khan',
    rating: 5,
    comment: 'Club sandwiches and sizzling chicken steaks with white pepper mushroom sauce were super delicious and fresh! Fast delivery service.',
    date: 'April 2026',
    source: 'Google Maps',
  },
  {
    id: 'rev_4',
    author: 'Faiza Naeem',
    rating: 5,
    comment: 'Chicken Tikka and New York Crust pizzas are so cheesy and rich. Authentic taste and hygienic kitchen. 10/10 recommended in Lahore.',
    date: 'July 2026',
    source: 'Google Maps',
  },
];

// Seeded live order for instant tracking test
const initialOrders: Order[] = [
  {
    id: 'ord_1042',
    orderNumber: 'TPC-1042',
    customerName: 'Muhammad Ali',
    customerPhone: '0300 1234567',
    customerAddress: 'House 42, Block B, Parklane City, Sharaqpur Road',
    customerCity: 'Lahore',
    items: [
      {
        cartId: 'c1',
        product: productsData[0], // Tikka Pizza
        selectedVariant: { name: 'Large', price: 1599 },
        quantity: 1,
        unitPrice: 1599,
        customNotes: 'Extra spicy, well done crust',
      },
      {
        cartId: 'c2',
        product: productsData[19], // Mayo Garlic Fries
        quantity: 1,
        unitPrice: 249,
      },
      {
        cartId: 'c3',
        product: productsData[73], // Choco Frappe
        quantity: 2,
        unitPrice: 349,
      },
    ],
    subtotal: 2546,
    deliveryFee: 0,
    discount: 150,
    total: 2396,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'out_for_delivery',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: '15-20 mins',
    rider: {
      name: 'Hamza Tariq',
      phone: '0321 7894561',
      vehicle: 'Honda CD 70 (LED-4821)',
      currentLocation: 'Main Sharaqpur Road near Usman Plaza',
    },
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme setup
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('tpc_theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('tpc_theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Language setup
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Products
  const [products, setProducts] = useState<Product[]>(productsData);

  const updateProductStock = (id: string, isAvailable: boolean) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable } : item))
    );
  };

  const updateProductPrice = (id: string, price: number) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price } : item))
    );
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1,
    customNotes = ''
  ) => {
    const unitPrice = variant ? variant.price : product.price;
    const cartId = `${product.id}_${variant ? variant.name : 'std'}_${Date.now()}`;

    setCart((prev) => {
      // Check if identical item already in cart
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.name === variant?.name &&
          item.customNotes === customNotes
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          cartId,
          product,
          selectedVariant: variant,
          quantity,
          customNotes,
          unitPrice,
        },
      ];
    });

    pushNotification(
      'Added to Cart',
      `${product.name} (${variant ? variant.name : 'Standard'}) has been added.`,
      'order'
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeOrderId, setActiveOrderId] = useState<string>('ord_1042');

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  const placeOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerCity: string;
    customerNotes?: string;
    paymentMethod: PaymentMethod;
  }) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TPC-${randomNum}`;
    const id = `ord_${randomNum}`;
    const subtotal = cartTotal;
    const deliveryFee = subtotal >= 1500 ? 0 : 150;
    const discount = subtotal >= 2500 ? 200 : 0;
    const total = subtotal + deliveryFee - discount;

    const newOrder: Order = {
      id,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      customerCity: orderData.customerCity,
      customerNotes: orderData.customerNotes,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '30-40 mins',
      rider: {
        name: 'Usman Ghani',
        phone: '0311 6678677',
        vehicle: 'Honda CD 70 (TPC Express)',
        currentLocation: 'TPC Kitchen - Usman Plaza Main Sharaqpur Road',
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(id);
    clearCart();

    pushNotification(
      'Order Confirmed! 🎉',
      `Order #${orderNumber} received. Total: Rs. ${total.toLocaleString()}. Kitchen is preparing your meal!`,
      'order'
    );

    // Simulate real-time automated kitchen and delivery progression
    setTimeout(() => {
      updateOrderStatus(id, 'kitchen_preparing');
      pushNotification(
        'In Kitchen 👨‍🍳',
        `Order #${orderNumber} is now being prepared by our chefs.`,
        'order'
      );
    }, 12000);

    setTimeout(() => {
      updateOrderStatus(id, 'baking');
      pushNotification(
        'Baking in Stone Oven 🍕',
        `Pizzas are bubbling in high temperature stone oven for golden crust.`,
        'order'
      );
    }, 28000);

    setTimeout(() => {
      updateOrderStatus(id, 'out_for_delivery');
      pushNotification(
        'Rider Dispatched! 🛵',
        `Rider Usman Ghani is out for delivery with your hot meal.`,
        'order'
      );
    }, 50000);

    return newOrder;
  };

  const trackOrderById = (orderNumberOrId: string) => {
    const trimmed = orderNumberOrId.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === trimmed ||
        o.id.toUpperCase() === trimmed ||
        o.customerPhone.includes(trimmed)
    );
    if (found) {
      setActiveOrderId(found.id);
      setIsTrackingOpen(true);
      return found;
    }
    return null;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'res_1',
      bookingCode: 'TPC-RES-702',
      guestName: 'Sheikh Farhan',
      phone: '0321 8899771',
      email: 'farhan@gmail.com',
      guestsCount: 6,
      date: '2026-11-15',
      timeSlot: '08:30 PM',
      seatingArea: 'family_hall',
      specialRequests: 'Birthday celebration decoration requested',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
  ]);

  const createReservation = (
    data: Omit<Reservation, 'id' | 'bookingCode' | 'status' | 'createdAt'>
  ): Reservation => {
    const code = `TPC-RES-${Math.floor(100 + Math.random() * 900)}`;
    const newRes: Reservation = {
      ...data,
      id: `res_${Date.now()}`,
      bookingCode: code,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [newRes, ...prev]);
    pushNotification(
      'Table Reserved! 🍽️',
      `Booking ${code} confirmed for ${data.guestsCount} guests on ${data.date} at ${data.timeSlot}.`,
      'reservation'
    );
    return newRes;
  };

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n1',
      title: 'Welcome to TPC Lahore! 🍕',
      message: 'Dive into the flavour of happiness. Order online for instant Sharaqpur Road delivery.',
      time: 'Just now',
      type: 'deal',
      read: false,
    },
    {
      id: 'n2',
      title: 'Active Order Tracking Ready',
      message: 'Live tracker is available for Order #TPC-1042.',
      time: '15 mins ago',
      type: 'order',
      read: false,
    },
  ]);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => setNotifications([]);

  const pushNotification = (
    title: string,
    message: string,
    type: AppNotification['type'] = 'system'
  ) => {
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Umar Azeem',
    phone: '0311 6678677',
    email: 'customer@thepizzaco.pk',
    address: 'Near Parklane City, Sharaqpur Road',
    city: 'Lahore',
    savedAddresses: [
      { label: 'Home', address: 'House 42, Block B, Parklane City, Lahore' },
      { label: 'Office', address: 'Usman Plaza Floor 2, Sharaqpur Road, Lahore' },
    ],
  });

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    pushNotification('Profile Updated', 'Your profile details have been saved securely.', 'system');
  };

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (review: Omit<Review, 'id' | 'date' | 'source'>) => {
    const newRev: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      date: 'Just now',
      source: 'Verified Order',
    };
    setReviews((prev) => [newRev, ...prev]);
    pushNotification(
      'Thank You for Feedback! ⭐',
      'Your valuable rating has been recorded.',
      'system'
    );
  };

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        products,
        updateProductStock,
        updateProductPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        orders,
        activeOrder,
        placeOrder,
        trackOrderById,
        updateOrderStatus,
        reservations,
        createReservation,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        clearNotifications,
        pushNotification,
        userProfile,
        updateUserProfile,
        reviews,
        addReview,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isReservationOpen,
        setIsReservationOpen,
        isProfileOpen,
        setIsProfileOpen,
        isAdminOpen,
        setIsAdminOpen,
        isFeedbackOpen,
        setIsFeedbackOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
