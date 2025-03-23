import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { CartProps } from '../types/Product';
import { selectDarkMode } from '../store/reducers/productSlice';

const Cart: React.FC<CartProps> = ({ openCart, setOpenCart }) => {
    const cart = useSelector((state: RootState) => state.products.cart);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const navigate = useNavigate();
    const darkMode = useSelector(selectDarkMode);

    const handleGoToCheckout = () => {
        navigate('/checkout');
        setOpenCart(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpenCart(!openCart)}
                className={`absolute top-2 right-4 border rounded-full shadow-md p-2 z-20 hover:bg-gray-100 transition duration-300 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white'}`}
            >
                <ShoppingCartIcon className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                )}
            </button>

            {openCart && (
                <div className={`absolute top-12 right-4 rounded-md shadow-md p-4 z-10 w-80 ${darkMode ? 'bg-gray-800 text-white border-gray-700 border' : 'bg-white border'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">My Cart</h2>
                        <button
                            onClick={() => setOpenCart(false)}
                            className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index} className={`flex items-center justify-between py-2 border-b border-gray-200 ${darkMode ? 'border-gray-700' : ''}`}>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="h-12 w-12 object-contain mr-2 rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">{item.product.title}</p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} `}>{item.quantity} pieces</p>
                                    </div>
                                    <span className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {cart.length === 0 ? null : (
                        <>
                            <div className="font-bold mt-2">
                                Total: ${totalPrice.toFixed(2)}
                            </div>
                            <button
                                onClick={handleGoToCheckout}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full mt-2"
                            >
                                Go to Cart
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;