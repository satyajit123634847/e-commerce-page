import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import './NavbarModule.css';

const Navbar: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">My Shop</Link>
                <div className="cart-icon-container d-flex align-items-center">
                    <Link to="/cart" className="d-flex align-items-center cart-link-tag">
                        <i className="fas fa-shopping-cart cart-icon"></i>
                        {cartItemCount > 0 && (
                            <span className="cart-item-count mx-1">{cartItemCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
