import React from 'react';
import { CartItem, ProductCardProps } from '../types/Product';
import { addToCart } from '../store/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { selectDarkMode } from '../store/reducers/productSlice';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['cart']);
    const darkMode = useSelector(selectDarkMode);

    const addCart = () => {
        dispatch(addToCart(product));
        toast.success('Product added to cart!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkMode ? "dark" : "light",
        });

        const cartCookie: CartItem[] = cookies.cart || [];
        const existingItemIndex = cartCookie.findIndex(item => item.product.id === product.id);

        let updatedCartCookie: CartItem[];

        if (existingItemIndex !== -1) {
            updatedCartCookie = cartCookie.map((item, index) =>
                index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCartCookie = [...cartCookie, { product: product, quantity: 1 }];
        }

        setCookie('cart', updatedCartCookie, { path: '/' });
    };

    return (
        <div className={`rounded-lg shadow-md overflow-hidden flex flex-col h-full relative ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-contain transition-transform duration-300 transform hover:scale-105"
                />
            </div>

            <div className="p-4 flex-grow">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{product.title}</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3`}>{product.description.substring(0, 100)}...</p>
            </div>

            <div className={`p-4 flex items-center justify-between ${darkMode ? 'border-gray-700 border-t' : 'border-t border-gray-200'}`}>
                <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-700'}`}>${product.price}</span>
                <button
                    onClick={addCart}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;