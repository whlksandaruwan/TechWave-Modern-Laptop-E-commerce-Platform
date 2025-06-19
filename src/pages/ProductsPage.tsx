import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Laptop {
  id: string;
  name: string;
  description: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
  };
  images: string[];
  stock: number;
  categoryId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [initialPriceRange, setInitialPriceRange] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    document.title = 'Shop All Laptops - TechWave';
    const fetchLaptops = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/laptops');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Laptop[] = await response.json();
        setLaptops(data);
        // Set price range based on data
        if (data.length > 0) {
          const prices = data.map(l => l.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setPriceRange([min, max]);
          setInitialPriceRange([min, max]);
        }
      } catch (err) {
        setError('Failed to load laptops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLaptops();
  }, []);

  // Extract unique brands and categories (brand from name prefix for demo)
  const brands = Array.from(new Set(laptops.map(l => l.name.split(' ')[0])));
  const categories = Array.from(new Set(laptops.map(l => l.categoryId)));

  // Filter laptops
  const filteredLaptops = laptops.filter(laptop => {
    const brand = laptop.name.split(' ')[0];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(laptop.categoryId);
    const matchesPrice = laptop.price >= priceRange[0] && laptop.price <= priceRange[1];
    return matchesBrand && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange(initialPriceRange);
  };

  if (loading) return <div className="text-center py-16">Loading laptops...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="mt-16 md:mt-20 container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">All Laptops</h1>
      <div className="flex gap-8">
        {/* Modern Filters Sidebar */}
        <aside className="w-72 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24 self-start h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg tracking-tight">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-xs text-primary-600 hover:underline px-2 py-1 rounded transition-colors hover:bg-primary-50"
            >
              Clear All
            </button>
          </div>
          <div className="border-b border-gray-200 mb-4" />
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Brand</h3>
            <div className="flex flex-col gap-2">
              {brands.map(brand => (
                <label key={brand} className="inline-flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={e => {
                      setSelectedBrands(prev =>
                        e.target.checked ? [...prev, brand] : prev.filter(b => b !== brand)
                      );
                    }}
                    className="accent-primary-600 w-4 h-4 rounded border-gray-300 focus:ring-primary-500 transition-all"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-200 mb-4" />
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
            <div className="flex flex-col gap-2">
              {categories.map(category => (
                <label key={category} className="inline-flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={e => {
                      setSelectedCategories(prev =>
                        e.target.checked ? [...prev, category] : prev.filter(c => c !== category)
                      );
                    }}
                    className="accent-primary-600 w-4 h-4 rounded border-gray-300 focus:ring-primary-500 transition-all"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-200 mb-4" />
          <div className="mb-2">
            <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                value={priceRange[0]}
                min={initialPriceRange[0]}
                max={priceRange[1]}
                onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-20 border rounded px-2 py-1 focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={priceRange[1]}
                min={priceRange[0]}
                max={initialPriceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-20 border rounded px-2 py-1 focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
              />
            </div>
            <div className="h-2 bg-gray-100 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-2 bg-primary-200 rounded-full transition-all"
                style={{
                  width: `${((priceRange[1] - priceRange[0]) / (initialPriceRange[1] - initialPriceRange[0] || 1)) * 100}%`,
                  left: `${((priceRange[0] - initialPriceRange[0]) / (initialPriceRange[1] - initialPriceRange[0] || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </aside>
        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLaptops.map(laptop => (
              <div
                key={laptop.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/products/${laptop.id}`)}
                title={laptop.name}
              >
                <img src={laptop.images[0]} alt={laptop.name} className="w-full h-48 object-cover rounded mb-2" />
                <h2 className="font-semibold text-lg mb-1">{laptop.name}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{laptop.description}</p>
                <div className="font-bold text-primary-600 mb-2">${laptop.price}</div>
                <div className="text-xs text-gray-500">Category: {laptop.categoryId}</div>
                <p className="mb-1">Only {laptop.stock} items left in stock</p>
                <button
                  disabled={laptop.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;