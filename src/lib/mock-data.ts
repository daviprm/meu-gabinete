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
  { id: "1", titulo: "Reunião de equipe", data: "2026-02-10", horario: "09:00", local: "Gabinete", tipo: "Reunião", descricao: "Alinhamento semanal" },
  { id: "2", titulo: "Visita ao bairro Centro", data: "2026-02-10", horario: "14:00", local: "Praça da Sé", tipo: "Visita" },
  { id: "3", titulo: "Audiência pública - Saúde", data: "2026-02-12", horario: "10:00", local: "Câmara Municipal", tipo: "Audiência" },
  { id: "4", titulo: "Evento comunitário Mooca", data: "2026-02-14", horario: "16:00", local: "Associação de Moradores", tipo: "Evento" },
  { id: "5", titulo: "Reunião com vereadores", data: "2026-02-15", horario: "11:00", local: "Câmara Municipal", tipo: "Reunião" },
  { id: "6", titulo: "Campanha porta a porta", data: "2026-02-17", horario: "08:00", local: "Vila Madalena", tipo: "Campanha" },
  { id: "7", titulo: "Visita escola municipal", data: "2026-02-18", horario: "09:30", local: "EM Prof. João Silva", tipo: "Visita" },
  { id: "8", titulo: "Reunião comunidade Santana", data: "2026-02-20", horario: "19:00", local: "Centro Comunitário", tipo: "Reunião" },
  { id: "9", titulo: "Inauguração praça", data: "2026-02-22", horario: "10:00", local: "Pinheiros", tipo: "Evento" },
  { id: "10", titulo: "Audiência transporte", data: "2026-02-25", horario: "14:00", local: "Câmara Municipal", tipo: "Audiência" },
  { id: "11", titulo: "Reunião de planejamento mensal", data: "2026-03-01", horario: "09:00", local: "Gabinete", tipo: "Reunião" },
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
