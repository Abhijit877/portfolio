import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string | null;
    onCategorySelect: (category: string | null) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategorySelect,
    searchQuery,
    onSearchChange,
}) => {
    return (
        <div className="sticky-filter-bar py-4">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center gap-4 lg:gap-8">
                    {/* Category Pills */}
                    <div className="flex-1 pills-scroll">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onCategorySelect(null)}
                            className={`clickup-pill ${activeCategory === null ? 'active' : ''}`}
                        >
                            All
                        </motion.button>

                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onCategorySelect(category)}
                                className={`clickup-pill ${activeCategory === category ? 'active' : ''}`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="hidden md:block relative w-64 lg:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="blog-search-input text-text-primary placeholder:text-text-secondary"
                        />
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mt-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="blog-search-input text-text-primary placeholder:text-text-secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
