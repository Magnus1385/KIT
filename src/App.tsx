import React, { useEffect } from 'react';
import { Check, Clock, Users, Zap, Star, ChevronDown, Gift, X } from 'lucide-react';

// Função para disparar eventos do Pixel
const trackFbqEvent = (eventName: string) => {
  if (window.fbq) {
    window.fbq('track', eventName);
  }
};

// Componente de notificações de compra
function PurchaseNotifications() {
  const [notifications, setNotifications] = React.useState<Array<{
    id: number;
    name: string;
    city: string;
    timeAgo: number;
  }>>([]);
  const [nextId, setNextId] = React.useState(1);

  const names = [
    'Maria Silva', 'Ana Costa', 'Juliana Santos', 'Carla Oliveira', 'Fernanda Lima',
    'Patricia Souza', 'Renata Ferreira', 'Camila Rodrigues', 'Luciana Alves', 'Gabriela Martins',
    'Daniela Pereira', 'Mariana Barbosa', 'Tatiana Ribeiro', 'Vanessa Cardoso', 'Priscila Nascimento',
    'Roberta Dias', 'Cristina Moreira', 'Simone Araújo', 'Leticia Gomes', 'Adriana Castro'
  ];

  const cities = [
    'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Salvador - BA',
    'Brasília - DF', 'Fortaleza - CE', 'Curitiba - PR', 'Recife - PE', 'Porto Alegre - RS',
    'Manaus - AM', 'Belém - PA', 'Goiânia - GO', 'Guarulhos - SP', 'Campinas - SP',
    'São Luís - MA', 'Maceió - AL', 'Duque de Caxias - RJ', 'Natal - RN'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const timeAgo = Math.floor(Math.random() * 30) + 1;
      
      const newNotification = {
        id: nextId,
        name: randomName,
        city: randomCity,
        timeAgo: timeAgo
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setNextId(prev => prev + 1);

      // Remove notification after 8 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 8000);
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds

    return () => clearInterval(interval);
  }, [nextId]);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 space-y-3 hidden lg:block">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm notification-slide-in"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{notification.name}</p>
                <p className="text-xs text-gray-600">{notification.city}</p>
                <p className="text-xs text-green-600 font-medium">Acabou de comprar o Kit!</p>
                <p className="text-xs text-gray-500">{notification.timeAgo} min atrás</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// FAQ Component with interactivity
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div 
        className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{question}</h3>
          <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 bg-gray-50">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  
  // Efeito para carregar e inicializar o Meta Pixel
  useEffect(() => {
    if (!window.fbq) {
      window.fbq = function() {
        window.fbq.callMethod ?
        window.fbq.callMethod.apply(window.fbq, arguments) :
        window.fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    window.fbq('init', '791810663260950');
    window.fbq('track', 'PageView');
    
    return () => {
      // Verifica se o script ainda é filho do head antes de remover
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PurchaseNotifications />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            CHEGA DE CONTEÚDO SEM RESULTADO:<br />
            <span className="text-yellow-300 animate-pulse">Com o Método 60k</span><br />
            O Método Secreto que levou clínicas á mais de R$60mil de faturamento.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-4xl mx-auto leading-relaxed">
            O Método 60k vai economizar <strong>95% do seu tempo</strong> na criação de conteúdo.
            Conteúdo que Vende, acesso Vitalício e <strong>Zero Mensalidades!</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="text-sm text-purple-200">
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Método secreto e prático</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Scripts validados</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Estratégias Validadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Você Está Cansada de...
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Perder Horas Criando Conteúdo?</h3>
              <p className="text-gray-600 text-center">Ficar horas tentando criar conteúdo e nunca te dá resultados bons, as pessoa mal curtem ou comentam</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Agenda Sempre Vazia?</h3>
              <p className="text-gray-600 text-center">Com o método 60k você vai ter um passo a passo do que executar pra enxer sua agenda.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Tá sem criatividade pra conteúdo?</h3>
              <p className="text-gray-600 text-center">Não ter fotos profissionais que mostrem a qualidade do seu trabalho e conquistem clientes?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-800">
            A Solução Está Aqui! ✨
          </h2>
          <p className="text-xl md:text-2xl mb-16 text-gray-600 max-w-4xl mx-auto">
            Apresentamos o <strong className="text-purple-600">Kit Marketing Estético</strong> - 
            a solução definitiva para profissionais de estética que querem <strong>RESULTADOS REAIS</strong> sem perder tempo criando fotos do zero.
          </p>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            O Que Você Recebe ao Garantir o seu Kit Marketing estético Hoje?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-purple-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">+130 Fotos Validadas</h3>
              <p className="text-gray-600 mb-4">Fotos de alta qualidade para Reels, Stories e Posts. Focadas em todos os procedimentos!</p>
              <div className="text-sm text-purple-600 font-semibold">✅ Qualidade Profissional</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-pink-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">95% de Tempo Economizado</h3>
              <p className="text-gray-600 mb-4">Pare de perder horas criando fotos! Com nossas imagens profissionais, você só precisa baixar e postar com sua marca.</p>
              <div className="text-sm text-pink-600 font-semibold">⏰ Mais Tempo para Atender</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-orange-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Acesso Vitalício</h3>
              <p className="text-gray-600 mb-4">Pagamento único! Sem mensalidades, sem taxas escondidas. Acesse quando quiser, para sempre!</p>
              <div className="text-sm text-orange-600 font-semibold">💎 Investimento Único</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Scripts por Especialidade</h3>
              <p className="text-gray-600 mb-4">Fotos segmentadas: Harmonização facial, Limpeza de pele, Massagens, Sobrancelhas, Cuidados capilares e muito mais!</p>
              <div className="text-sm text-green-600 font-semibold">🎯 Totalmente Personalizado</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Gatilhos de Vendas</h3>
              <p className="text-gray-600 mb-4">Fotos com composições que despertam o desejo e fazem suas seguidoras correrem para agendar com você!</p>
              <div className="text-sm text-blue-600 font-semibold">🧠 Psicologia Aplicada</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-yellow-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">3 Bônus Exclusivos</h3>
              <p className="text-gray-600 mb-4">GRÁTIS: 150 Scripts Validados + Guia de Vídeos que Vendem + Gatilhos Mentais para Vendas na Estética!</p>
              <div className="text-sm text-yellow-600 font-semibold">🎁 Valor Extra R$ 00</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Quem Já Usou, Aprovou e Lotou a Agenda! ⭐⭐⭐⭐⭐
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"Em apenas 2 semanas usando as fotos profissionais, minha agenda estava completamente lotada! As imagens fazem toda a diferença na atração de clientes."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-bold">MC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Marina Costa</div>
                  <div className="text-sm text-gray-600">Esteticista - São Paulo</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"As fotos são incríveis! Economizei mais de 10 horas por semana sem precisar fazer sessões fotográficas. Meu faturamento triplicou com as fotos Validadas!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-700 font-bold">JS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Juliana Santos</div>
                  <div className="text-sm text-gray-600">Designer de Sobrancelhas - RJ</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"As fotos são de qualidade profissional! Minhas postagens agora têm muito mais engajamento e recebo mensagens todos os dias pedindo para agendar. Recomendo demais!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-orange-700 font-bold">RF</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Renata Ferreira</div>
                  <div className="text-sm text-gray-600">Terapeuta Capilar - MG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            🔥 OFERTA ESPECIAL DE LANÇAMENTO! 🔥
          </h2>
          
          {/* Value Stack */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-yellow-300">🎁 TUDO QUE VOCÊ LEVA HOJE:</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center bg-white/10 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-lg">✅ Kit de Fotos Profissionais - +130 Imagens</div>
                  <div className="text-sm text-purple-200">Fotos de alta qualidade para Reels, Stories e Posts</div>
                </div>
                <div className="text-right">
                  <div className="line-through text-red-300">R$ 97</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-white/10 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-lg">📝 BÔNUS #1: 150 Scripts Validados</div>
                  <div className="text-sm text-purple-200">Scripts prontos para acompanhar suas fotos</div>
                </div>
                <div className="text-right">
                  <div className="line-through text-red-300">R$ 97</div>
                  <div className="text-green-300 font-bold">GRÁTIS</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-white/10 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-lg">🎥 BÔNUS #2: Guia de Vídeos que Vendem</div>
                  <div className="text-sm text-purple-200">Roteiros completos para criar vídeos irresistíveis</div>
                </div>
                <div className="text-right">
                  <div className="line-through text-red-300">R$ 50</div>
                  <div className="text-green-300 font-bold">GRÁTIS</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-white/10 rounded-lg p-4">
                <div>
                  <div className="font-semibold text-lg">🧠 BÔNUS #3: Guia de Gatilhos Mentais para Vendas</div>
                  <div className="text-sm text-purple-200">Técnicas avançadas de persuasão aplicadas à estética</div>
                </div>
                <div className="text-right">
                  <div className="line-through text-red-300">R$ 146</div>
                  <div className="text-green-300 font-bold">GRÁTIS</div>
                </div>
              </div>
              
              <div className="border-t-2 border-yellow-300 pt-4 mt-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <div>VALOR TOTAL:</div>
                  <div className="line-through text-red-300">R$ 390</div>
                </div>
                <div className="text-center mt-4">
                  <div className="text-lg mb-2">HOJE VOCÊ PAGA APENAS:</div>
                  <div className="text-6xl font-bold text-yellow-300 mb-2 animate-pulse">R$ 26,63</div>
                  <div className="text-lg">💳 Pagamento único - Sem mensalidades!</div>
                  <div className="text-sm text-green-300 font-semibold mt-2">
                    💰 ECONOMIA DE R$ 363 (93% OFF)
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xl mb-8">⚠️ Esta oferta é por TEMPO LIMITADO e para as primeiras 100 pessoas!</p>
          <a
            href="https://pay.kiwify.com.br/QvaBrg1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-6 animate-bounce-slow inline-block"
          >
            🚀 SIM! QUERO GARANTIR POR R$ 26,63!
          </a>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Garantia 7 Dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span>Suporte Exclusivo</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Dúvidas Frequentes 🤔
          </h2>
          <div className="space-y-6">
            <FAQItem 
              question="Para quem é o Kit Marketing Estético?"
              answer="Para todas as profissionais de estética: Esteticistas, Designers de Sobrancelha, Terapeutas Capilares, Micropigmentadoras, profissionais de Harmonização Facial e qualquer pessoa que trabalhe com beleza e bem-estar."
            />
            <FAQItem 
              question="Preciso ter conhecimento em fotografia?"
              answer="Não! As fotos são totalmente prontas para uso. Você só precisa baixar e postar com sua marca. É simples assim!"
            />
            <FAQItem 
              question="O acesso é realmente para sempre?"
              answer="Sim! Pagamento único de R$ 26,63 e você tem acesso vitalício ao kit completo. Sem mensalidades, sem taxas extras, sem pegadinhas. É seu para sempre!"
            />
            <FAQItem 
              question="Como recebo as fotos após a compra?"
              answer="Após a confirmação do pagamento, você receberá imediatamente por e-mail o link de acesso à plataforma com todas as +130 fotos organizadas por categoria."
            />
            <FAQItem 
              question="Há garantia de satisfação?"
              answer="Sim! Oferecemos 7 dias de garantia total. Se por qualquer motivo não ficar satisfeita, devolvemos 100% do seu investimento, sem perguntas!"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            ⏰ Última Chance de Garantir seu kit com 93% de Desconto!
          </h2>
          <p className="text-xl mb-8">Não perca mais tempo criando fotos amadoras que não convertem. Sua concorrência já está usando fotos profissionais como estas!</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <div className="text-lg mb-2">⏳ Valor limitado:</div>
            <div className="text-3xl font-bold text-yellow-300 animate-pulse">
              De <span className="line-through">R$363</span> por R$26,63
            </div>
          </div>
          <div className="mb-6">
            <div className="text-lg mb-2">🔥 OFERTA COMPLETA:</div>
            <div className="text-sm text-purple-200">Kit + 3 Bônus Exclusivos (Valor R$ 26,63)</div>
          </div>
          <a
            href="https://pay.kiwify.com.br/QvaBrg1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-8 animate-pulse-slow inline-block"
          >
            🔥 GARANTIR MEU KIT AGORA - R$ 26,63
          </a>
          <div className="text-sm text-purple-200">
            ✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ Acesso a atualizações
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Kit marketing estetico</h3>
          <p className="text-gray-400 mb-8">A solução definitiva para profissionais de estética que querem lotar sua agenda com fotos de qualidade.</p>
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
            <p>© 2024 Kit de Fotos Profissionais. Todos os direitos reservados.</p>
            <p className="mt-2">Este produto não garante resultados. Os resultados podem variar de pessoa para pessoa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
