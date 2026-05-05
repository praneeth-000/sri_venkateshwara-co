import React from 'react';
import Products from '../components/Products';
import Brands from '../components/Brands';

const ProductsPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      <Products />
      <Brands />
    </div>
  );
};

export default ProductsPage;
