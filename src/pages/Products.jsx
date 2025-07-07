import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Package, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import ProductForm from '@/components/products/ProductForm';
import ProductList from '@/components/products/ProductList';
import ProductFilters from '@/components/products/ProductFilters';

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ searchTerm: '', category: 'all' });
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [user.id]);

  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  const loadProducts = () => {
    const savedProducts = JSON.parse(localStorage.getItem(`stockpro_products_${user.id}`) || '[]');
    setProducts(savedProducts);
  };

  const filterProducts = () => {
    let filtered = products;
    const { searchTerm, category } = filters;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleSaveProduct = (productData) => {
    if (!user.isPremium && products.length >= 50 && !editingProduct) {
      toast({
        title: "Limite atingido",
        description: "Contas Free podem ter até 50 produtos. Upgrade para Premium!",
        variant: "destructive",
      });
      return;
    }

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? productData : p);
      toast({
        title: "Produto atualizado!",
        description: "As informações do produto foram atualizadas com sucesso.",
      });
    } else {
      updatedProducts = [...products, productData];
      toast({
        title: "Produto adicionado!",
        description: "Novo produto foi adicionado ao estoque.",
      });
    }

    localStorage.setItem(`stockpro_products_${user.id}`, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem(`stockpro_products_${user.id}`, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    toast({
      title: "Produto removido!",
      description: "O produto foi removido do estoque.",
    });
  };

  const handleCancelForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>Produtos - StockPro</title>
        <meta name="description" content="Gerencie seus produtos e controle de estoque no StockPro." />
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
              <Package className="w-8 h-8 mr-3" />
              Produtos
            </h1>
            <p className="text-gray-300 mt-1">
              {!user.isPremium && `${products.length}/50 produtos (Conta Free)`}
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Novo Produto
          </Button>
        </motion.div>

        <ProductFilters filters={filters} setFilters={setFilters} />

        {showForm && (
          <ProductForm
            editingProduct={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        )}

        <ProductList
          products={filteredProducts}
          allProductsCount={products.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddFirstProduct={() => setShowForm(true)}
        />
      </div>
    </Layout>
  );
};

export default Products;