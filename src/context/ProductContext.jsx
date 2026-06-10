import { createContext, useContext, useState, useCallback } from 'react';
import { products as defaultProducts, categories as defaultCategories } from '../data/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProductsState] = useState(() => {
    try {
      const saved = localStorage.getItem('kcp-products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [categories, setCategoriesState] = useState(() => {
    try {
      const saved = localStorage.getItem('kcp-categories');
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  const saveProducts = useCallback((updatedProducts) => {
    setProductsState(updatedProducts);
    localStorage.setItem('kcp-products', JSON.stringify(updatedProducts));
  }, []);

  const saveCategories = useCallback((updatedCategories) => {
    setCategoriesState(updatedCategories);
    localStorage.setItem('kcp-categories', JSON.stringify(updatedCategories));
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      saveProducts,
      saveCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
