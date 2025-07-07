import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileInfoCard = ({ isEditing, setIsEditing, formData, setFormData, handleSave, user }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Informações Pessoais
            </CardTitle>
            <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="btn-primary">
              {isEditing ? 'Salvar' : 'Editar'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nome completo</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="input-field" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input-field" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Telefone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="input-field" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">Empresa</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} className="input-field" disabled={!isEditing} />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Status da Conta</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {user?.isPremium ? (
                      <>
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">Premium</span>
                      </>
                    ) : (
                      <span className="text-gray-400">Free</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">
                    Membro desde {new Date(user?.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileInfoCard;