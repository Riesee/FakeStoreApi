import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useCookies } from 'react-cookie';
import { CartItem } from '../types/Product';
import { setCart } from '../store/reducers/productSlice';

const useCartInitializer = () => {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);
    const cart = useSelector((state: RootState) => state.products.cart); 
    const [cookies, setCookie] = useCookies(['cart']);
    const [isCookieUpdated, setIsCookieUpdated] = useState(false);

    useEffect(() => {
        if (loading === 'succeeded' && !isCookieUpdated) {
            const cartCookie: CartItem[] = cookies.cart || [];

            const cartItemsToAdd = cartCookie.map(cookieItem => {
                const product = products.find(p => p.id === cookieItem?.product?.id);
                return product ? { product, quantity: cookieItem.quantity } : null; 
            }).filter(item => item !== null) as CartItem[];

            dispatch(setCart(cartItemsToAdd));
            setIsCookieUpdated(true);

        }
    }, [dispatch, products, cookies.cart, loading, isCookieUpdated]);

    useEffect(() => {
        if (loading === 'succeeded') {
            setCookie('cart', cart, { path: '/' });
        }
    }, [cart, setCookie, loading]);
};

export default useCartInitializer;