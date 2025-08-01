import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { createLaptop } from '../../lib/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    specs: {
      processor: '',
      ram: '',
      storage: '',
      display: '',
      graphics: '',
      battery: ''
    },
    images: [''],
    stock: '',
    categoryId: '',
    featured: false
  });

  useEffect(() => {
    document.title = 'Add Product - TechWave Admin';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('specs.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createLaptop({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.filter(img => img.trim() !== '')
      });
      toast.success('Product added successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen bg-gray-50 flex flex-col pt-20 px-0"
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Add New Laptop</h1>
          <p className="text-gray-500 mb-8">Fill in the details below to add a new laptop to your store.</p>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="name">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="stock">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="categoryId">
                  Category ID
                </label>
                <input
                  id="categoryId"
                  name="categoryId"
                  type="text"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="specs.processor">
                    Processor
                  </label>
                  <input
                    id="specs.processor"
                    name="specs.processor"
                    type="text"
                    required
                    value={formData.specs.processor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="specs.ram">
                    RAM
                  </label>
                  <input
                    id="specs.ram"
                    name="specs.ram"
                    type="text"
                    required
                    value={formData.specs.ram}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="specs.storage">
                    Storage
                  </label>
                  <input
                    id="specs.storage"
                    name="specs.storage"
                    type="text"
                    required
                    value={formData.specs.storage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="specs.display">
                    Display
                  </label>
                  <input
                    id="specs.display"
                    name="specs.display"
                    type="text"
                    required
                    value={formData.specs.display}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="specs.graphics">
                    Graphics
                  </label>
                  <input
                    id="specs.graphics"
                    name="specs.graphics"
                    type="text"
                    required
                    value={formData.specs.graphics}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600" htmlFor="specs.battery">
                    Battery
                  </label>
                  <input
                    id="specs.battery"
                    name="specs.battery"
                    type="text"
                    required
                    value={formData.specs.battery}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Images</h3>
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Add Image URL
                </button>
              </div>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900 shadow-sm transition"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center mb-6">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2 accent-primary-600 w-4 h-4 rounded border-gray-300 focus:ring-primary-500 transition-all"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Featured Product
              </label>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="flex-1 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 font-semibold shadow-sm transition"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddProduct;
