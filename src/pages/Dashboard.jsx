import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
    monthlyRevenue: 0,
    lowStockProducts: 0,
    pendingSales: 0
  });

  useEffect(() => {
    const loadStats = () => {
      const products = JSON.parse(localStorage.getItem(`stockpro_products_${user.id}`) || '[]');
      const customers = JSON.parse(localStorage.getItem(`stockpro_customers_${user.id}`) || '[]');
      const sales = JSON.parse(localStorage.getItem(`stockpro_sales_${user.id}`) || '[]');
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlySales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
      });
      
      const monthlyRevenue = monthlySales
        .filter(sale => sale.status === 'paid')
        .reduce((total, sale) => total + sale.total, 0);
      
      const lowStockProducts = products.filter(product => product.quantity <= 10).length;
      const pendingSales = sales.filter(sale => sale.status === 'pending').length;
      
      setStats({
        totalProducts: products.length,
        totalCustomers: customers.length,
        totalSales: sales.length,
        monthlyRevenue,
        lowStockProducts,
        pendingSales
      });
    };

    loadStats();
  }, [user.id]);

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Clientes',
      value: stats.totalCustomers,
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    {
      title: 'Vendas do Mês',
      value: stats.totalSales,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      change: '+15%'
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      change: '+23%'
    }
  ];

  const alertCards = [
    {
      title: 'Estoque Baixo',
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      description: 'produtos com estoque baixo'
    },
    {
      title: 'Vendas Pendentes',
      value: stats.pendingSales,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      description: 'vendas aguardando pagamento'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Dashboard - StockPro</title>
        <meta name="description" content="Painel de controle do StockPro com visão geral do seu negócio." />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Olá, {user?.name}! 👋
          </h1>
          <p className="text-gray-300">
            Aqui está um resumo do seu negócio hoje
          </p>
        </motion.div>

        {/* Stats Cards */}
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
                      <p className="text-green-400 text-sm mt-1">{stat.change} vs mês anterior</p>
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

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alertCards.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm font-medium">{alert.title}</p>
                      <p className="text-3xl font-bold text-white mt-1">{alert.value}</p>
                      <p className="text-gray-400 text-sm mt-1">{alert.description}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${alert.color} rounded-lg flex items-center justify-center`}>
                      <alert.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 cursor-pointer hover:scale-105 transition-transform">
                  <Package className="w-8 h-8 text-blue-400 mb-2" />
                  <h3 className="font-semibold text-white">Adicionar Produto</h3>
                  <p className="text-gray-300 text-sm">Cadastre novos produtos no estoque</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30 cursor-pointer hover:scale-105 transition-transform">
                  <Users className="w-8 h-8 text-green-400 mb-2" />
                  <h3 className="font-semibold text-white">Novo Cliente</h3>
                  <p className="text-gray-300 text-sm">Cadastre um novo cliente</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30 cursor-pointer hover:scale-105 transition-transform">
                  <ShoppingCart className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="font-semibold text-white">Nova Venda</h3>
                  <p className="text-gray-300 text-sm">Registre uma nova venda</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Bem-vindo ao StockPro! Comece adicionando seus primeiros produtos.</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Sua conta Free está ativa. Upgrade para Premium para recursos avançados.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;