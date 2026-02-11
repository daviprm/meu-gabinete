// ============================================================
// Mock Data — Meu Gabinete
// ============================================================

export interface Eleitor {
  id: string;
  nome: string;
  bairro: string;
  telefone: string;
  intencao: "Favorável" | "Indeciso" | "Oposição";
  tags: string[];
  dataCadastro: string;
  lat: number;
  lng: number;
  foto: string;
  email?: string;
  observacoes?: string;
  demandas?: string[];
}

export interface Pesquisa {
  id: string;
  nome: string;
  data: string;
  bairro: string;
  pesquisador: string;
  eleitores: number;
  status: "Concluída" | "Em andamento" | "Agendada";
}

export interface Demanda {
  id: string;
  titulo: string;
  descricao: string;
  status: "Aberta" | "Em andamento" | "Concluída" | "Cancelada";
  prioridade: "Alta" | "Média" | "Baixa";
  categoria: string;
  eleitor: string;
  responsavel: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface MembroEquipe {
  id: string;
  nome: string;
  papel: string;
  regiao: string;
  avatar: string;
  email: string;
  telefone: string;
  eleitoresAtendidos: number;
  demandasResolvidas: number;
  pesquisasRealizadas: number;
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  tipo: "Reunião" | "Visita" | "Evento" | "Audiência" | "Campanha";
  descricao?: string;
}

export interface Segmento {
  id: string;
  nome: string;
  eleitores: number;
  criterios: string;
  ultimaAcao: string;
  ultimaAcaoData: string;
}

export interface Comunicacao {
  id: string;
  tipo: "WhatsApp" | "SMS" | "Email" | "Ligação";
  data: string;
  segmento: string;
  mensagem: string;
  status: "Enviado" | "Entregue" | "Lido" | "Falha";
  destinatarios: number;
}

// ---------- ELEITORES ----------
export const eleitores: Eleitor[] = [
  { id: "1", nome: "Maria Silva", bairro: "Centro", telefone: "(79) 98765-4321", intencao: "Favorável", tags: ["Saúde", "Educação"], dataCadastro: "2025-12-01", lat: -10.9112, lng: -37.0717, foto: "https://i.pravatar.cc/150?img=1", email: "maria@email.com", observacoes: "Moradora antiga, liderança comunitária." },
  { id: "2", nome: "João Santos", bairro: "Jardins", telefone: "(79) 97654-3210", intencao: "Indeciso", tags: ["Infraestrutura"], dataCadastro: "2025-12-03", lat: -10.9250, lng: -37.0550, foto: "https://i.pravatar.cc/150?img=3", email: "joao@email.com" },
  { id: "3", nome: "Ana Oliveira", bairro: "Atalaia", telefone: "(79) 96543-2109", intencao: "Favorável", tags: ["Cultura", "Educação"], dataCadastro: "2025-12-05", lat: -10.9820, lng: -37.0390, foto: "https://i.pravatar.cc/150?img=5", observacoes: "Professora, ativa em eventos." },
  { id: "4", nome: "Carlos Mendes", bairro: "Luzia", telefone: "(79) 95432-1098", intencao: "Oposição", tags: ["Segurança"], dataCadastro: "2025-12-08", lat: -10.9350, lng: -37.0680, foto: "https://i.pravatar.cc/150?img=8" },
  { id: "5", nome: "Fernanda Costa", bairro: "Siqueira Campos", telefone: "(79) 94321-0987", intencao: "Favorável", tags: ["Saúde", "Transporte"], dataCadastro: "2025-12-10", lat: -10.9150, lng: -37.0580, foto: "https://i.pravatar.cc/150?img=9" },
  { id: "6", nome: "Roberto Almeida", bairro: "São José", telefone: "(79) 93210-9876", intencao: "Indeciso", tags: ["Educação"], dataCadastro: "2025-12-12", lat: -10.9080, lng: -37.0650, foto: "https://i.pravatar.cc/150?img=11" },
  { id: "7", nome: "Patrícia Lima", bairro: "Farolândia", telefone: "(79) 92109-8765", intencao: "Favorável", tags: ["Saúde"], dataCadastro: "2025-12-15", lat: -10.9450, lng: -37.0750, foto: "https://i.pravatar.cc/150?img=16" },
  { id: "8", nome: "Lucas Ferreira", bairro: "Ponto Novo", telefone: "(79) 91098-7654", intencao: "Oposição", tags: ["Infraestrutura", "Segurança"], dataCadastro: "2025-12-18", lat: -10.9280, lng: -37.0480, foto: "https://i.pravatar.cc/150?img=12" },
  { id: "9", nome: "Juliana Rocha", bairro: "13 de Julho", telefone: "(79) 90987-6543", intencao: "Favorável", tags: ["Cultura", "Transporte"], dataCadastro: "2025-12-20", lat: -10.9180, lng: -37.0450, foto: "https://i.pravatar.cc/150?img=20" },
  { id: "10", nome: "Pedro Martins", bairro: "Grageru", telefone: "(79) 89876-5432", intencao: "Indeciso", tags: ["Educação", "Saúde"], dataCadastro: "2025-12-22", lat: -10.9320, lng: -37.0620, foto: "https://i.pravatar.cc/150?img=14" },
  { id: "11", nome: "Beatriz Souza", bairro: "Coroa do Meio", telefone: "(79) 88765-4321", intencao: "Favorável", tags: ["Cultura"], dataCadastro: "2025-12-25", lat: -10.9550, lng: -37.0480, foto: "https://i.pravatar.cc/150?img=23" },
  { id: "12", nome: "Thiago Nunes", bairro: "Inácio Barbosa", telefone: "(79) 87654-3210", intencao: "Favorável", tags: ["Transporte", "Infraestrutura"], dataCadastro: "2026-01-02", lat: -10.9650, lng: -37.0550, foto: "https://i.pravatar.cc/150?img=15" },
];

// ---------- PESQUISAS ----------
export const pesquisas: Pesquisa[] = [
  { id: "1", nome: "Pesquisa Centro - Dez/25", data: "2025-12-15", bairro: "Centro", pesquisador: "Ricardo Moura", eleitores: 48, status: "Concluída" },
  { id: "2", nome: "Pesquisa Atalaia", data: "2025-12-20", bairro: "Atalaia", pesquisador: "Ana Torres", eleitores: 35, status: "Concluída" },
  { id: "3", nome: "Pesquisa Zona Norte", data: "2026-01-05", bairro: "Jardins", pesquisador: "Carlos Henrique", eleitores: 62, status: "Concluída" },
  { id: "4", nome: "Pesquisa Farolândia", data: "2026-01-12", bairro: "Farolândia", pesquisador: "Fernanda Lopes", eleitores: 28, status: "Em andamento" },
  { id: "5", nome: "Pesquisa Siqueira Campos", data: "2026-01-20", bairro: "Siqueira Campos", pesquisador: "Ricardo Moura", eleitores: 0, status: "Agendada" },
  { id: "6", nome: "Pesquisa 13 de Julho", data: "2026-01-25", bairro: "13 de Julho", pesquisador: "Ana Torres", eleitores: 0, status: "Agendada" },
];

// ---------- DEMANDAS ----------
export const demandas: Demanda[] = [
  { id: "1", titulo: "Reparo de iluminação pública", descricao: "Poste sem luz na Rua das Flores", status: "Aberta", prioridade: "Alta", categoria: "Infraestrutura", eleitor: "Maria Silva", responsavel: "Carlos Henrique", dataCriacao: "2026-01-02", dataAtualizacao: "2026-01-02" },
  { id: "2", titulo: "Vaga em creche municipal", descricao: "Mãe precisa de vaga para filho de 3 anos", status: "Em andamento", prioridade: "Alta", categoria: "Educação", eleitor: "Fernanda Costa", responsavel: "Ana Torres", dataCriacao: "2025-12-28", dataAtualizacao: "2026-01-05" },
  { id: "3", titulo: "Buraco na calçada", descricao: "Calçada danificada em frente ao nº 230", status: "Concluída", prioridade: "Média", categoria: "Infraestrutura", eleitor: "João Santos", responsavel: "Ricardo Moura", dataCriacao: "2025-12-15", dataAtualizacao: "2026-01-03" },
  { id: "4", titulo: "Consulta médica especialista", descricao: "Pedido de encaminhamento para cardiologista", status: "Em andamento", prioridade: "Alta", categoria: "Saúde", eleitor: "Patrícia Lima", responsavel: "Fernanda Lopes", dataCriacao: "2026-01-04", dataAtualizacao: "2026-01-06" },
  { id: "5", titulo: "Poda de árvore", descricao: "Árvore obstruindo fiação elétrica", status: "Aberta", prioridade: "Média", categoria: "Meio Ambiente", eleitor: "Roberto Almeida", responsavel: "Carlos Henrique", dataCriacao: "2026-01-06", dataAtualizacao: "2026-01-06" },
  { id: "6", titulo: "Melhoria no transporte público", descricao: "Linha de ônibus com poucos horários", status: "Aberta", prioridade: "Baixa", categoria: "Transporte", eleitor: "Lucas Ferreira", responsavel: "Ana Torres", dataCriacao: "2026-01-07", dataAtualizacao: "2026-01-07" },
  { id: "7", titulo: "Programa de capacitação", descricao: "Curso gratuito de informática para jovens", status: "Concluída", prioridade: "Média", categoria: "Educação", eleitor: "Ana Oliveira", responsavel: "Fernanda Lopes", dataCriacao: "2025-12-10", dataAtualizacao: "2025-12-28" },
  { id: "8", titulo: "Segurança no parque", descricao: "Pedido de ronda policial no parque do bairro", status: "Cancelada", prioridade: "Baixa", categoria: "Segurança", eleitor: "Carlos Mendes", responsavel: "Ricardo Moura", dataCriacao: "2025-12-20", dataAtualizacao: "2025-12-22" },
];

// ---------- EQUIPE ----------
export const equipe: MembroEquipe[] = [
  { id: "1", nome: "Ricardo Moura", papel: "Coordenador", regiao: "Centro / Zona Sul", avatar: "RM", email: "ricardo@gabinete.com", telefone: "(11) 99999-1111", eleitoresAtendidos: 156, demandasResolvidas: 42, pesquisasRealizadas: 8 },
  { id: "2", nome: "Ana Torres", papel: "Pesquisadora", regiao: "Zona Oeste", avatar: "AT", email: "ana@gabinete.com", telefone: "(11) 99999-2222", eleitoresAtendidos: 98, demandasResolvidas: 23, pesquisasRealizadas: 12 },
  { id: "3", nome: "Carlos Henrique", papel: "Assessor", regiao: "Zona Leste", avatar: "CH", email: "carlos@gabinete.com", telefone: "(11) 99999-3333", eleitoresAtendidos: 134, demandasResolvidas: 38, pesquisasRealizadas: 5 },
  { id: "4", nome: "Fernanda Lopes", papel: "Pesquisadora", regiao: "Zona Norte", avatar: "FL", email: "fernanda@gabinete.com", telefone: "(11) 99999-4444", eleitoresAtendidos: 87, demandasResolvidas: 19, pesquisasRealizadas: 10 },
  { id: "5", nome: "Paulo Vieira", papel: "Motorista", regiao: "Todas", avatar: "PV", email: "paulo@gabinete.com", telefone: "(11) 99999-5555", eleitoresAtendidos: 0, demandasResolvidas: 0, pesquisasRealizadas: 0 },
  { id: "6", nome: "Mariana Dias", papel: "Secretária", regiao: "Gabinete", avatar: "MD", email: "mariana@gabinete.com", telefone: "(11) 99999-6666", eleitoresAtendidos: 210, demandasResolvidas: 65, pesquisasRealizadas: 0 },
];

// ---------- EVENTOS ----------
export const eventos: Evento[] = [
  { id: "1", titulo: "Reunião de equipe", data: "2026-02-10", horario: "09:00", local: "Gabinete", tipo: "Reunião", descricao: "Alinhamento semanal com toda a equipe do gabinete" },
  { id: "2", titulo: "Visita ao bairro Centro", data: "2026-02-10", horario: "14:00", local: "Praça da Sé", tipo: "Visita" },
  { id: "3", titulo: "Ligação com assessoria", data: "2026-02-10", horario: "16:30", local: "Gabinete", tipo: "Reunião", descricao: "Alinhar pautas da semana" },
  { id: "4", titulo: "Audiência pública - Saúde", data: "2026-02-12", horario: "10:00", local: "Câmara Municipal", tipo: "Audiência", descricao: "Discussão sobre UBS do bairro Centro" },
  { id: "5", titulo: "Almoço com lideranças", data: "2026-02-12", horario: "12:30", local: "Restaurante Central", tipo: "Reunião" },
  { id: "6", titulo: "Evento comunitário Mooca", data: "2026-02-14", horario: "16:00", local: "Associação de Moradores", tipo: "Evento", descricao: "Entrega de cestas básicas e atendimento" },
  { id: "7", titulo: "Reunião com vereadores", data: "2026-02-15", horario: "11:00", local: "Câmara Municipal", tipo: "Reunião" },
  { id: "8", titulo: "Campanha porta a porta", data: "2026-02-17", horario: "08:00", local: "Vila Madalena", tipo: "Campanha" },
  { id: "9", titulo: "Visita escola municipal", data: "2026-02-18", horario: "09:30", local: "EM Prof. João Silva", tipo: "Visita" },
  { id: "10", titulo: "Reunião comunidade Santana", data: "2026-02-20", horario: "19:00", local: "Centro Comunitário", tipo: "Reunião" },
  { id: "11", titulo: "Inauguração praça", data: "2026-02-22", horario: "10:00", local: "Pinheiros", tipo: "Evento" },
  { id: "12", titulo: "Audiência transporte", data: "2026-02-25", horario: "14:00", local: "Câmara Municipal", tipo: "Audiência" },
  { id: "13", titulo: "Reunião de planejamento mensal", data: "2026-03-01", horario: "09:00", local: "Gabinete", tipo: "Reunião" },
  { id: "14", titulo: "Visita posto de saúde", data: "2026-02-11", horario: "10:00", local: "UBS Centro", tipo: "Visita", descricao: "Verificar demandas de infraestrutura" },
  { id: "15", titulo: "Reunião orçamento", data: "2026-02-11", horario: "15:00", local: "Gabinete", tipo: "Reunião" },
  { id: "16", titulo: "Campanha Zona Norte", data: "2026-02-13", horario: "08:30", local: "Jardins", tipo: "Campanha" },
  { id: "17", titulo: "Entrevista rádio local", data: "2026-02-13", horario: "11:00", local: "Rádio Cidade", tipo: "Evento" },
];

// ---------- SEGMENTOS ----------
export const segmentos: Segmento[] = [
  { id: "1", nome: "Favoráveis - Centro", eleitores: 45, criterios: "Intenção: Favorável, Bairro: Centro", ultimaAcao: "WhatsApp enviado", ultimaAcaoData: "2026-01-28" },
  { id: "2", nome: "Indecisos geral", eleitores: 38, criterios: "Intenção: Indeciso", ultimaAcao: "SMS enviado", ultimaAcaoData: "2026-01-25" },
  { id: "3", nome: "Tag: Saúde", eleitores: 62, criterios: "Tag: Saúde", ultimaAcao: "Email enviado", ultimaAcaoData: "2026-01-20" },
  { id: "4", nome: "Zona Leste completa", eleitores: 87, criterios: "Região: Zona Leste", ultimaAcao: "Nenhuma", ultimaAcaoData: "-" },
  { id: "5", nome: "Novos cadastros Jan/26", eleitores: 24, criterios: "Cadastro: Jan/2026", ultimaAcao: "WhatsApp enviado", ultimaAcaoData: "2026-02-01" },
];

// ---------- COMUNICAÇÕES ----------
export const comunicacoes: Comunicacao[] = [
  { id: "1", tipo: "WhatsApp", data: "2026-02-01", segmento: "Favoráveis - Centro", mensagem: "Bom dia! Temos novidades sobre as melhorias no bairro...", status: "Lido", destinatarios: 45 },
  { id: "2", tipo: "SMS", data: "2026-01-25", segmento: "Indecisos geral", mensagem: "Participe da nossa audiência pública sobre saúde...", status: "Entregue", destinatarios: 38 },
  { id: "3", tipo: "Email", data: "2026-01-20", segmento: "Tag: Saúde", mensagem: "Relatório mensal de ações na área da saúde...", status: "Enviado", destinatarios: 62 },
  { id: "4", tipo: "WhatsApp", data: "2026-02-05", segmento: "Novos cadastros Jan/26", mensagem: "Seja bem-vindo! Conheça nosso trabalho...", status: "Lido", destinatarios: 24 },
  { id: "5", tipo: "Ligação", data: "2026-01-30", segmento: "Favoráveis - Centro", mensagem: "Convite pessoal para evento comunitário", status: "Entregue", destinatarios: 12 },
  { id: "6", tipo: "Email", data: "2026-01-15", segmento: "Zona Leste completa", mensagem: "Prestação de contas - Dezembro 2025", status: "Enviado", destinatarios: 87 },
];

// ========== PESQUISAS ELEITORAIS ==========

export interface CandidatoPrefeito {
  id: string;
  nome: string;
  partido: string;
  numero: number;
  cor: string;
  foto: string;
  votos: number;
  percentual: number;
}

export interface CandidatoVereador {
  id: string;
  nome: string;
  partido: string;
  numero: number;
  cor: string;
  foto: string;
  votos: number;
  percentual: number;
}

export interface ResultadoBairro {
  bairro: string;
  totalEntrevistados: number;
  candidatos: { candidatoId: string; votos: number; percentual: number }[];
  lider: string;
  corLider: string;
}

export interface EvolucaoTemporal {
  mes: string;
  candidatos: { candidatoId: string; percentual: number }[];
}

export interface DadosDemograficos {
  faixaEtaria: { faixa: string; candidatos: { candidatoId: string; pct: number }[] }[];
  genero: { genero: string; candidatos: { candidatoId: string; pct: number }[] }[];
}

// ---------- CANDIDATOS PREFEITO ----------
export const candidatosPrefeito: CandidatoPrefeito[] = [
  { id: "cp1", nome: "Carlos Eduardo", partido: "PSD", numero: 55, cor: "#2563eb", foto: "https://i.pravatar.cc/150?img=10", votos: 1850, percentual: 35.2 },
  { id: "cp2", nome: "Ana Beatriz", partido: "PT", numero: 13, cor: "#dc2626", foto: "https://i.pravatar.cc/150?img=25", votos: 1320, percentual: 25.1 },
  { id: "cp3", nome: "Roberto Mendes", partido: "PL", numero: 22, cor: "#16a34a", foto: "https://i.pravatar.cc/150?img=33", votos: 1050, percentual: 20.0 },
  { id: "cp4", nome: "Mariana Costa", partido: "PSOL", numero: 50, cor: "#9333ea", foto: "https://i.pravatar.cc/150?img=47", votos: 580, percentual: 11.0 },
  { id: "cp5", nome: "José Lima", partido: "MDB", numero: 15, cor: "#f59e0b", foto: "https://i.pravatar.cc/150?img=52", votos: 460, percentual: 8.7 },
];

// ---------- CANDIDATOS VEREADOR ----------
export const candidatosVereador: CandidatoVereador[] = [
  { id: "cv1", nome: "Paulo Ferreira", partido: "PSD", numero: 55111, cor: "#2563eb", foto: "https://i.pravatar.cc/150?img=13", votos: 920, percentual: 18.4 },
  { id: "cv2", nome: "Lucia Santos", partido: "PT", numero: 13222, cor: "#dc2626", foto: "https://i.pravatar.cc/150?img=27", votos: 780, percentual: 15.6 },
  { id: "cv3", nome: "Fernando Alves", partido: "PL", numero: 22333, cor: "#16a34a", foto: "https://i.pravatar.cc/150?img=31", votos: 650, percentual: 13.0 },
  { id: "cv4", nome: "Carla Ribeiro", partido: "PSOL", numero: 50444, cor: "#9333ea", foto: "https://i.pravatar.cc/150?img=44", votos: 580, percentual: 11.6 },
  { id: "cv5", nome: "Marcos Oliveira", partido: "MDB", numero: 15555, cor: "#f59e0b", foto: "https://i.pravatar.cc/150?img=51", votos: 520, percentual: 10.4 },
  { id: "cv6", nome: "Sandra Lima", partido: "PP", numero: 11666, cor: "#0ea5e9", foto: "https://i.pravatar.cc/150?img=48", votos: 480, percentual: 9.6 },
];

// ---------- RESULTADOS POR BAIRRO - PREFEITO ----------
export const resultadosBairroPrefeito: ResultadoBairro[] = [
  {
    bairro: "Centro",
    totalEntrevistados: 72,
    candidatos: [
      { candidatoId: "cp1", votos: 28, percentual: 38.9 },
      { candidatoId: "cp2", votos: 18, percentual: 25.0 },
      { candidatoId: "cp3", votos: 14, percentual: 19.4 },
      { candidatoId: "cp4", votos: 8, percentual: 11.1 },
      { candidatoId: "cp5", votos: 4, percentual: 5.6 },
    ],
    lider: "Carlos Eduardo",
    corLider: "#2563eb",
  },
  {
    bairro: "Jardins",
    totalEntrevistados: 65,
    candidatos: [
      { candidatoId: "cp1", votos: 25, percentual: 38.5 },
      { candidatoId: "cp2", votos: 16, percentual: 24.6 },
      { candidatoId: "cp3", votos: 12, percentual: 18.5 },
      { candidatoId: "cp4", votos: 8, percentual: 12.3 },
      { candidatoId: "cp5", votos: 4, percentual: 6.1 },
    ],
    lider: "Carlos Eduardo",
    corLider: "#2563eb",
  },
  {
    bairro: "Atalaia",
    totalEntrevistados: 58,
    candidatos: [
      { candidatoId: "cp2", votos: 20, percentual: 34.5 },
      { candidatoId: "cp1", votos: 18, percentual: 31.0 },
      { candidatoId: "cp3", votos: 10, percentual: 17.2 },
      { candidatoId: "cp4", votos: 7, percentual: 12.1 },
      { candidatoId: "cp5", votos: 3, percentual: 5.2 },
    ],
    lider: "Ana Beatriz",
    corLider: "#dc2626",
  },
  {
    bairro: "Farolândia",
    totalEntrevistados: 48,
    candidatos: [
      { candidatoId: "cp1", votos: 18, percentual: 37.5 },
      { candidatoId: "cp2", votos: 12, percentual: 25.0 },
      { candidatoId: "cp3", votos: 10, percentual: 20.8 },
      { candidatoId: "cp4", votos: 5, percentual: 10.4 },
      { candidatoId: "cp5", votos: 3, percentual: 6.3 },
    ],
    lider: "Carlos Eduardo",
    corLider: "#2563eb",
  },
  {
    bairro: "Siqueira Campos",
    totalEntrevistados: 55,
    candidatos: [
      { candidatoId: "cp3", votos: 20, percentual: 36.4 },
      { candidatoId: "cp1", votos: 16, percentual: 29.1 },
      { candidatoId: "cp2", votos: 12, percentual: 21.8 },
      { candidatoId: "cp4", votos: 5, percentual: 9.1 },
      { candidatoId: "cp5", votos: 2, percentual: 3.6 },
    ],
    lider: "Roberto Mendes",
    corLider: "#16a34a",
  },
  {
    bairro: "13 de Julho",
    totalEntrevistados: 80,
    candidatos: [
      { candidatoId: "cp1", votos: 32, percentual: 40.0 },
      { candidatoId: "cp2", votos: 20, percentual: 25.0 },
      { candidatoId: "cp3", votos: 15, percentual: 18.8 },
      { candidatoId: "cp4", votos: 9, percentual: 11.2 },
      { candidatoId: "cp5", votos: 4, percentual: 5.0 },
    ],
    lider: "Carlos Eduardo",
    corLider: "#2563eb",
  },
  {
    bairro: "Luzia",
    totalEntrevistados: 42,
    candidatos: [
      { candidatoId: "cp2", votos: 15, percentual: 35.7 },
      { candidatoId: "cp1", votos: 12, percentual: 28.6 },
      { candidatoId: "cp3", votos: 8, percentual: 19.0 },
      { candidatoId: "cp4", votos: 5, percentual: 11.9 },
      { candidatoId: "cp5", votos: 2, percentual: 4.8 },
    ],
    lider: "Ana Beatriz",
    corLider: "#dc2626",
  },
  {
    bairro: "Grageru",
    totalEntrevistados: 68,
    candidatos: [
      { candidatoId: "cp1", votos: 26, percentual: 38.2 },
      { candidatoId: "cp2", votos: 18, percentual: 26.5 },
      { candidatoId: "cp3", votos: 13, percentual: 19.1 },
      { candidatoId: "cp4", votos: 7, percentual: 10.3 },
      { candidatoId: "cp5", votos: 4, percentual: 5.9 },
    ],
    lider: "Carlos Eduardo",
    corLider: "#2563eb",
  },
  {
    bairro: "Coroa do Meio",
    totalEntrevistados: 52,
    candidatos: [
      { candidatoId: "cp2", votos: 18, percentual: 34.6 },
      { candidatoId: "cp1", votos: 15, percentual: 28.8 },
      { candidatoId: "cp3", votos: 10, percentual: 19.2 },
      { candidatoId: "cp4", votos: 6, percentual: 11.5 },
      { candidatoId: "cp5", votos: 3, percentual: 5.9 },
    ],
    lider: "Ana Beatriz",
    corLider: "#dc2626",
  },
  {
    bairro: "Inácio Barbosa",
    totalEntrevistados: 45,
    candidatos: [
      { candidatoId: "cp3", votos: 16, percentual: 35.6 },
      { candidatoId: "cp1", votos: 13, percentual: 28.9 },
      { candidatoId: "cp2", votos: 10, percentual: 22.2 },
      { candidatoId: "cp4", votos: 4, percentual: 8.9 },
      { candidatoId: "cp5", votos: 2, percentual: 4.4 },
    ],
    lider: "Roberto Mendes",
    corLider: "#16a34a",
  },
];

// ---------- RESULTADOS POR BAIRRO - VEREADOR ----------
export const resultadosBairroVereador: ResultadoBairro[] = [
  {
    bairro: "Centro",
    totalEntrevistados: 72,
    candidatos: [
      { candidatoId: "cv1", votos: 15, percentual: 20.8 },
      { candidatoId: "cv2", votos: 13, percentual: 18.1 },
      { candidatoId: "cv3", votos: 12, percentual: 16.7 },
      { candidatoId: "cv4", votos: 10, percentual: 13.9 },
      { candidatoId: "cv5", votos: 8, percentual: 11.1 },
      { candidatoId: "cv6", votos: 7, percentual: 9.7 },
    ],
    lider: "Paulo Ferreira",
    corLider: "#2563eb",
  },
  {
    bairro: "Jardins",
    totalEntrevistados: 65,
    candidatos: [
      { candidatoId: "cv2", votos: 14, percentual: 21.5 },
      { candidatoId: "cv1", votos: 12, percentual: 18.5 },
      { candidatoId: "cv3", votos: 11, percentual: 16.9 },
      { candidatoId: "cv4", votos: 9, percentual: 13.8 },
      { candidatoId: "cv5", votos: 8, percentual: 12.3 },
      { candidatoId: "cv6", votos: 6, percentual: 9.2 },
    ],
    lider: "Lucia Santos",
    corLider: "#dc2626",
  },
  {
    bairro: "Atalaia",
    totalEntrevistados: 58,
    candidatos: [
      { candidatoId: "cv3", votos: 13, percentual: 22.4 },
      { candidatoId: "cv1", votos: 11, percentual: 19.0 },
      { candidatoId: "cv2", votos: 10, percentual: 17.2 },
      { candidatoId: "cv4", votos: 8, percentual: 13.8 },
      { candidatoId: "cv5", votos: 7, percentual: 12.1 },
      { candidatoId: "cv6", votos: 5, percentual: 8.6 },
    ],
    lider: "Fernando Alves",
    corLider: "#16a34a",
  },
  {
    bairro: "Farolândia",
    totalEntrevistados: 48,
    candidatos: [
      { candidatoId: "cv1", votos: 10, percentual: 20.8 },
      { candidatoId: "cv2", votos: 9, percentual: 18.8 },
      { candidatoId: "cv4", votos: 8, percentual: 16.7 },
      { candidatoId: "cv3", votos: 7, percentual: 14.6 },
      { candidatoId: "cv5", votos: 6, percentual: 12.5 },
      { candidatoId: "cv6", votos: 5, percentual: 10.4 },
    ],
    lider: "Paulo Ferreira",
    corLider: "#2563eb",
  },
  {
    bairro: "Siqueira Campos",
    totalEntrevistados: 55,
    candidatos: [
      { candidatoId: "cv4", votos: 12, percentual: 21.8 },
      { candidatoId: "cv1", votos: 11, percentual: 20.0 },
      { candidatoId: "cv3", votos: 9, percentual: 16.4 },
      { candidatoId: "cv2", votos: 8, percentual: 14.5 },
      { candidatoId: "cv5", votos: 7, percentual: 12.7 },
      { candidatoId: "cv6", votos: 6, percentual: 10.9 },
    ],
    lider: "Carla Ribeiro",
    corLider: "#9333ea",
  },
  {
    bairro: "13 de Julho",
    totalEntrevistados: 80,
    candidatos: [
      { candidatoId: "cv1", votos: 16, percentual: 20.0 },
      { candidatoId: "cv2", votos: 14, percentual: 17.5 },
      { candidatoId: "cv3", votos: 13, percentual: 16.3 },
      { candidatoId: "cv4", votos: 11, percentual: 13.8 },
      { candidatoId: "cv5", votos: 10, percentual: 12.5 },
      { candidatoId: "cv6", votos: 9, percentual: 11.3 },
    ],
    lider: "Paulo Ferreira",
    corLider: "#2563eb",
  },
  {
    bairro: "Luzia",
    totalEntrevistados: 42,
    candidatos: [
      { candidatoId: "cv2", votos: 10, percentual: 23.8 },
      { candidatoId: "cv4", votos: 8, percentual: 19.0 },
      { candidatoId: "cv1", votos: 7, percentual: 16.7 },
      { candidatoId: "cv3", votos: 6, percentual: 14.3 },
      { candidatoId: "cv5", votos: 5, percentual: 11.9 },
      { candidatoId: "cv6", votos: 4, percentual: 9.5 },
    ],
    lider: "Lucia Santos",
    corLider: "#dc2626",
  },
  {
    bairro: "Grageru",
    totalEntrevistados: 68,
    candidatos: [
      { candidatoId: "cv1", votos: 14, percentual: 20.6 },
      { candidatoId: "cv3", votos: 12, percentual: 17.6 },
      { candidatoId: "cv2", votos: 11, percentual: 16.2 },
      { candidatoId: "cv4", votos: 10, percentual: 14.7 },
      { candidatoId: "cv5", votos: 9, percentual: 13.2 },
      { candidatoId: "cv6", votos: 7, percentual: 10.3 },
    ],
    lider: "Paulo Ferreira",
    corLider: "#2563eb",
  },
  {
    bairro: "Coroa do Meio",
    totalEntrevistados: 52,
    candidatos: [
      { candidatoId: "cv3", votos: 11, percentual: 21.2 },
      { candidatoId: "cv2", votos: 10, percentual: 19.2 },
      { candidatoId: "cv1", votos: 9, percentual: 17.3 },
      { candidatoId: "cv4", votos: 8, percentual: 15.4 },
      { candidatoId: "cv5", votos: 7, percentual: 13.5 },
      { candidatoId: "cv6", votos: 5, percentual: 9.6 },
    ],
    lider: "Fernando Alves",
    corLider: "#16a34a",
  },
  {
    bairro: "Inácio Barbosa",
    totalEntrevistados: 45,
    candidatos: [
      { candidatoId: "cv5", votos: 10, percentual: 22.2 },
      { candidatoId: "cv1", votos: 8, percentual: 17.8 },
      { candidatoId: "cv3", votos: 8, percentual: 17.8 },
      { candidatoId: "cv2", votos: 7, percentual: 15.6 },
      { candidatoId: "cv4", votos: 6, percentual: 13.3 },
      { candidatoId: "cv6", votos: 4, percentual: 8.9 },
    ],
    lider: "Marcos Oliveira",
    corLider: "#f59e0b",
  },
];

// ---------- EVOLUÇÃO TEMPORAL - PREFEITO ----------
export const evolucaoPrefeito: EvolucaoTemporal[] = [
  {
    mes: "Ago",
    candidatos: [
      { candidatoId: "cp1", percentual: 28.0 },
      { candidatoId: "cp2", percentual: 24.5 },
      { candidatoId: "cp3", percentual: 24.0 },
      { candidatoId: "cp4", percentual: 13.5 },
      { candidatoId: "cp5", percentual: 10.0 },
    ],
  },
  {
    mes: "Set",
    candidatos: [
      { candidatoId: "cp1", percentual: 30.2 },
      { candidatoId: "cp2", percentual: 25.0 },
      { candidatoId: "cp3", percentual: 22.8 },
      { candidatoId: "cp4", percentual: 12.5 },
      { candidatoId: "cp5", percentual: 9.5 },
    ],
  },
  {
    mes: "Out",
    candidatos: [
      { candidatoId: "cp1", percentual: 31.5 },
      { candidatoId: "cp2", percentual: 25.3 },
      { candidatoId: "cp3", percentual: 21.5 },
      { candidatoId: "cp4", percentual: 12.0 },
      { candidatoId: "cp5", percentual: 9.7 },
    ],
  },
  {
    mes: "Nov",
    candidatos: [
      { candidatoId: "cp1", percentual: 33.0 },
      { candidatoId: "cp2", percentual: 25.2 },
      { candidatoId: "cp3", percentual: 21.0 },
      { candidatoId: "cp4", percentual: 11.5 },
      { candidatoId: "cp5", percentual: 9.3 },
    ],
  },
  {
    mes: "Dez",
    candidatos: [
      { candidatoId: "cp1", percentual: 34.0 },
      { candidatoId: "cp2", percentual: 25.0 },
      { candidatoId: "cp3", percentual: 20.5 },
      { candidatoId: "cp4", percentual: 11.2 },
      { candidatoId: "cp5", percentual: 9.3 },
    ],
  },
  {
    mes: "Jan",
    candidatos: [
      { candidatoId: "cp1", percentual: 35.2 },
      { candidatoId: "cp2", percentual: 25.1 },
      { candidatoId: "cp3", percentual: 20.0 },
      { candidatoId: "cp4", percentual: 11.0 },
      { candidatoId: "cp5", percentual: 8.7 },
    ],
  },
];

// ---------- EVOLUÇÃO TEMPORAL - VEREADOR ----------
export const evolucaoVereador: EvolucaoTemporal[] = [
  {
    mes: "Ago",
    candidatos: [
      { candidatoId: "cv1", percentual: 16.5 },
      { candidatoId: "cv2", percentual: 14.2 },
      { candidatoId: "cv3", percentual: 12.8 },
      { candidatoId: "cv4", percentual: 11.0 },
      { candidatoId: "cv5", percentual: 9.5 },
      { candidatoId: "cv6", percentual: 8.8 },
    ],
  },
  {
    mes: "Set",
    candidatos: [
      { candidatoId: "cv1", percentual: 17.0 },
      { candidatoId: "cv2", percentual: 14.8 },
      { candidatoId: "cv3", percentual: 12.5 },
      { candidatoId: "cv4", percentual: 11.2 },
      { candidatoId: "cv5", percentual: 9.8 },
      { candidatoId: "cv6", percentual: 9.0 },
    ],
  },
  {
    mes: "Out",
    candidatos: [
      { candidatoId: "cv1", percentual: 17.5 },
      { candidatoId: "cv2", percentual: 15.0 },
      { candidatoId: "cv3", percentual: 12.8 },
      { candidatoId: "cv4", percentual: 11.5 },
      { candidatoId: "cv5", percentual: 10.0 },
      { candidatoId: "cv6", percentual: 9.2 },
    ],
  },
  {
    mes: "Nov",
    candidatos: [
      { candidatoId: "cv1", percentual: 18.0 },
      { candidatoId: "cv2", percentual: 15.3 },
      { candidatoId: "cv3", percentual: 13.0 },
      { candidatoId: "cv4", percentual: 11.5 },
      { candidatoId: "cv5", percentual: 10.2 },
      { candidatoId: "cv6", percentual: 9.5 },
    ],
  },
  {
    mes: "Dez",
    candidatos: [
      { candidatoId: "cv1", percentual: 18.2 },
      { candidatoId: "cv2", percentual: 15.5 },
      { candidatoId: "cv3", percentual: 13.0 },
      { candidatoId: "cv4", percentual: 11.6 },
      { candidatoId: "cv5", percentual: 10.3 },
      { candidatoId: "cv6", percentual: 9.6 },
    ],
  },
  {
    mes: "Jan",
    candidatos: [
      { candidatoId: "cv1", percentual: 18.4 },
      { candidatoId: "cv2", percentual: 15.6 },
      { candidatoId: "cv3", percentual: 13.0 },
      { candidatoId: "cv4", percentual: 11.6 },
      { candidatoId: "cv5", percentual: 10.4 },
      { candidatoId: "cv6", percentual: 9.6 },
    ],
  },
];

// ---------- DEMOGRÁFICOS - PREFEITO ----------
export const demograficosPrefeito: DadosDemograficos = {
  faixaEtaria: [
    {
      faixa: "18-29",
      candidatos: [
        { candidatoId: "cp1", pct: 28.5 },
        { candidatoId: "cp2", pct: 26.8 },
        { candidatoId: "cp3", pct: 18.2 },
        { candidatoId: "cp4", pct: 16.5 },
        { candidatoId: "cp5", pct: 10.0 },
      ],
    },
    {
      faixa: "30-44",
      candidatos: [
        { candidatoId: "cp1", pct: 35.0 },
        { candidatoId: "cp2", pct: 24.5 },
        { candidatoId: "cp3", pct: 20.5 },
        { candidatoId: "cp4", pct: 11.0 },
        { candidatoId: "cp5", pct: 9.0 },
      ],
    },
    {
      faixa: "45-59",
      candidatos: [
        { candidatoId: "cp1", pct: 37.8 },
        { candidatoId: "cp2", pct: 25.0 },
        { candidatoId: "cp3", pct: 20.2 },
        { candidatoId: "cp4", pct: 9.5 },
        { candidatoId: "cp5", pct: 7.5 },
      ],
    },
    {
      faixa: "60+",
      candidatos: [
        { candidatoId: "cp1", pct: 40.2 },
        { candidatoId: "cp2", pct: 24.5 },
        { candidatoId: "cp3", pct: 19.3 },
        { candidatoId: "cp4", pct: 8.5 },
        { candidatoId: "cp5", pct: 7.5 },
      ],
    },
  ],
  genero: [
    {
      genero: "Masculino",
      candidatos: [
        { candidatoId: "cp1", pct: 38.0 },
        { candidatoId: "cp2", pct: 23.5 },
        { candidatoId: "cp3", pct: 21.5 },
        { candidatoId: "cp4", pct: 9.5 },
        { candidatoId: "cp5", pct: 7.5 },
      ],
    },
    {
      genero: "Feminino",
      candidatos: [
        { candidatoId: "cp1", pct: 32.5 },
        { candidatoId: "cp2", pct: 26.8 },
        { candidatoId: "cp3", pct: 18.5 },
        { candidatoId: "cp4", pct: 12.5 },
        { candidatoId: "cp5", pct: 9.7 },
      ],
    },
  ],
};

// ---------- DEMOGRÁFICOS - VEREADOR ----------
export const demograficosVereador: DadosDemograficos = {
  faixaEtaria: [
    {
      faixa: "18-29",
      candidatos: [
        { candidatoId: "cv1", pct: 16.5 },
        { candidatoId: "cv2", pct: 15.2 },
        { candidatoId: "cv3", pct: 13.5 },
        { candidatoId: "cv4", pct: 14.8 },
        { candidatoId: "cv5", pct: 10.0 },
        { candidatoId: "cv6", pct: 9.5 },
      ],
    },
    {
      faixa: "30-44",
      candidatos: [
        { candidatoId: "cv1", pct: 18.8 },
        { candidatoId: "cv2", pct: 15.5 },
        { candidatoId: "cv3", pct: 13.0 },
        { candidatoId: "cv4", pct: 11.7 },
        { candidatoId: "cv5", pct: 10.5 },
        { candidatoId: "cv6", pct: 9.8 },
      ],
    },
    {
      faixa: "45-59",
      candidatos: [
        { candidatoId: "cv1", pct: 19.5 },
        { candidatoId: "cv2", pct: 16.0 },
        { candidatoId: "cv3", pct: 13.2 },
        { candidatoId: "cv4", pct: 11.0 },
        { candidatoId: "cv5", pct: 10.8 },
        { candidatoId: "cv6", pct: 9.8 },
      ],
    },
    {
      faixa: "60+",
      candidatos: [
        { candidatoId: "cv1", pct: 20.0 },
        { candidatoId: "cv2", pct: 16.5 },
        { candidatoId: "cv3", pct: 12.5 },
        { candidatoId: "cv4", pct: 10.5 },
        { candidatoId: "cv5", pct: 11.0 },
        { candidatoId: "cv6", pct: 9.5 },
      ],
    },
  ],
  genero: [
    {
      genero: "Masculino",
      candidatos: [
        { candidatoId: "cv1", pct: 19.5 },
        { candidatoId: "cv2", pct: 14.8 },
        { candidatoId: "cv3", pct: 14.0 },
        { candidatoId: "cv4", pct: 10.5 },
        { candidatoId: "cv5", pct: 11.2 },
        { candidatoId: "cv6", pct: 9.0 },
      ],
    },
    {
      genero: "Feminino",
      candidatos: [
        { candidatoId: "cv1", pct: 17.2 },
        { candidatoId: "cv2", pct: 16.5 },
        { candidatoId: "cv3", pct: 12.0 },
        { candidatoId: "cv4", pct: 12.8 },
        { candidatoId: "cv5", pct: 9.5 },
        { candidatoId: "cv6", pct: 10.2 },
      ],
    },
  ],
};
