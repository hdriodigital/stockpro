import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PeriodSummary = ({ sales }) => {
  const paidSales = sales.filter(s => s.status === 'paid').length;
  const pendingSales = sales.filter(s => s.status === 'pending').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Resumo do Período
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhum dado para o período</h3>
              <p className="text-gray-300">
                Selecione um período diferente ou comece registrando vendas para ver os relatórios.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{sales.length}</div>
                <p className="text-gray-300">Vendas Realizadas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{paidSales}</div>
                <p className="text-gray-300">Vendas Pagas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{pendingSales}</div>
                <p className="text-gray-300">Vendas Pendentes</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PeriodSummary;