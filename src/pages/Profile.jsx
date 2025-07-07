import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Settings, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import AccountSecurityCard from '@/components/profile/AccountSecurityCard';
import PlanInfo from '@/components/profile/PlanInfo';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || ''
  });

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('stockpro_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...formData, updatedAt: new Date().toISOString() } : u
    );
    
    localStorage.setItem('stockpro_users', JSON.stringify(updatedUsers));
    localStorage.setItem('stockpro_user', JSON.stringify({ ...user, ...formData }));
    
    setIsEditing(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Perfil - StockPro</title>
        <meta name="description" content="Gerencie seu perfil e configurações no StockPro." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white flex items-center">
            <User className="w-8 h-8 mr-3" />
            Meu Perfil
          </h1>
          <p className="text-gray-300 mt-1">
            Gerencie suas informações pessoais e configurações da conta
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileInfoCard
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
              setFormData={setFormData}
              handleSave={handleSave}
              user={user}
            />
            <AccountSecurityCard />
          </div>
          <PlanInfo user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;