import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentSalesCard = ({ recentSales }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Vendas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentSales.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300">Nenhuma venda registrada</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">{sale.customerName}</p>
                    <p className="text-gray-400 text-sm">{sale.productName}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(sale.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">R$ {sale.total.toFixed(2)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      sale.status === 'paid' ? 'status-paid' :
                      sale.status === 'pending' ? 'status-pending' : 'status-overdue'
                    }`}>
                      {sale.status === 'paid' ? 'Pago' : 
                       sale.status === 'pending' ? 'Pendente' : 'Vencido'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentSalesCard;