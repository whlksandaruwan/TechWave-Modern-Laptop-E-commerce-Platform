import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { createLaptop } from '../../lib/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    processor: '',
    ram: '',
    storage: '',
    display: '',
    inStock: true,
  });

  useEffect(() => {
    document.title = 'Add Product - TechWave Admin';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createLaptop({
        brand: formData.brand,
        model: formData.model,
        price: Number(formData.price),
        processor: formData.processor,
        ram: formData.ram,
        storage: formData.storage,
        display: formData.display,
        inStock: formData.inStock,
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
      className="max-w-xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="brand">
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            required
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="model">
            Model
          </label>
          <input
            id="model"
            name="model"
            type="text"
            required
            value={formData.model}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="price">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="processor">
            Processor
          </label>
          <input
            id="processor"
            name="processor"
            type="text"
            required
            value={formData.processor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="ram">
            RAM
          </label>
          <input
            id="ram"
            name="ram"
            type="text"
            required
            value={formData.ram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="storage">
            Storage
          </label>
          <input
            id="storage"
            name="storage"
            type="text"
            required
            value={formData.storage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="display">
            Display
          </label>
          <input
            id="display"
            name="display"
            type="text"
            required
            value={formData.display}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            checked={formData.inStock}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="inStock" className="text-sm">
            In Stock
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </motion.div>
  );
};

export default AddProduct;
