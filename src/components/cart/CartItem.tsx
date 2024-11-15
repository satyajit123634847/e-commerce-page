import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateQuantity, removeFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import './CartItemModule.css';


const CartItem = React.memo(() => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = useCallback(
    (id: number, quantity: number) => {
      if (quantity > 0) {
        dispatch(updateQuantity({ id, quantity }));
      }
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
      toast.success(`Item has removed from your cart.`, {
        autoClose: 3000,
      });
    },
    [dispatch]
  );

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <div>
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={item.id}>
                <div className="card project-card shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{truncateTitle(item.title, 45)}</h5>
                    <p className="card-text">${item.price.toFixed(2)}</p>

                    <div className="d-flex justify-content-between align-items-center">

                      <div className="input-group" style={{ width: '120px' }}>

                        <input
                          type="number"
                          className="form-control"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <div className="text-muted">Total: ${(item.price * item.quantity).toFixed(2)}</div>
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 checkout-payment-section">
            <h3>Total Amount</h3>
            <div>
              <strong>${calculateTotal()}</strong>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CartItem;
