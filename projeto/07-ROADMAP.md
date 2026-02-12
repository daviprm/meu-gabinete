# Roadmap do Produto

## Visão de Evolução

O Meu Gabinete evolui em fases, cada uma adicionando valor incremental e expandindo o mercado endereçável.

---

## Fase 1 — MVP (Onde estamos)
**Prazo:** Atual
**Foco:** Gabinetes políticos municipais (vereadores)

### Entregue:
- [x] Dashboard com KPIs
- [x] CRM do cidadão (perfil completo, tags, histórico)
- [x] Gestão de demandas (CRUD + status + prioridade)
- [x] Mapa eleitoral interativo
- [x] Pesquisas de campo com visualização
- [x] Gestão de equipe com métricas
- [x] Agenda com calendário
- [x] Comunicação multicanal (estrutura)
- [x] Relatórios básicos
- [x] Modo claro/escuro
- [x] Interface responsiva
- [x] Autenticação e multi-organização

### Pendente nesta fase:
- [ ] Backend real (substituir mock data)
- [ ] Sistema de RBAC (roles e permissões)
- [ ] Planos e billing
- [ ] Integração WhatsApp real (API oficial)
- [ ] Deploy em produção

---

## Fase 2 — Backend + Lançamento Beta
**Prazo:** 2-3 meses
**Foco:** Primeiros clientes reais (5-10 gabinetes piloto)

### Entregas:
- [ ] API backend completa (Next.js API Routes + Prisma)
- [ ] Banco de dados PostgreSQL em produção
- [ ] Sistema de autenticação robusto (NextAuth / Clerk)
- [ ] RBAC funcional (Admin, Membro, Visualizador)
- [ ] CRUD real de todas as entidades
- [ ] Upload de fotos/arquivos
- [ ] Importação de dados via planilha (CSV/Excel)
- [ ] Integração com WhatsApp Business API
- [ ] Deploy na Vercel + banco na Supabase/Neon
- [ ] Onboarding guiado para novos clientes
- [ ] Landing page + página de preços

---

## Fase 3 — Tração e Features Avançadas
**Prazo:** 4-6 meses
**Foco:** Crescer base de clientes + features de retenção

### Entregas:
- [ ] App mobile (PWA ou React Native)
- [ ] Notificações push (prazo de demanda, lembrete de agenda)
- [ ] Pesquisa de campo pelo celular com GPS embarcado
- [ ] Automações básicas (ex: demanda aberta → notifica responsável)
- [ ] Templates de mensagens para comunicação
- [ ] Dashboards customizáveis
- [ ] Integração com SMS (Twilio/Zenvia)
- [ ] Integração com E-mail marketing
- [ ] Exportação avançada (Excel com filtros, PDF personalizado)
- [ ] Log de atividades / auditoria

---

## Fase 4 — Expansão para Judiciário
**Prazo:** 6-9 meses
**Foco:** Entrar no mercado judiciário

### Entregas:
- [ ] Módulo de gestão de processos (adaptado do módulo de demandas)
- [ ] Controle de prazos processuais com alertas
- [ ] Distribuição automática de processos por assessor
- [ ] Métricas de produtividade alinhadas ao CNJ
- [ ] Relatórios específicos para metas do CNJ
- [ ] Integração com PJe (consulta de processos)
- [ ] Vocabulário e fluxos adaptados ao judiciário
- [ ] Plano Enterprise específico para tribunais

---

## Fase 5 — Plataforma e Escala
**Prazo:** 9-18 meses
**Foco:** Virar plataforma + contratos institucionais

### Entregas:
- [ ] White-label para tribunais/câmaras/assembleias
- [ ] Painel administrativo para gestores institucionais
- [ ] Marketplace de integrações (plugins)
- [ ] IA para sugestões (priorização de demandas, análise de sentimento)
- [ ] Chatbot para atendimento ao cidadão (portal público)
- [ ] API pública documentada
- [ ] Multi-idioma (para expandir para outros países da América Latina)
- [ ] Certificações de segurança (ISO 27001, SOC 2)

---

## Fase 6 — Visão de Longo Prazo
**Prazo:** 18-36 meses

### Possibilidades:
- [ ] Portal do cidadão (acompanhar suas demandas online)
- [ ] Integração com dados públicos (IBGE, TSE, DataSUS)
- [ ] Inteligência artificial para previsão eleitoral
- [ ] Módulo financeiro (orçamento do gabinete)
- [ ] Expansão para América Latina (Colômbia, México, Argentina)
- [ ] Parcerias com escolas de governo / cursos de gestão pública

---

## Princípios do Roadmap

1. **Sempre validar antes de construir** — Cada fase só começa com feedback real
2. **Entregar valor incremental** — Cada release precisa ser útil por si só
3. **Foco > Features** — Melhor fazer 5 coisas bem do que 20 meia-boca
4. **Ouvir o cliente** — O roadmap muda baseado no que os pilotos pedem
5. **Monetizar cedo** — A partir da Fase 2, cobrança ativa
