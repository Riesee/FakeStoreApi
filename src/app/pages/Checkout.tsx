import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../store/reducers/productSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { CartItem } from '../types/Product';

const Checkout: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = useSelector((state: RootState) => state.products.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['cart']);


    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleCompleteOrder = () => {
        setIsModalOpen(true);
    };

    const confirmCompleteOrder = () => {
        dispatch(clearCart());
        navigate('/');
        setIsModalOpen(false);
        toast.success('Siparişiniz Başarıyla Tamamlandı', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setCookie('cart', [], { path: '/' });
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
        toast.success('Ürün Sepetten silindi!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        const cartCookie = cookies.cart || [];
        const updatedCartCookie = cartCookie.filter((item: CartItem) => item.product.id !== productId);
        setCookie('cart', updatedCartCookie, { path: '/' });
    };

    const handleIncreaseQuantity = (productId: number) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId: number) => {
        dispatch(decreaseQuantity(productId));
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Sepetim</h1>
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-3/4 pr-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-600">Sepetiniz boş. Lütfen ürün ekleyin.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {cart.map((item, index) => (
                                <li key={index} className="flex items-center justify-between py-4">
                                    <div className="flex items-center">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="h-24 w-24 object-contain mr-4 rounded"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.product.title}</h3>
                                            <p className="text-gray-600 text-sm my-4">{item.product.description}</p>
                                            <p className="text-gray-700">Fiyat: ${item.product.price}</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.product.id)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-l"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item.product.id)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-r"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            onClick={() => handleRemoveFromCart(item.product.id)}
                                            className="text-red-500 hover:text-red-700 mt-2 focus:outline-none"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="lg:w-1/4 p-4 bg-gray-100 rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span>Ürün Toplamı:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Kargo:</span>
                        <span>Ücretsiz</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between items-center font-bold">
                            <span>Toplam:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleCompleteOrder}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline transition duration-300 w-full"
                    >
                        Siparişi Tamamla
                    </button>
                </div>
            </div>




            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center">
                    <div className="bg-white rounded-md shadow-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Kayıtlı kartınız ile ödeme yapılacaktır onaylıyor musunuz?</h3>
                        <p>Toplam fiyat: <b>${totalPrice.toFixed(2)}</b></p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                İptal
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                onClick={confirmCompleteOrder}
                            >
                                Onayla
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            
            
            
            
        </div>
    );
};

export default Checkout;