import React from 'react';
import { motion } from 'framer-motion';
import { Crown, CreditCard, ExternalLink, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const PlanInfo = ({ user }) => {
  const handleUpgradeToPremium = () => {
    window.open('https://buy.stripe.com/14AfZidWkamv5gS3Q16Zy00', '_blank');
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será redirecionado para completar o upgrade para Premium.",
    });
  };

  const premiumFeatures = [
    'Produtos ilimitados',
    'Clientes ilimitados',
    'Relatórios avançados',
    'Exportação de dados',
    'Alertas de estoque',
    'Suporte prioritário',
    'Backup automático',
    'Integrações avançadas'
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className={`glass-effect border-white/20 ${user?.isPremium ? 'ring-2 ring-yellow-400/50' : ''}`}>
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              {user?.isPremium ? (
                <>
                  <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                  Plano Premium
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Plano Free
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user?.isPremium ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">Premium</div>
                  <p className="text-gray-300">Você tem acesso a todos os recursos!</p>
                </div>
                <div className="space-y-2">
                  {premiumFeatures.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button onClick={() => toast({ title: "🚧 Esta funcionalidade não está implementada ainda—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" })} variant="outline" className="w-full border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/20">
                  Gerenciar Assinatura
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">Plano Free</div>
                  <p className="text-gray-300 text-sm">Limitações aplicáveis</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300"><span>Produtos:</span><span>50 máximo</span></div>
                  <div className="flex justify-between text-gray-300"><span>Clientes:</span><span>20 máximo</span></div>
                  <div className="flex justify-between text-gray-300"><span>Relatórios:</span><span>Básicos</span></div>
                </div>
                <Button onClick={handleUpgradeToPremium} className="w-full premium-gradient text-white font-semibold">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade para Premium
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {!user?.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Benefícios Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 text-yellow-400 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">R$ 29,90/mês</div>
                  <p className="text-gray-300 text-sm">Cancele a qualquer momento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PlanInfo;