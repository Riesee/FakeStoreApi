import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Leftbar from '../components/Leftbar';
import { fetchFilteredProducts, fetchProducts } from '../store/reducers/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import Cart from '../components/Cart';
import { ToastContainer } from 'react-toastify';
import { LayoutProps } from '../types/Product';
import useCartInitializer from '../hooks/useCartInitializer';


const Layout: React.FC<LayoutProps> = () => {
    const dispatch: AppDispatch = useDispatch();
    const [openCart, setOpenCart] = React.useState(false);
    const navigate = useNavigate();
    useCartInitializer();

    useEffect(() => {
        dispatch(fetchProducts());
         
    }, [dispatch]);

    const handleFilter = (category: string) => {
        dispatch(fetchFilteredProducts(category));
        navigate(`/${category}`);
    };

    return (
        <div className="flex flex-col min-h-screen h-full bg-gray-200">
            <Cart openCart={openCart} setOpenCart={setOpenCart} />

            <div className="flex flex-1">
                <Leftbar>
                    <h2 className="text-lg font-semibold mb-4">Menü</h2>
                    <ul>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/" onClick={() => dispatch(fetchProducts())} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300">
                                All
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/electronics" onClick={() => handleFilter('electronics')} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300">
                                Electronics
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/jewelery" onClick={() => handleFilter('jewelery')} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300">
                                Jewelery
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/mens-clothing" onClick={() => handleFilter("men's clothing")} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300">
                                Men's clothing
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/womens-clothing" onClick={() => handleFilter("women's clothing")} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300">
                                Women's clothing
                            </Link>
                        </li>
                    </ul>
                </Leftbar>

                <div className="flex-1 p-4 overflow-auto md:ml-64">
                    <Outlet />
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            <footer className="bg-gray-200 text-gray-700 p-4 text-center">
                Hyper ♥ created by Hilmi ÖZYURT
            </footer>
        </div>
    );
};

export default Layout;