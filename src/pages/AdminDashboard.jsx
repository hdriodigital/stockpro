import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Crown, 
  Shield, 
  ToggleLeft, 
  ToggleRight,
  UserCheck,
  UserX,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout, updateUserPlan } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('stockpro_users') || '[]');
    setUsers(allUsers);
  };

  const handleTogglePremium = (userId, currentStatus) => {
    updateUserPlan(userId, !currentStatus);
    loadUsers();
    
    toast({
      title: currentStatus ? "Premium desativado" : "Premium ativado",
      description: `Conta ${currentStatus ? 'downgrade para Free' : 'upgrade para Premium'} realizado com sucesso.`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const stats = {
    totalUsers: users.length,
    premiumUsers: users.filter(u => u.isPremium).length,
    freeUsers: users.filter(u => !u.isPremium).length
  };

  return (
    <>
      <Helmet>
        <title>Painel Administrativo - StockPro</title>
        <meta name="description" content="Painel de administração do StockPro para gerenciar usuários e planos." />
      </Helmet>

      <div className="min-h-screen p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Shield className="w-8 h-8 mr-3 text-red-400" />
              Painel Administrativo
            </h1>
            <p className="text-gray-300 mt-1">Gerencie usuários e planos do StockPro</p>
          </motion.div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Total de Usuários</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Usuários Premium</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-1">{stats.premiumUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Usuários Free</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">{stats.freeUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Usuários Cadastrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="text-center py-12">
                  <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Nenhum usuário cadastrado</h3>
                  <p className="text-gray-300">Os usuários aparecerão aqui quando se cadastrarem.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          <p className="text-gray-300 text-sm">{user.email}</p>
                          <p className="text-gray-400 text-xs">{user.company}</p>
                          <p className="text-gray-400 text-xs">
                            Cadastrado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {user.isPremium ? (
                            <>
                              <Crown className="w-5 h-5 text-yellow-400" />
                              <span className="text-yellow-400 font-semibold">Premium</span>
                            </>
                          ) : (
                            <span className="text-gray-400">Free</span>
                          )}
                        </div>

                        <Button
                          onClick={() => handleTogglePremium(user.id, user.isPremium)}
                          variant="outline"
                          size="sm"
                          className={`border-white/20 ${
                            user.isPremium 
                              ? 'text-red-400 hover:bg-red-500/20' 
                              : 'text-green-400 hover:bg-green-500/20'
                          }`}
                        >
                          {user.isPremium ? (
                            <>
                              <ToggleRight className="w-4 h-4 mr-1" />
                              Desativar Premium
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 mr-1" />
                              Ativar Premium
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AdminDashboard;