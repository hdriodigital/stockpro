import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProductForm = ({ editingProduct, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    minStock: '10'
  });

  const categories = ['Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros', 'Outros'];

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        quantity: editingProduct.quantity.toString(),
        minStock: editingProduct.minStock.toString()
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        quantity: '',
        minStock: '10'
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      minStock: parseInt(formData.minStock),
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onSave(productData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nome do Produto</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Nome do produto" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="input-field">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">Preço (R$)</Label>
                <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className="input-field" placeholder="0.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-white">Quantidade</Label>
                <Input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} className="input-field" placeholder="0" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock" className="text-white">Estoque Mínimo</Label>
                <Input id="minStock" name="minStock" type="number" value={formData.minStock} onChange={handleChange} className="input-field" placeholder="10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Descrição</Label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="input-field min-h-[100px] resize-none" placeholder="Descrição do produto" rows={4} />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="btn-primary">
                {editingProduct ? 'Atualizar' : 'Adicionar'} Produto
              </Button>
              <Button type="button" onClick={onCancel} className="btn-secondary">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductForm;