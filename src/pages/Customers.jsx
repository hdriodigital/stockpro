import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Customers = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    loadCustomers();
  }, [user.id]);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm]);

  const loadCustomers = () => {
    const savedCustomers = JSON.parse(localStorage.getItem(`stockpro_customers_${user.id}`) || '[]');
    setCustomers(savedCustomers);
  };

  const filterCustomers = () => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    setFilteredCustomers(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user.isPremium && customers.length >= 20 && !editingCustomer) {
      toast({
        title: "Limite atingido",
        description: "Contas Free podem ter até 20 clientes. Upgrade para Premium!",
        variant: "destructive",
      });
      return;
    }

    const customerData = {
      ...formData,
      id: editingCustomer ? editingCustomer.id : Date.now().toString(),
      createdAt: editingCustomer ? editingCustomer.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedCustomers;
    if (editingCustomer) {
      updatedCustomers = customers.map(c => c.id === editingCustomer.id ? customerData : c);
      toast({
        title: "Cliente atualizado!",
        description: "As informações do cliente foram atualizadas com sucesso.",
      });
    } else {
      updatedCustomers = [...customers, customerData];
      toast({
        title: "Cliente adicionado!",
        description: "Novo cliente foi adicionado com sucesso.",
      });
    }

    localStorage.setItem(`stockpro_customers_${user.id}`, JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    resetForm();
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zipCode: customer.zipCode
    });
    setShowForm(true);
  };

  const handleDelete = (customerId) => {
    const updatedCustomers = customers.filter(c => c.id !== customerId);
    localStorage.setItem(`stockpro_customers_${user.id}`, JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    toast({
      title: "Cliente removido!",
      description: "O cliente foi removido com sucesso.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    });
    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Clientes - StockPro</title>
        <meta name="description" content="Gerencie seus clientes no StockPro." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Clientes
            </h1>
            <p className="text-gray-300 mt-1">
              {!user.isPremium && `${customers.length}/20 clientes (Conta Free)`}
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Cliente
          </Button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar clientes por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Nome do cliente"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-white">CEP</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="00000-000"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="text-white">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Rua, número, bairro"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Cidade"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-white">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="SP"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="btn-primary">
                      {editingCustomer ? 'Atualizar' : 'Adicionar'} Cliente
                    </Button>
                    <Button type="button" onClick={resetForm} className="btn-secondary">
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Customers List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredCustomers.length === 0 ? (
            <Card className="glass-effect border-white/20">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Nenhum cliente encontrado</h3>
                <p className="text-gray-300 mb-6">
                  {customers.length === 0 
                    ? 'Comece adicionando seu primeiro cliente.'
                    : 'Tente ajustar o termo de busca.'
                  }
                </p>
                {customers.length === 0 && (
                  <Button onClick={() => setShowForm(true)} className="btn-primary">
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar Primeiro Cliente
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 card-hover">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{customer.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-300">
                          <Phone className="w-4 h-4 mr-2 text-green-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                        
                        {customer.address && (
                          <div className="flex items-start text-gray-300">
                            <MapPin className="w-4 h-4 mr-2 text-red-400 mt-0.5" />
                            <span className="text-sm">
                              {customer.address}
                              {customer.city && `, ${customer.city}`}
                              {customer.state && ` - ${customer.state}`}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-xs">
                            Cadastrado em {new Date(customer.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleEdit(customer)}
                            size="sm"
                            variant="outline"
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            onClick={() => handleDelete(customer.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Customers;