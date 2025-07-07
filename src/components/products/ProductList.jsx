import React from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductList = ({ products, allProductsCount, onEdit, onDelete, onAddFirstProduct }) => {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-effect border-white/20">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-300 mb-6">
              {allProductsCount === 0 
                ? 'Comece adicionando seu primeiro produto ao estoque.'
                : 'Tente ajustar os filtros de busca.'
              }
            </p>
            {allProductsCount === 0 && (
              <Button onClick={onAddFirstProduct} className="btn-primary">
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Primeiro Produto
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className={`glass-effect border-white/20 card-hover ${
            product.quantity <= product.minStock ? 'ring-2 ring-red-500/50' : ''
          }`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <p className="text-gray-300 text-sm">{product.category}</p>
                </div>
                {product.quantity <= product.minStock && (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-400">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.quantity <= product.minStock 
                      ? 'low-stock' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {product.quantity} em estoque
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={() => onEdit(product)} size="sm" variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button onClick={() => onDelete(product.id)} size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductList;