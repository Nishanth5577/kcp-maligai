import { createContext, useContext, useReducer, useCallback } from 'react';
import { useProduct } from './ProductContext';

const BillingContext = createContext();

const GST_RATE = 0.05; // 5%

const getNextInvoiceNumber = () => {
  try {
    const saved = localStorage.getItem('kcp-invoice-counter');
    const counter = saved ? parseInt(saved, 10) + 1 : 1;
    localStorage.setItem('kcp-invoice-counter', counter.toString());
    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    return `KCP-${dateStr}-${String(counter).padStart(4, '0')}`;
  } catch {
    return `KCP-${Date.now()}`;
  }
};

const billingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existing = state.items.findIndex(item => item.id === product.id);
      if (existing >= 0) {
        const newItems = [...state.items];
        newItems[existing] = {
          ...newItems[existing],
          quantity: newItems[existing].quantity + 1
        };
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }]
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== id) };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.payload } };
    case 'SET_DISCOUNT':
      return { ...state, discount: action.payload };
    case 'SET_DISCOUNT_TYPE':
      return { ...state, discountType: action.payload };
    case 'CLEAR_BILL':
      return {
        ...state,
        items: [],
        customer: { name: '', mobile: '' },
        discount: 0,
        discountType: 'percent'
      };
    case 'SET_INVOICE':
      return { ...state, currentInvoice: action.payload, showInvoice: true };
    case 'CLOSE_INVOICE':
      return { ...state, showInvoice: false, currentInvoice: null };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  customer: { name: '', mobile: '' },
  discount: 0,
  discountType: 'percent', // 'percent' or 'flat'
  currentInvoice: null,
  showInvoice: false,
};

export function BillingProvider({ children }) {
  const [state, dispatch] = useReducer(billingReducer, initialState);
  const { products, saveProducts } = useProduct();

  const addItem = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const setCustomer = useCallback((data) => {
    dispatch({ type: 'SET_CUSTOMER', payload: data });
  }, []);

  const setDiscount = useCallback((val) => {
    dispatch({ type: 'SET_DISCOUNT', payload: parseFloat(val) || 0 });
  }, []);

  const setDiscountType = useCallback((type) => {
    dispatch({ type: 'SET_DISCOUNT_TYPE', payload: type });
  }, []);

  const clearBill = useCallback(() => {
    dispatch({ type: 'CLEAR_BILL' });
  }, []);

  const closeInvoice = useCallback(() => {
    dispatch({ type: 'CLOSE_INVOICE' });
  }, []);

  // Calculations
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discountAmount = state.discountType === 'percent'
    ? (subtotal * Math.min(state.discount, 100)) / 100
    : Math.min(state.discount, subtotal);

  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * GST_RATE * 100) / 100;
  const grandTotal = Math.round((taxableAmount + gstAmount) * 100) / 100;
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const generateInvoice = useCallback(() => {
    const invoiceNumber = getNextInvoiceNumber();
    const now = new Date();

    const invoice = {
      invoiceNumber,
      date: now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      time: now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      timestamp: now.toISOString(),
      customer: { ...state.customer },
      items: state.items.map(item => ({
        id: item.id,
        name: item.name,
        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      subtotal,
      discountType: state.discountType,
      discountValue: state.discount,
      discountAmount,
      gstRate: GST_RATE * 100,
      gstAmount,
      grandTotal,
      totalItems,
    };

    // Save to invoice history in localStorage
    try {
      const saved = localStorage.getItem('kcp-invoices');
      const invoices = saved ? JSON.parse(saved) : [];
      invoices.unshift(invoice);
      localStorage.setItem('kcp-invoices', JSON.stringify(invoices));

      // Update product stock in localStorage
      const updatedProducts = products.map(p => {
        const item = state.items.find(i => i.id === p.id);
        if (item) {
          return { ...p, stock: Math.max(0, (p.stock || 0) - item.quantity) };
        }
        return p;
      });
      saveProducts(updatedProducts);
    } catch (e) {
      console.error('Failed to save invoice:', e);
    }

    dispatch({ type: 'SET_INVOICE', payload: invoice });
    return invoice;
  }, [state, subtotal, discountAmount, gstAmount, grandTotal, totalItems, products, saveProducts]);

  return (
    <BillingContext.Provider value={{
      items: state.items,
      customer: state.customer,
      discount: state.discount,
      discountType: state.discountType,
      currentInvoice: state.currentInvoice,
      showInvoice: state.showInvoice,
      subtotal,
      discountAmount,
      gstAmount,
      gstRate: GST_RATE * 100,
      grandTotal,
      totalItems,
      addItem,
      removeItem,
      updateQuantity,
      setCustomer,
      setDiscount,
      setDiscountType,
      clearBill,
      generateInvoice,
      closeInvoice,
    }}>
      {children}
    </BillingContext.Provider>
  );
}

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) throw new Error('useBilling must be used within BillingProvider');
  return context;
};
