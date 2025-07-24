import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}
