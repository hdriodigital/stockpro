import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BarChart3, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { generateReportData } from '@/lib/reports';
import ReportStatCards from '@/components/reports/ReportStatCards';
import TopProductsCard from '@/components/reports/TopProductsCard';
import RecentSalesCard from '@/components/reports/RecentSalesCard';
import LowStockAlert from '@/components/reports/LowStockAlert';
import PeriodSummary from '@/components/reports/PeriodSummary';

const Reports = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState('month');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const data = generateReportData(user.id, period);
    setReportData(data);
  }, [user.id, period]);

  const handleExportReport = () => {
    if (!user.isPremium) {
      toast({
        title: "Recurso Premium",
        description: "Exportação de relatórios está disponível apenas para contas Premium.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "🚧 Esta funcionalidade não está implementada ainda—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const periodLabels = {
    week: 'Última Semana',
    month: 'Este Mês',
    quarter: 'Este Trimestre',
    year: 'Este Ano'
  };

  if (!reportData) {
    return <Layout><div>Carregando relatórios...</div></Layout>;
  }

  return (
    <Layout>
      <Helmet>
        <title>Relatórios - StockPro</title>
        <meta name="description" content="Relatórios e análises do seu negócio no StockPro." />
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
              <BarChart3 className="w-8 h-8 mr-3" />
              Relatórios
            </h1>
            <p className="text-gray-300 mt-1">
              Análise detalhada do seu negócio - {periodLabels[period]}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48 input-field">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleExportReport} className="btn-primary">
              <Download className="w-5 h-5 mr-2" />
              Exportar
            </Button>
          </div>
        </motion.div>

        <ReportStatCards reportData={reportData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProductsCard topProducts={reportData.topProducts} />
          <RecentSalesCard recentSales={reportData.recentSales} />
        </div>

        {reportData.lowStockProducts.length > 0 && (
          <LowStockAlert lowStockProducts={reportData.lowStockProducts} />
        )}

        <PeriodSummary sales={reportData.sales} />
      </div>
    </Layout>
  );
};

export default Reports;