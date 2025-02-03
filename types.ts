export interface Question {
  id: string;
  text: string;
  type: 'text' | 'select' | 'checkbox' | 'textarea';
  options?: string[];
  required?: boolean;
  condition?: {
    dependsOn: string;
    value: string | string[];
  };
}

export interface QuestionCategory {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuestionnaireState {
  currentStep: number;
  answers: Record<string, string | string[]>;
  isComplete: boolean;
}
