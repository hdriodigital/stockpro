import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LowStockAlert = ({ lowStockProducts }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="glass-effect border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Alerta de Estoque Baixo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                <h3 className="text-white font-semibold">{product.name}</h3>
                <p className="text-red-400 text-sm">
                  Apenas {product.quantity} em estoque (mín: {product.minStock})
                </p>
                <p className="text-gray-300 text-sm">{product.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LowStockAlert;