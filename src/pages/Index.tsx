import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);

    setTimeout(() => {
      const responses: Record<string, string> = {
        'промпт': 'Промпт — это точный запрос к нейросети. Формула 4К: Контекст (роль) + Команда (задача) + Канва (детали) + Контроль (ограничения). Например: "Ты — SMM-специалист. Напиши пост для Instagram о киберпанк-вечере. Используй атмосферу Блейдраннера, 2 цитаты. Объём 1500 символов, тон заинтересованный, 3 хэштега."',
        'deepseek': 'DeepSeek — бесплатная текстовая нейросеть, которая отлично понимает русский язык, умеет загружать и анализировать файлы (PDF, Word, PPT, Excel). Идеальна для анализа отчётов, написания пресс-релизов и составления текстов. Доступна без VPN на chat.deepseek.com',
        'kandinsky': 'Kandinsky 3.0 — лучшая бесплатная нейросеть для генерации изображений на русском языке от Сбера. Идеально понимает наши культурные коды. Используйте для создания уникальных афиш, иллюстраций для соцсетей, визуализации персонажей.',
        'инструменты': 'Основные инструменты: 1) DeepSeek (текст, анализ файлов), 2) ChatGPT (креативные идеи), 3) Kandinsky (изображения), 4) Yandex ART (быстрые картинки), 5) Gamma/Tome (презентации). Все бесплатные!',
        'default': 'Отличный вопрос! На воркшопе мы подробно разберём работу с нейросетями. Основные темы: написание промптов, текстовые AI (DeepSeek, ChatGPT), визуальные AI (Kandinsky), практические кейсы для библиотек. Что конкретно вас интересует?'
      };

      const lowerInput = chatInput.toLowerCase();
      let response = responses['default'];

      for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      setChatMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }, 800);

    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-gradient-shift bg-[length:400%_400%]" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Воркшоп
              </h1>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'hero', label: 'Главная' },
                { id: 'program', label: 'Программа' },
                { id: 'cases', label: 'Кейсы' },
                { id: 'materials', label: 'Материалы' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              AI-помощник
            </Button>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/40 animate-scale-in">
            Инновации в библиотечной работе
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Нейросети в Библиотеке
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            От хайпа до реальных результатов: практический воркшоп для библиотекарей
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              onClick={() => scrollToSection('program')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
            >
              <Icon name="Calendar" size={20} className="mr-2" />
              Программа
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('materials')}
              className="text-lg px-8 border-primary text-primary hover:bg-primary/10"
            >
              <Icon name="Download" size={20} className="mr-2" />
              Материалы
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
            {[
              { icon: 'Clock', title: '60-75 минут', desc: 'Интенсив с практикой' },
              { icon: 'Users', title: 'Для всех уровней', desc: 'От новичков до профи' },
              { icon: 'Rocket', title: 'Реальные кейсы', desc: 'Применимо сразу' }
            ].map((item, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${0.6 + idx * 0.1}s` }}>
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                    <Icon name={item.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/40">
              Программа воркшопа
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">5 Мощных Блоков</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Структурированный путь от теории к практике за один день
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                number: '01',
                time: '10 мин',
                title: 'Почему это уже не хайп, а повседневность?',
                description: 'Тренд поколения Z, AI как супер-стажёр, библиотека как digital-хаб',
                topics: ['Статистика использования AI подростками', 'Преимущества и ограничения AI', 'Роль библиотеки в цифровой эре']
              },
              {
                number: '02',
                time: '10 мин',
                title: 'Как разговаривать с AI: магия промпта',
                description: 'Формула идеального промпта — правило 4К',
                topics: ['Контекст: задание роли', 'Команда: четкая задача', 'Канва: важные детали', 'Контроль: ограничения']
              },
              {
                number: '03',
                time: '15 мин',
                title: 'Инструментарий: бесплатный AI-арсенал',
                description: 'Обзор проверенных инструментов для библиотечных задач',
                topics: ['DeepSeek и ChatGPT', 'Kandinsky и Yandex ART', 'Gamma и Tome']
              },
              {
                number: '04',
                time: '25 мин',
                title: 'Практикум: работаем с реальными кейсами',
                description: 'Живая работа в группах с конкретными задачами',
                topics: ['Спасаем SMM-отдел', 'Дизайн за 60 секунд', 'Аналитик за 5 минут']
              },
              {
                number: '05',
                time: '7 мин',
                title: 'AI и запредельное: как он изменит вашу работу',
                description: 'Перспективы и вдохновение на дальнейшее освоение',
                topics: ['Автоматизация рутины', 'Прокачка навыков', 'Карьерный рост']
              }
            ].map((block, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity">
                      {block.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">{block.time}</Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{block.title}</CardTitle>
                      <CardDescription className="text-base">{block.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {block.topics.map((topic, topicIdx) => (
                      <Badge key={topicIdx} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/40">
              Практические кейсы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Решаем реальные задачи</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Три готовых сценария с подробными инструкциями
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: 'MessageSquare',
                title: 'Кейс 1: Спасаем SMM-отдел',
                task: 'Киберпанк-вечер для подростков',
                tool: 'DeepSeek / ChatGPT',
                result: 'Пост для Telegram с гиковским сленгом',
                color: 'from-primary to-secondary'
              },
              {
                icon: 'Palette',
                title: 'Кейс 2: Дизайн за 60 секунд',
                task: 'Яркая афиша для мероприятия',
                tool: 'Kandinsky 3.0',
                result: 'Неоновая футуристическая картинка',
                color: 'from-secondary to-accent'
              },
              {
                icon: 'FileText',
                title: 'Кейс 3: Аналитик за 5 минут',
                task: 'Анализ 40-страничного PDF',
                tool: 'DeepSeek с загрузкой файлов',
                result: 'Конспект на 3-4 тезиса',
                color: 'from-accent to-primary'
              }
            ].map((caseItem, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${caseItem.color} mb-4 flex items-center justify-center`}>
                    <Icon name={caseItem.icon as any} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{caseItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Задача:</p>
                    <p className="text-sm font-medium">{caseItem.task}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Инструмент:</p>
                    <Badge variant="outline" className="text-xs">{caseItem.tool}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Результат:</p>
                    <p className="text-sm">{caseItem.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="materials" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">
              Материалы для скачивания
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Всё необходимое в одном месте</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Шпаргалки, чек-листы и ссылки на инструменты
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="checklist" className="bg-card/50 backdrop-blur-sm border border-border rounded-xl px-6 animate-fade-in">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="CheckSquare" size={20} className="text-primary" />
                    <span className="font-semibold">Чек-лист «Старт за 5 минут»</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2 pt-4">
                  <p>✓ Откройте браузер и зайдите на chat.deepseek.com</p>
                  <p>✓ Задайте свой первый рабочий вопрос, используя Formula 4K</p>
                  <p>✓ Зайдите на сайт Kandinsky и сгенерируйте свою первую картинку</p>
                  <p>✓ Покажите результат коллеге и скажите: «Сделано за 2 минуты с помощью AI»</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tools" className="bg-card/50 backdrop-blur-sm border border-border rounded-xl px-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="Link" size={20} className="text-secondary" />
                    <span className="font-semibold">Ссылки на все инструменты</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <div>
                    <p className="font-medium text-foreground mb-1">Текстовые нейросети:</p>
                    <p>• DeepSeek: chat.deepseek.com</p>
                    <p>• ChatGPT: chat.openai.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Визуальные нейросети:</p>
                    <p>• Kandinsky: fusionbrain.ai</p>
                    <p>• Yandex ART: ya.ru (через Алису)</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Презентации:</p>
                    <p>• Gamma: gamma.app</p>
                    <p>• Tome: tome.app</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="formula" className="bg-card/50 backdrop-blur-sm border border-border rounded-xl px-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="Lightbulb" size={20} className="text-accent" />
                    <span className="font-semibold">Формула идеального промпта (4К)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3 pt-4">
                  <div>
                    <p className="font-medium text-foreground">1. КОНТЕКСТ (Роль):</p>
                    <p className="text-sm">«Ты — опытный SMM-специалист, который пишет для аудитории 16+...»</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">2. КОМАНДА (Задача):</p>
                    <p className="text-sm">«...напиши короткий пост для Instagram...»</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">3. КАНВА (Детали):</p>
                    <p className="text-sm">«...о новом поступлении книг по киберпанку. Используй атмосферу Блейдраннера...»</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">4. КОНТРОЛЬ (Ограничения):</p>
                    <p className="text-sm">«...объём не более 1500 символов, тон — заинтересованный, 3 хэштега»</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="examples" className="bg-card/50 backdrop-blur-sm border border-border rounded-xl px-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="Code" size={20} className="text-primary" />
                    <span className="font-semibold">Примеры готовых промптов</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pt-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-accent mb-2">Для SMM:</p>
                    <p className="text-sm italic">«Ты — продвинутый библиотекарь, который разбирается в игровой и гик-культуре. Напиши пост-приглашение в Telegram для подростков 14-18 лет на "Киберпанк-вечер". Расскажи, что будет: турнир по старым видеоиграм, викторина по нейросетям и подборка книг-антиутопий. Тон — зазывающий, дружеский, с использованием гиковского сленга, но без перегибов. Объём — 1-2 абзаца. Добавь 5 хэштегов.»</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-secondary mb-2">Для дизайна:</p>
                    <p className="text-sm italic">«Яркая, неоновая афиша для молодежного мероприятия "Киберпанк-вечер" в библиотеке. Стиль: цифровой арт, футуристический город, фиолетово-синие тона, элементы кибернетики. Текст: "Киберпанк-вечер! Турнир, викторина, книги. [Дата]. Только для своих".»</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Icon name="Download" size={20} className="mr-2" />
                Скачать все материалы (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border relative z-10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-4">AI не заменит библиотекаря. Но библиотекарь, который использует AI, заменит того, кто этого не делает.</p>
          <p className="text-sm">© 2025 Воркшоп «Нейросети в библиотеке». Все права защищены.</p>
        </div>
      </footer>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:justify-end p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <Card className="w-full md:w-96 h-[600px] flex flex-col bg-card/95 backdrop-blur-xl border-primary/50 shadow-2xl animate-scale-in">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Icon name="Bot" size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI-Ассистент</CardTitle>
                    <CardDescription className="text-xs">Ответит на вопросы о воркшопе</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4">
              {chatMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8 space-y-4">
                  <Icon name="Sparkles" size={40} className="mx-auto text-primary" />
                  <p className="text-sm">Привет! Я помогу разобраться с воркшопом. Спросите меня:</p>
                  <div className="space-y-2 text-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setChatInput('Что такое промпт?');
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      Что такое промпт?
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setChatInput('Какие инструменты будем использовать?');
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      Какие инструменты?
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setChatInput('Расскажи про Kandinsky');
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      Расскажи про Kandinsky
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon name="Bot" size={16} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Задайте вопрос..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
