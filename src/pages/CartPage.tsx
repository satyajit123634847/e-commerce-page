import React, { Suspense, lazy } from 'react';
const CartItem = lazy(() => import('../components/cart/CartItem'));

function CartPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CartItem />
      </Suspense>
    </div>
  );
}

export default CartPage;
