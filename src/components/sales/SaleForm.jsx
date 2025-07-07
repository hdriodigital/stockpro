import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const SaleForm = ({ editingSale, customers, products, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    productId: '',
    quantity: '1',
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  });

  const statusOptions = [
    { value: 'paid', label: 'Pago' },
    { value: 'pending', label: 'Pendente' },
    { value: 'overdue', label: 'Vencido' }
  ];

  useEffect(() => {
    if (editingSale) {
      setFormData({
        customerId: editingSale.customerId,
        productId: editingSale.productId,
        quantity: editingSale.quantity.toString(),
        status: editingSale.status,
        date: editingSale.date
      });
    } else {
      setFormData({
        customerId: '',
        productId: '',
        quantity: '1',
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editingSale]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedProduct = products.find(p => p.id === formData.productId);
    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    
    if (!selectedProduct || !selectedCustomer) {
      toast({ title: "Erro na venda", description: "Selecione um cliente e produto válidos.", variant: "destructive" });
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (quantity > selectedProduct.quantity && !editingSale) {
      toast({ title: "Estoque insuficiente", description: `Apenas ${selectedProduct.quantity} unidades disponíveis.`, variant: "destructive" });
      return;
    }

    const total = selectedProduct.price * quantity;
    
    const saleData = {
      ...formData,
      quantity,
      total,
      productName: selectedProduct.name,
      customerName: selectedCustomer.name,
      unitPrice: selectedProduct.price,
      id: editingSale ? editingSale.id : Date.now().toString(),
      createdAt: editingSale ? editingSale.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(saleData, !!editingSale);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">{editingSale ? 'Editar Venda' : 'Nova Venda'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerId" className="text-white">Cliente</Label>
                <Select value={formData.customerId} onValueChange={(value) => setFormData({...formData, customerId: value})}>
                  <SelectTrigger className="input-field"><SelectValue placeholder="Selecione um cliente" /></SelectTrigger>
                  <SelectContent>{customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="productId" className="text-white">Produto</Label>
                <Select value={formData.productId} onValueChange={(value) => setFormData({...formData, productId: value})}>
                  <SelectTrigger className="input-field"><SelectValue placeholder="Selecione um produto" /></SelectTrigger>
                  <SelectContent>{products.filter(p => p.quantity > 0 || p.id === formData.productId).map(p => <SelectItem key={p.id} value={p.id}>{p.name} - R$ {p.price.toFixed(2)} ({p.quantity} disp.)</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-white">Quantidade</Label>
                <Input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} className="input-field" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="input-field"><SelectValue /></SelectTrigger>
                  <SelectContent>{statusOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">Data</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} className="input-field" required />
              </div>
            </div>
            {formData.productId && formData.quantity && (
              <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-white font-semibold">Total: R$ {(products.find(p => p.id === formData.productId)?.price * parseInt(formData.quantity) || 0).toFixed(2)}</p>
              </div>
            )}
            <div className="flex gap-4">
              <Button type="submit" className="btn-primary">{editingSale ? 'Atualizar' : 'Registrar'} Venda</Button>
              <Button type="button" onClick={onCancel} className="btn-secondary">Cancelar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SaleForm;