import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AccountSecurityCard = () => {
  const showToast = () => {
    toast({ title: "🚧 Esta funcionalidade não está implementada ainda—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Segurança da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Alterar Senha</p>
                <p className="text-gray-400 text-sm">Atualize sua senha para manter a conta segura</p>
              </div>
              <Button onClick={showToast} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Alterar
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Autenticação em Duas Etapas</p>
                <p className="text-gray-400 text-sm">Adicione uma camada extra de segurança</p>
              </div>
              <Button onClick={showToast} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Configurar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountSecurityCard;