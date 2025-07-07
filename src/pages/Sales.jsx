import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import SalesFilters from '@/components/sales/SalesFilters';
import SaleForm from '@/components/sales/SaleForm';
import SalesList from '@/components/sales/SalesList';

const Sales = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ searchTerm: '', status: 'all' });
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState(null);

  useEffect(() => {
    loadData();
  }, [user.id]);

  useEffect(() => {
    filterSales();
  }, [sales, filters, customers, products]);

  const loadData = () => {
    const savedSales = JSON.parse(localStorage.getItem(`stockpro_sales_${user.id}`) || '[]');
    const savedCustomers = JSON.parse(localStorage.getItem(`stockpro_customers_${user.id}`) || '[]');
    const savedProducts = JSON.parse(localStorage.getItem(`stockpro_products_${user.id}`) || '[]');
    
    setSales(savedSales);
    setCustomers(savedCustomers);
    setProducts(savedProducts);
  };

  const filterSales = () => {
    let filtered = sales;
    const { searchTerm, status } = filters;

    if (searchTerm) {
      filtered = filtered.filter(sale => {
        const customer = customers.find(c => c.id === sale.customerId);
        const product = products.find(p => p.id === sale.productId);
        return (
          customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (status !== 'all') {
      filtered = filtered.filter(sale => sale.status === status);
    }

    setFilteredSales(filtered);
  };

  const handleSaveSale = (saleData, isEditing) => {
    let updatedSales;
    if (isEditing) {
      updatedSales = sales.map(s => s.id === saleData.id ? saleData : s);
      toast({
        title: "Venda atualizada!",
        description: "As informações da venda foram atualizadas com sucesso.",
      });
    } else {
      updatedSales = [...sales, saleData];
      
      const updatedProducts = products.map(p => 
        p.id === saleData.productId 
          ? { ...p, quantity: p.quantity - saleData.quantity }
          : p
      );
      localStorage.setItem(`stockpro_products_${user.id}`, JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      
      toast({
        title: "Venda registrada!",
        description: "Nova venda foi registrada com sucesso.",
      });
    }

    localStorage.setItem(`stockpro_sales_${user.id}`, JSON.stringify(updatedSales));
    setSales(updatedSales);
    setEditingSale(null);
    setShowForm(false);
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setShowForm(true);
  };

  const handleDelete = (saleId) => {
    const updatedSales = sales.filter(s => s.id !== saleId);
    localStorage.setItem(`stockpro_sales_${user.id}`, JSON.stringify(updatedSales));
    setSales(updatedSales);
    toast({
      title: "Venda removida!",
      description: "A venda foi removida com sucesso.",
    });
  };

  const handleStatusChange = (saleId, newStatus) => {
    const updatedSales = sales.map(s => 
      s.id === saleId ? { ...s, status: newStatus, updatedAt: new Date().toISOString() } : s
    );
    localStorage.setItem(`stockpro_sales_${user.id}`, JSON.stringify(updatedSales));
    setSales(updatedSales);
    toast({
      title: "Status atualizado!",
      description: "O status da venda foi atualizado com sucesso.",
    });
  };

  const handleCancelForm = () => {
    setEditingSale(null);
    setShowForm(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Vendas - StockPro</title>
        <meta name="description" content="Gerencie suas vendas no StockPro." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <ShoppingCart className="w-8 h-8 mr-3" />
              Vendas
            </h1>
            <p className="text-gray-300 mt-1">
              Total de vendas: {sales.length}
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            disabled={customers.length === 0 || products.length === 0}
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Venda
          </Button>
        </motion.div>

        <SalesFilters filters={filters} setFilters={setFilters} />

        {showForm && (
          <SaleForm
            editingSale={editingSale}
            customers={customers}
            products={products}
            onSave={handleSaveSale}
            onCancel={handleCancelForm}
          />
        )}

        <SalesList
          sales={filteredSales}
          allSalesCount={sales.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onAddFirstSale={() => setShowForm(true)}
          customers={customers}
          products={products}
        />
      </div>
    </Layout>
  );
};

export default Sales;