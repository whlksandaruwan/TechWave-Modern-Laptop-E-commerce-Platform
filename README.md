# TechWave - Modern Laptop E-commerce Platform

A fully functional, modern laptop e-commerce platform built with React, TypeScript, NestJS, and MySQL.

## 🚀 Features

### **Frontend Features:**
- ✅ **Modern UI/UX** - Dark theme with gradient effects and animations
- ✅ **Responsive Design** - Works perfectly on all devices
- ✅ **Product Catalog** - Browse laptops with filtering and search
- ✅ **Shopping Cart** - Add, remove, and manage cart items
- ✅ **Wishlist** - Save favorite products for later
- ✅ **User Authentication** - Login, register, and profile management
- ✅ **Order Management** - Place orders and track order status
- ✅ **Admin Dashboard** - Complete admin panel for managing products, orders, and users
- ✅ **Real-time Chatbot** - AI-powered customer support
- ✅ **Payment Integration** - Secure checkout process
- ✅ **Product Reviews** - Customer reviews and ratings

### **Backend Features:**
- ✅ **RESTful API** - Complete API with authentication
- ✅ **Database Management** - MySQL with TypeORM
- ✅ **Order Processing** - Full order lifecycle management
- ✅ **Cart Management** - Persistent shopping cart
- ✅ **Wishlist System** - User wishlist functionality
- ✅ **User Management** - User registration, authentication, and profiles
- ✅ **Admin Panel** - Complete admin functionality
- ✅ **Product Management** - CRUD operations for products
- ✅ **Category Management** - Product categorization
- ✅ **Analytics** - Sales and user analytics

## 🛠️ Tech Stack

### **Frontend:**
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Zustand for state management
- Axios for API calls

### **Backend:**
- NestJS with TypeScript
- TypeORM for database management
- MySQL database
- JWT authentication
- Passport.js for auth strategies
- Class-validator for validation

## 📦 Installation

### **Prerequisites:**
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### **Quick Start:**

1. **Clone the repository:**
```bash
git clone <repository-url>
cd techwave-laptop-store
```

2. **Install all dependencies:**
```bash
npm run install:all
```

3. **Set up the database:**
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE Lap;
```

4. **Seed the database:**
```bash
npm run seed
```

5. **Start the development servers:**
```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 🗄️ Database Setup

### **MySQL Configuration:**
```sql
CREATE DATABASE Lap;
USE Lap;
```

### **Environment Variables:**
Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (.env):**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=Kavindu2003
DB_DATABASE=Lap
JWT_SECRET=your-secret-key
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000/api
```

## 🎯 Available Scripts

```bash
# Development
npm run dev                    # Start both frontend and backend
npm run dev:frontend          # Start frontend only
npm run dev:backend           # Start backend only

# Production
npm run build                 # Build frontend for production
npm run start                 # Start production server

# Database
npm run seed                  # Seed database with sample data
```

## 🔐 Authentication

### **User Roles:**
- **Customer** - Browse products, manage cart, place orders
- **Admin** - Full access to admin dashboard and all features
- **Manager** - Limited admin access for order management

### **Default Admin Account:**
```
Email: admin@techwave.com
Password: admin123
```

## 📱 Features Overview

### **Customer Features:**
- Browse laptop catalog with filters
- Add products to cart and wishlist
- Secure checkout process
- Order tracking and history
- User profile management
- Product reviews and ratings

### **Admin Features:**
- Product management (CRUD)
- Order management and status updates
- Customer management
- Sales analytics and reports
- Category management
- Banner management

## 🚀 Deployment

### **Frontend Deployment:**
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### **Backend Deployment:**
```bash
cd backend
npm run build
npm run start:prod
```

## 🔧 API Endpoints

### **Authentication:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### **Products:**
- `GET /api/laptops` - Get all laptops
- `GET /api/laptops/:id` - Get specific laptop
- `POST /api/laptops` - Create laptop (admin)
- `PUT /api/laptops/:id` - Update laptop (admin)
- `DELETE /api/laptops/:id` - Delete laptop (admin)

### **Cart:**
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove from cart

### **Orders:**
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### **Wishlist:**
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

## 🎨 Customization

### **Styling:**
- Modify `frontend/tailwind.config.js` for theme colors
- Update components in `frontend/src/components/`
- Customize animations in `frontend/src/components/ui/`

### **Backend:**
- Add new entities in `backend/src/`
- Create new modules following NestJS patterns
- Update API endpoints in controllers

## 🐛 Troubleshooting

### **Common Issues:**

1. **Database Connection Error:**
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Frontend Build Errors:**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify all dependencies are installed

3. **API Connection Issues:**
   - Check backend is running on port 3000
   - Verify CORS settings
   - Check API URL in frontend environment

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review the API documentation
- Check console logs for errors

## 🎉 Success!

Your TechWave laptop store is now fully functional with:
- ✅ Complete e-commerce functionality
- ✅ Modern, responsive design
- ✅ Secure authentication system
- ✅ Admin dashboard
- ✅ Shopping cart and wishlist
- ✅ Order management
- ✅ Product catalog with filtering

Enjoy your fully functional laptop e-commerce platform! 🚀 