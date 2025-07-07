import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ReportStatCards = ({ reportData }) => {
  const statCards = [
    {
      title: 'Receita Total',
      value: `R$ ${reportData.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      change: '+15%'
    },
    {
      title: 'Total de Vendas',
      value: reportData.totalSales,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      change: '+8%'
    },
    {
      title: 'Novos Clientes',
      value: reportData.newCustomers,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      change: '+12%'
    },
    {
      title: 'Novos Produtos',
      value: reportData.newProducts,
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      change: '+5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="glass-effect border-white/20 card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change} vs período anterior</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ReportStatCards;