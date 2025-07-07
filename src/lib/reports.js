export const generateReportData = (userId, period) => {
  const sales = JSON.parse(localStorage.getItem(`stockpro_sales_${userId}`) || '[]');
  const products = JSON.parse(localStorage.getItem(`stockpro_products_${userId}`) || '[]');
  const customers = JSON.parse(localStorage.getItem(`stockpro_customers_${userId}`) || '[]');

  const now = new Date();
  let startDate;

  switch (period) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'quarter':
      startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const periodSales = sales.filter(sale => new Date(sale.date) >= startDate);
  const paidSales = periodSales.filter(sale => sale.status === 'paid');
  const revenue = paidSales.reduce((total, sale) => total + sale.total, 0);
  const newCustomers = customers.filter(customer => new Date(customer.createdAt) >= startDate).length;
  const newProducts = products.filter(product => new Date(product.createdAt) >= startDate).length;

  const productSales = {};
  periodSales.forEach(sale => {
    if (productSales[sale.productId]) {
      productSales[sale.productId].quantity += sale.quantity;
      productSales[sale.productId].revenue += sale.total;
    } else {
      productSales[sale.productId] = {
        id: sale.productId,
        name: sale.productName,
        quantity: sale.quantity,
        revenue: sale.total
      };
    }
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const recentSales = sales
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const lowStockProducts = products.filter(product => product.quantity <= product.minStock);

  return {
    sales: periodSales,
    revenue,
    totalSales: periodSales.length,
    newCustomers,
    newProducts,
    topProducts,
    recentSales,
    lowStockProducts
  };
};