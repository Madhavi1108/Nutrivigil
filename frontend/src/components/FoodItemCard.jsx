import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Package } from 'lucide-react';

const FoodItemCard = ({ item, index = 0 }) => {
  const { theme } = useTheme();

  const handleCardClick = () => {
    // Detail modal will be implemented in Issue 3
    alert('Coming Soon: Detailed nutrition information and analysis will be available in the next update!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`group relative rounded-xl border backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          : 'bg-white border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-2xl'
      }`}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          // Placeholder when no image is available
          <div className="w-full h-full flex items-center justify-center">
            <Package
              className={`w-16 h-16 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
              }`}
            />
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <div className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg">
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              View Details
            </span>
          </div>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <h3 className={`text-lg font-bold line-clamp-2 min-h-[3.5rem] ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {item.name}
        </h3>

        {/* Brand Name */}
        <p className={`text-sm font-medium ${
          theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
        }`}>
          {item.brand}
        </p>

        {/* Serving Size */}
        <div className="flex items-center justify-between pt-2">
          <div className={`text-xs px-2 py-1 rounded-full ${
            theme === 'dark'
              ? 'bg-white/10 text-gray-300'
              : 'bg-gray-100 text-gray-700'
          }`}>
            <span className="font-semibold">Serving:</span> {item.servingSize}
          </div>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-bl from-indigo-500/20' : 'bg-gradient-to-bl from-indigo-500/10'
      } rounded-bl-full`} />
    </motion.div>
  );
};

// Loading Skeleton for FoodItemCard
export const FoodItemCardSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl border overflow-hidden animate-pulse ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
      }`}
    >
      {/* Image Skeleton */}
      <div className={`h-48 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className={`h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-4 w-3/4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        </div>

        {/* Brand Skeleton */}
        <div className={`h-3 w-1/2 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />

        {/* Serving Skeleton */}
        <div className={`h-6 w-24 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
      </div>
    </div>
  );
};

export default FoodItemCard;
