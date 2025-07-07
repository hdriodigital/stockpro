import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Edit, Trash2, Calendar, DollarSign, User, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SalesList = ({ sales, allSalesCount, onEdit, onDelete, onStatusChange, onAddFirstSale, customers, products }) => {
  const statusOptions = [
    { value: 'paid', label: 'Pago', class: 'status-paid' },
    { value: 'pending', label: 'Pendente', class: 'status-pending' },
    { value: 'overdue', label: 'Vencido', class: 'status-overdue' }
  ];

  const getStatusInfo = (status) => {
    return statusOptions.find(s => s.value === status) || statusOptions[1];
  };

  if (sales.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-effect border-white/20">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhuma venda encontrada</h3>
            <p className="text-gray-300 mb-6">
              {allSalesCount === 0 
                ? 'Comece registrando sua primeira venda.'
                : 'Tente ajustar os filtros de busca.'
              }
            </p>
            {allSalesCount === 0 && customers.length > 0 && products.length > 0 && (
              <Button onClick={onAddFirstSale} className="btn-primary">
                <Plus className="w-5 h-5 mr-2" />
                Registrar Primeira Venda
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
      className="space-y-4"
    >
      {sales.map((sale, index) => {
        const statusInfo = getStatusInfo(sale.status);
        return (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-semibold">{sale.customerName}</p>
                        <p className="text-gray-400 text-sm">Cliente</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-semibold">{sale.productName}</p>
                        <p className="text-gray-400 text-sm">{sale.quantity}x R$ {sale.unitPrice.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-semibold">R$ {sale.total.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm">Total</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-semibold">{new Date(sale.date).toLocaleDateString('pt-BR')}</p>
                        <p className="text-gray-400 text-sm">Data</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={sale.status} onValueChange={(value) => onStatusChange(sale.id, value)}>
                      <SelectTrigger className={`w-32 ${statusInfo.class} border-0`}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button onClick={() => onEdit(sale)} size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10"><Edit className="w-4 h-4" /></Button>
                      <Button onClick={() => onDelete(sale.id)} size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SalesList;