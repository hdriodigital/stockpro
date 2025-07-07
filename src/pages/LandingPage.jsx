import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Crown, 
  Check,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const features = [
    {
      icon: Package,
      title: 'Controle de Estoque',
      description: 'Gerencie seus produtos e estoque de forma inteligente com alertas de estoque baixo.'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Avançados',
      description: 'Acompanhe suas vendas, lucros e performance com relatórios detalhados.'
    },
    {
      icon: Users,
      title: 'Gestão de Clientes',
      description: 'Mantenha um cadastro completo de seus clientes e histórico de compras.'
    },
    {
      icon: ShoppingCart,
      title: 'Controle de Vendas',
      description: 'Registre e acompanhe todas as suas vendas com status de pagamento.'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: 'Grátis',
      description: 'Perfeito para começar',
      features: [
        'Até 50 produtos',
        'Até 20 clientes',
        'Relatórios básicos',
        'Suporte por email'
      ],
      gradient: 'free-gradient',
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 29,90/mês',
      description: 'Para empresas em crescimento',
      features: [
        'Produtos ilimitados',
        'Clientes ilimitados',
        'Relatórios avançados',
        'Alertas de estoque',
        'Suporte prioritário',
        'Backup automático'
      ],
      gradient: 'premium-gradient',
      popular: true
    }
  ];

  return (
    <>
      <Helmet>
        <title>StockPro - Sistema de Gestão de Estoque e Vendas</title>
        <meta name="description" content="Sistema completo de gestão empresarial para controlar estoque, vendas, clientes e muito mais." />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <header className="glass-effect sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">StockPro</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-primary">
                    Começar Grátis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Gerencie seu negócio</span>
                <br />
                <span className="text-white">com inteligência</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Sistema completo de gestão empresarial para controlar estoque, vendas, clientes e muito mais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="btn-primary text-lg px-8 py-4">
                    Começar Grátis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10">
                  Ver Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 gradient-text">
                Recursos Poderosos
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Tudo que você precisa para gerenciar seu negócio em um só lugar
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 card-hover h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-center">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 gradient-text">
                Planos Flexíveis
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Escolha o plano ideal para o seu negócio
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className={`glass-effect border-white/20 card-hover relative ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Mais Popular
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold mb-2">
                        <span className={`bg-${plan.gradient} bg-clip-text text-transparent`}>
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-gray-300">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300">
                            <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Link to="/register" className="block">
                        <Button className={`w-full bg-${plan.gradient} hover:opacity-90 text-white font-semibold`}>
                          {plan.name === 'Free' ? 'Começar Grátis' : 'Escolher Premium'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: TrendingUp, number: '10k+', label: 'Empresas Ativas' },
                { icon: Shield, number: '99.9%', label: 'Uptime Garantido' },
                { icon: Zap, number: '24/7', label: 'Suporte Disponível' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="glass-effect p-8 rounded-lg border border-white/20"
                >
                  <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-12 rounded-2xl border border-white/20"
            >
              <h2 className="text-4xl font-bold mb-4 gradient-text">
                Pronto para revolucionar seu negócio?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de empresas que já transformaram sua gestão com o StockPro
              </p>
              <Link to="/register">
                <Button size="lg" className="btn-primary text-lg px-8 py-4">
                  Começar Agora - É Grátis!
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">StockPro</span>
            </div>
            <p className="text-gray-400">
              © 2024 StockPro. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;