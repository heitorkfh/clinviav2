
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Logo } from '../components/ui/logo';
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  BarChart3, 
  Shield, 
  Smartphone,
  Clock,
  MessageSquare,
  CheckCircle,
  Star
} from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Agendamento Inteligente',
      description: 'Sistema automatizado com IA para otimizar horários e reduzir faltas.'
    },
    {
      icon: Users,
      title: 'Gestão de Pacientes',
      description: 'Cadastro completo, histórico médico e comunicação integrada.'
    },
    {
      icon: Stethoscope,
      title: 'Prontuário Digital',
      description: 'Prontuários eletrônicos seguros e acessíveis de qualquer lugar.'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Analítico',
      description: 'Relatórios detalhados e insights para otimizar sua clínica.'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Dados protegidos com criptografia e conformidade LGPD.'
    },
    {
      icon: Smartphone,
      title: 'Acesso Mobile',
      description: 'Interface responsiva para acesso em qualquer dispositivo.'
    }
  ];

  const benefits = [
    'Redução de 60% nas faltas de pacientes',
    'Economia de 3 horas diárias na gestão',
    'Aumento de 40% na satisfação dos pacientes',
    'Conformidade total com LGPD'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button 
                className="bg-gradient-clinvia hover:opacity-90"
                onClick={() => navigate('/agendar')}
              >
                Agendar Consulta
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-clinvia text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Sistema de Agendamento
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
                Inteligente para Clínicas
              </span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Transforme sua clínica com nossa plataforma completa de gestão.
              Agendamento automatizado, prontuários digitais e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => navigate('/agendar')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate('/login')}
              >
                Acessar Sistema
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Completas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para modernizar sua clínica em uma única plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-gradient-clinvia p-3 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Resultados Comprovados
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Milhares de clínicas já transformaram sua gestão com o Clinvia.
                Veja os resultados que você pode alcançar:
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-clinvia p-8 rounded-2xl text-white">
              <div className="text-center">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Comece em Minutos
                </h3>
                <p className="mb-6">
                  Configure sua clínica e comece a agendar consultas hoje mesmo.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate('/login')}
                >
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Modernizar sua Clínica?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já escolheram o Clinvia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-clinvia hover:opacity-90"
              onClick={() => navigate('/agendar')}
            >
              Agendar Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" className="mb-4" />
              <p className="text-gray-600">
                Sistema completo de gestão para clínicas modernas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Funcionalidades</li>
                <li>Preços</li>
                <li>Segurança</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>WhatsApp</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Clinvia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
