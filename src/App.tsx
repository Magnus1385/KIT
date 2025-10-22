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
    <div className="fixed left-2 right-2 sm:left-4 sm:right-auto top-2/3 lg:top-1/2 transform -translate-y-1/2 z-50 space-y-2 sm:space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border border-green-200 rounded-lg shadow-lg p-2 sm:p-4 max-w-xs sm:max-w-sm notification-slide-in mx-auto sm:mx-0"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">{notification.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-600">{notification.city}</p>
                <p className="text-[10px] sm:text-xs text-green-600 font-medium">Acabou de comprar o método!</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{notification.timeAgo} min atrás</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
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
      
      {/* Section 1: Hero + Promise */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            CHEGA DE AGENDA VAZIA:<br />
            <span className="text-yellow-300 animate-pulse">Método60k com estética</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-4xl mx-auto leading-relaxed">
            A Metodologia que leva clínicas a <strong>R$60mil+ de faturamento</strong>. Economize <strong>95% do seu tempo</strong> e <strong>agende até 10 novos clientes</strong> na primeira semana com um passo a passo simples.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm mb-8">
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
          <a
            href="https://pay.kiwify.com.br/QvaBrg1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-10 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse inline-block"
          >
            🚀 QUERO LOTAR MINHA AGENDA AGORA!
          </a>
        </div>
      </section>

      {/* Section 2: Problem + Solution + Features Combined */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Problems */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Você Está Cansada de...
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Perder Horas Criando Conteúdo?</h3>
                  <p className="text-gray-600 text-sm">Conteúdos que ninguém curte = desperdício de tempo e faturamento perdido</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Agenda Sempre Vazia?</h3>
                  <p className="text-gray-600 text-sm">Sem estratégia clara, sem clientes. É hora de mudar isso!</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Sem Criatividade?</h3>
                  <p className="text-gray-600 text-sm">Saber o que postar é essencial para aumentar seu faturamento!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution + Features */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              A Solução Completa Está Aqui! ✨
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              O <strong className="text-purple-600">Método60k com estética</strong> é a solução definitiva para profissionais de estética que querem <strong>AUMENTAR O FATURAMENTO</strong> sem perder tempo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-t-4 border-purple-500">
              <Gift className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Passo a Passo para 60k+</h3>
              <p className="text-gray-600 text-sm">O segredo das clínicas milionárias</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border-t-4 border-pink-500">
              <Clock className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">95% de Tempo Economizado</h3>
              <p className="text-gray-600 text-sm">Até 10 novos clientes por semana</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-t-4 border-orange-500">
              <Zap className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Acesso Vitalício</h3>
              <p className="text-gray-600 text-sm">Pagamento único, sem mensalidades</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-t-4 border-green-500">
              <Check className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Scripts Validados</h3>
              <p className="text-gray-600 text-sm">Método prático para lotar sua agenda</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-t-4 border-blue-500">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Gatilhos de Vendas</h3>
              <p className="text-gray-600 text-sm">Psicologia aplicada do início ao fim</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-t-4 border-yellow-500">
              <Star className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">3 Bônus Exclusivos</h3>
              <p className="text-gray-600 text-sm">150 Scripts + Guia de Fotos + Gatilhos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Social Proof + Main Offer */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Social Proof */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
            Quem Já Usou, Aprovou! ⭐⭐⭐⭐⭐
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <p className="text-white mb-4 text-sm italic">"Em 2 semanas minha agenda lotou! O passo a passo faz toda a diferença."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-700 font-bold text-sm">MC</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Marina Costa</div>
                  <div className="text-xs text-purple-200">Esteticista - SP</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <p className="text-white mb-4 text-sm italic">"Economizei 10+ horas por semana. Meu faturamento triplicou!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-700 font-bold text-sm">JS</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Juliana Santos</div>
                  <div className="text-xs text-purple-200">Designer de Sobrancelhas - RJ</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <p className="text-white mb-4 text-sm italic">"Scripts aumentaram meu fechamento. Recebo mensagens todos os dias!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-700 font-bold text-sm">RF</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Renata Ferreira</div>
                  <div className="text-xs text-purple-200">Terapeuta Capilar - MG</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Offer */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              🔥 OFERTA ESPECIAL DE LANÇAMENTO! 🔥
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">🎁 TUDO QUE VOCÊ LEVA HOJE:</h3>

              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <div>
                    <div className="font-semibold">✅ Método60k Com Estética</div>
                    <div className="text-xs text-purple-200">10 agendamentos na 1ª semana</div>
                  </div>
                  <div className="line-through text-red-300 text-sm">R$ 97</div>
                </div>

                <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <div>
                    <div className="font-semibold">📝 BÔNUS: 150 Scripts Validados</div>
                    <div className="text-xs text-purple-200">Scripts para fechar vendas</div>
                  </div>
                  <div className="text-green-300 font-bold text-sm">GRÁTIS</div>
                </div>

                <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <div>
                    <div className="font-semibold">🎥 BÔNUS: Guia de Fotos</div>
                    <div className="text-xs text-purple-200">Fotos que vendem</div>
                  </div>
                  <div className="text-green-300 font-bold text-sm">GRÁTIS</div>
                </div>

                <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <div>
                    <div className="font-semibold">🧠 BÔNUS: Gatilhos Mentais</div>
                    <div className="text-xs text-purple-200">Persuasão aplicada</div>
                  </div>
                  <div className="text-green-300 font-bold text-sm">GRÁTIS</div>
                </div>

                <div className="border-t-2 border-yellow-300 pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold mb-3">
                    <div>VALOR TOTAL:</div>
                    <div className="line-through text-red-300">R$ 390</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base mb-2">HOJE VOCÊ PAGA APENAS:</div>
                    <div className="text-5xl md:text-6xl font-bold text-yellow-300 mb-2 animate-pulse">R$ 9,90</div>
                    <div className="text-base">💳 Pagamento único - Sem mensalidades!</div>
                    <div className="text-sm text-green-300 font-semibold mt-2">
                      💰 ECONOMIA DE R$ 380 (97% OFF)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg mb-6">⚠️ Oferta LIMITADA para as primeiras 100 pessoas!</p>
            <a
              href="https://pay.kiwify.com.br/QvaBrg1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-10 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-6 animate-pulse inline-block"
            >
              🚀 SIM! QUERO GARANTIR POR R$ 9,90!
            </a>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Garantia 7 Dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Suporte Exclusivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: FAQ Compact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
            Dúvidas Frequentes 🤔
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="Para quem é o Método60k?"
              answer="Para todas as profissionais de estética: Esteticistas, Designers de Sobrancelha, Terapeutas Capilares, Micropigmentadoras e profissionais de Harmonização Facial."
            />
            <FAQItem
              question="Preciso ter conhecimento em Marketing?"
              answer="Não! A metodologia é totalmente prática. Você só precisa baixar e aplicar. É simples assim!"
            />
            <FAQItem
              question="O acesso é para sempre?"
              answer="Sim! Pagamento único de R$ 9,90 e acesso vitalício. Sem mensalidades, sem taxas extras, sem pegadinhas!"
            />
            <FAQItem
              question="Há garantia?"
              answer="Sim! 7 dias de garantia total. Se não ficar satisfeita, devolvemos 100% do seu investimento!"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA + Footer */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ⏰ Última Chance - 97% de Desconto!
          </h2>
          <p className="text-lg mb-6">Não perca mais tempo criando conteúdos que não vendem!</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-md mx-auto">
            <div className="text-base mb-2">⏳ Valor limitado:</div>
            <div className="text-3xl font-bold text-yellow-300 animate-pulse">
              De <span className="line-through">R$390</span> por R$9,90
            </div>
          </div>
          <a
            href="https://pay.kiwify.com.br/QvaBrg1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-10 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-6 animate-pulse inline-block"
          >
            🔥 GARANTIR AGORA - R$ 9,90
          </a>
          <div className="text-sm text-purple-200 mb-12">
            ✅ Acesso imediato • ✅ Garantia 7 dias • ✅ Suporte exclusivo
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 pt-8 mt-8">
            <h3 className="text-xl font-bold mb-3">Método60k com Estética</h3>
            <p className="text-purple-200 text-sm mb-6">A solução para profissionais de estética que querem lotar sua agenda.</p>
            <div className="text-xs text-purple-300">
              <p>© 2024 Método60k com Estética. Todos os direitos reservados.</p>
              <p className="mt-2">Este produto não garante resultados. Os resultados podem variar de pessoa para pessoa.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
