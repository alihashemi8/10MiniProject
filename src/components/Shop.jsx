import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Shopimg from "../assets/Shopimg.png"
const productsData = [
  { id: 1, name: 'Nike Air Max', price: 1200, category: 'shoes', image: Shopimg, },
  { id: 2, name: 'Adidas T-shirt', price: 750, category: 'clothing', image: Shopimg,  },
  { id: 3, name: 'Puma Backpack', price: 950, category: 'accessories', image: Shopimg,  },
  { id: 4, name: 'Reebok Cap', price: 400, category: 'accessories', image: Shopimg,  },
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (product) => setCart((prev) => [...prev, product]);
  const handleRemoveFromCart = (indexToRemove) =>
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));

  const categories = ['all', ...new Set(productsData.map((p) => p.category))];
  const filteredProducts = productsData.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#f4eaea] font-sans rounded-2xl">
      {/* Navigation Bar */}
      <nav className="bg-[#f8dddd] rounded-b-2xl shadow-sm px-6 py-4 sticky top-0 z-10 rounded-2xl">
        {/* Search - desktop/tablet only */}
        <div className="hidden md:flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition-all duration-200 px-4 py-1 rounded-full text-md font-medium ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-full border bg-white border-gray-300 text-md w-64 focus:outline-none focus:ring-2 focus:ring-amber-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Search - mobile */}
        <div className="md:hidden mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories - mobile dropdown */}
        <div className="md:hidden">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-[#f8dddd] rounded-2xl shadow shadow-amber-800 hover:shadow-lg transition-all duration-300 p-4 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="text-lg font-semibold mt-3 text-gray-800">{product.name}</h2>
            <p className="text-green-600 font-bold text-sm mt-1">
              ${product.price.toLocaleString()}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-white hover:bg-amber-800 transition-all text-black hover:text-white py-1.5 px-4 rounded-xl text-sm font-medium"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="p-4 max-w-3xl mx-auto bg-[#f8dddd] shadow-amber-800 rounded-2xl shadow-md mt-10">
        <h3 className="text-xl font-bold mb-4 text-gray-800">🛍️ Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is currently empty.</p>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex justify-between items-center border-b pb-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm text-gray-700">
                    {item.name} - ${item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="text-red-500 hover:text-red-600 text-xl"
                  >
                    ❌
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        <p className="mt-4 font-bold text-gray-800">
          Total: ${total.toLocaleString()}
        </p>

        {/* Payment Button - below cart */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => alert('Redirecting to payment gateway...')}
            className="bg-white hover:bg-amber-800 hover:text-white py-2 px-6 rounded-full text-sm text-black font-semibold transition-all"
          >
            Go to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
