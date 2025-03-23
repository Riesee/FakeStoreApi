import React, { useState, useEffect } from 'react';
import { LeftbarProps } from '../types/Product';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../store/reducers/productSlice';

const Leftbar: React.FC<LeftbarProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLeftbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <button
            className={`md:hidden fixed top-4 left-4 p-2 rounded-md z-50 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={toggleLeftbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className={`fixed top-0 left-0 h-full w-64 shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
          >
            <div className="p-4">
              {children}
            </div>
          </div>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-30"
              onClick={toggleLeftbar}
            ></div>
          )}
        </>
      ) : (
        <div className={`hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
          <div className="p-4 h-max-full">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Leftbar;