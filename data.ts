import { QuestionCategory } from './types';

export const categories: QuestionCategory[] = [
  {
    id: 'identification',
    title: 'Identificação da IA',
    description: 'Informações básicas sobre a IA e seu propósito',
    questions: [
      {
        id: 'ia_nome',
        text: 'Qual será o nome da IA?',
        type: 'text',
        required: true
      },
      {
        id: 'objetivo_ia',
        text: 'Qual o objetivo principal da IA?',
        type: 'textarea',
        required: true
      },
      {
        id: 'necessidade_cliente',
        text: 'Quais as principais necessidades do cliente que a IA deve atender?',
        type: 'textarea',
        required: true
      },
      {
        id: 'publico_alvo',
        text: 'Qual o público-alvo da IA?',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'specialization',
    title: 'Especialização e Respostas',
    description: 'Defina as capacidades e limites de resposta da IA',
    questions: [
      {
        id: 'especializacoes',
        text: 'Quais são as áreas de especialização da IA?',
        type: 'checkbox',
        options: ['Direito Civil', 'Direito Penal', 'Direito Trabalhista', 'Direito Tributário', 'Direito Empresarial'],
        required: true
      },
      {
        id: 'ia_responde_basico',
        text: 'A IA deve responder questões básicas de direito?',
        type: 'select',
        options: ['Sim', 'Não', 'Apenas em suas áreas de especialização']
      },
      {
        id: 'ia_explica_generico',
        text: 'A IA deve fornecer explicações genéricas sobre termos jurídicos?',
        type: 'select',
        options: ['Sim', 'Não', 'Apenas quando solicitado']
      },
      {
        id: 'ia_sugestao_jurisprudencia',
        text: 'A IA deve sugerir jurisprudência relevante?',
        type: 'select',
        options: ['Sim', 'Não', 'Apenas em casos específicos']
      }
    ]
  },
  {
    id: 'communication',
    title: 'Tom de Voz e Estilo de Comunicação',
    description: 'Configure como a IA deve se comunicar',
    questions: [
      {
        id: 'nivel_persuasao',
        text: 'Qual deve ser o nível de persuasão da IA?',
        type: 'select',
        options: ['Baixo', 'Médio', 'Alto']
      },
      {
        id: 'estilo_comunicacao',
        text: 'Selecione os estilos de comunicação desejados',
        type: 'checkbox',
        options: ['Amigável', 'Profissional', 'Proativa', 'Reativa', 'Empática'],
        required: true
      },
      {
        id: 'nivel_comunicacao',
        text: 'Selecione os níveis de comunicação apropriados',
        type: 'checkbox',
        options: ['Simples', 'Técnica', 'Objetiva', 'Explicativa'],
        required: true
      },
      {
        id: 'humor',
        text: 'A IA deve usar humor em suas respostas?',
        type: 'select',
        options: ['Nunca', 'Raramente', 'Quando apropriado', 'Frequentemente']
      }
    ]
  },
  {
    id: 'response_structure',
    title: 'Complexidade e Estrutura da Resposta',
    description: 'Define como as respostas devem ser estruturadas',
    questions: [
      {
        id: 'nivel_complexidade',
        text: 'Qual o nível de complexidade das respostas?',
        type: 'select',
        options: ['Básico', 'Intermediário', 'Avançado', 'Adaptativo'],
        required: true
      },
      {
        id: 'tipo_encaminhamento',
        text: 'Como a IA deve encaminhar questões fora de seu escopo?',
        type: 'select',
        options: ['Informar limitação', 'Sugerir especialista', 'Encaminhar para humano', 'Combinar opções'],
        required: true
      },
      {
        id: 'informar_sugestao_alternativa',
        text: 'A IA deve sugerir alternativas quando não puder resolver algo?',
        type: 'select',
        options: ['Sim', 'Não', 'Apenas em casos específicos']
      }
    ]
  },
  {
    id: 'rules',
    title: 'Regras e Restrições',
    description: 'Estabeleça os limites e regras de operação',
    questions: [
      {
        id: 'impeditivos',
        text: 'Quais são os impeditivos para atuação da IA?',
        type: 'checkbox',
        options: ['Questões criminais', 'Casos complexos', 'Emergências', 'Questões éticas'],
        required: true
      },
      {
        id: 'formas_de_contratacao',
        text: 'Quais formas de contratação a IA deve conhecer?',
        type: 'checkbox',
        options: ['Honorários fixos', 'Hora técnica', 'Êxito', 'Mensalidade'],
        required: true
      },
      {
        id: 'maximo_de_perguntas',
        text: 'Qual o número máximo de perguntas por interação?',
        type: 'select',
        options: ['1', '2', '3', '4', '5', 'Sem limite'],
        required: true
      }
    ]
  },
  {
    id: 'benefits',
    title: 'Benefícios e Valores',
    description: 'Configure aspectos relacionados a benefícios e valores',
    questions: [
      {
        id: 'beneficios_enfatizar',
        text: 'Quais benefícios devem ser enfatizados?',
        type: 'checkbox',
        options: ['Rapidez', 'Economia', 'Especialização', 'Disponibilidade 24/7', 'Personalização'],
        required: true
      },
      {
        id: 'informar_valores_oab',
        text: 'A IA deve informar sobre valores da tabela OAB?',
        type: 'select',
        options: ['Sim', 'Não', 'Apenas quando solicitado'],
        required: true
      }
    ]
  },
  {
    id: 'customization',
    title: 'Personalização e Formatação',
    description: 'Defina aspectos de personalização das respostas',
    questions: [
      {
        id: 'restricoes_terminologia',
        text: 'Existem restrições quanto à terminologia?',
        type: 'textarea'
      },
      {
        id: 'formatacao',
        text: 'Como as respostas devem ser formatadas?',
        type: 'checkbox',
        options: ['Parágrafos curtos', 'Bullets', 'Numeração', 'Destaque para termos importantes'],
        required: true
      },
      {
        id: 'banco_respostas',
        text: 'A IA deve manter um banco de respostas frequentes?',
        type: 'select',
        options: ['Sim', 'Não', 'Apenas para tópicos complexos'],
        required: true
      }
    ]
  }
];
