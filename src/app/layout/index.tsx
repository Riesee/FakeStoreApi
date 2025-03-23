import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Leftbar from '../components/Leftbar';
import { fetchFilteredProducts, fetchProducts } from '../store/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import Cart from '../components/Cart';
import { ToastContainer } from 'react-toastify';
import { LayoutProps } from '../types/Product';
import useCartInitializer from '../hooks/useCartInitializer';
import { toggleDarkMode, selectDarkMode } from '../store/reducers/productSlice';
import { getCookie, setCookie } from '../utils/CookieUtils';

const Layout: React.FC<LayoutProps> = () => {
    const dispatch: AppDispatch = useDispatch();
    const [openCart, setOpenCart] = React.useState(false);
    const navigate = useNavigate();
    const darkMode = useSelector(selectDarkMode);
    useCartInitializer();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleFilter = (category: string) => {
        dispatch(fetchFilteredProducts(category));
        navigate(`/${category}`);
    };


    useEffect(() => {
        const fetchToggleDarkMode = async () => {
            await getCookie('darkMode').then(value => {
                const initialDarkMode = value === true;
                dispatch(toggleDarkMode(initialDarkMode));
            });
        };

        fetchToggleDarkMode();
    }, [dispatch]);

    const toggleTheme = () => {
        dispatch(toggleDarkMode(!darkMode));
        setCookie('darkMode', String(!darkMode));
    };

    return (
        <div className={`flex flex-col min-h-screen h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
            <Cart openCart={openCart} setOpenCart={setOpenCart} />

            <div className="flex flex-1">
                <Leftbar>
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <ul>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/" onClick={() => dispatch(fetchProducts())} className="block py-2 px-4 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300  ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700'}">
                                All
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/electronics" onClick={() => handleFilter('electronics')} className="block py-2 px-4 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300  ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700'}">
                                Electronics
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/jewelery" onClick={() => handleFilter('jewelery')} className="block py-2 px-4 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300  ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700'}">
                                Jewelery
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/mens-clothing" onClick={() => handleFilter("men's clothing")} className="block py-2 px-4 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300  ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700'}">
                                Men's clothing
                            </Link>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <Link to="/womens-clothing" onClick={() => handleFilter("women's clothing")} className="block py-2 px-4 hover:bg-gray-200 hover:text-gray-900 rounded-md transition duration-300  ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700'}">
                                Women's clothing
                            </Link>
                        </li>
                        <label className="inline-flex items-center cursor-pointer mt-5">
                            <input onChange={toggleTheme} type="checkbox" value="" className="sr-only peer" checked={darkMode} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                            <span className={`ms-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </label>
                    </ul>
                </Leftbar>

                <div className={`flex-1 p-4 overflow-auto md:ml-64 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                    <Outlet />
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

            <footer className={`p-4 text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}>
                Hyper ♥ created by Hilmi ÖZYURT
            </footer>
        </div>
    );
};

export default Layout;