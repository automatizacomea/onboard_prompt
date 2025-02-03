import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, CheckCircle2, Save, Download } from 'lucide-react';
import { QuestionCategory } from './types';
import { categories } from './data';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showSummary, setShowSummary] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('questionnaireProgress');
    if (savedProgress) {
      const { currentStep: savedStep, answers: savedAnswers } = JSON.parse(savedProgress);
      setCurrentStep(savedStep);
      setAnswers(savedAnswers);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('questionnaireProgress', JSON.stringify({
      currentStep,
      answers
    }));
  }, [currentStep, answers]);

  const currentCategory = categories[currentStep];

  const isQuestionVisible = (question: Question) => {
    if (!question.condition) return true;
    const { dependsOn, value } = question.condition;
    const dependentAnswer = answers[dependsOn];
    return Array.isArray(value) 
      ? value.some(v => dependentAnswer === v)
      : dependentAnswer === value;
  };

  const isStepComplete = () => {
    return currentCategory.questions
      .filter(isQuestionVisible)
      .every(q => !q.required || answers[q.id]);
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep === categories.length - 1) {
      setShowSummary(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Final answers:', answers);
    // Here you would typically send the data to your backend
    alert('Questionário enviado com sucesso!');
    // Clear localStorage after successful submission
    localStorage.removeItem('questionnaireProgress');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(answers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ia-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveProgress = () => {
    alert('Progresso salvo! Você pode continuar mais tarde.');
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumo das Respostas</h2>
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{category.title}</h3>
              {category.questions.filter(isQuestionVisible).map((question) => (
                <div key={question.id} className="mb-4">
                  <p className="text-gray-600 font-medium">{question.text}</p>
                  <p className="text-gray-800 mt-1">
                    {Array.isArray(answers[question.id])
                      ? (answers[question.id] as string[]).join(', ')
                      : answers[question.id] as string}
                  </p>
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setShowSummary(false)}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleExport}
                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Exportar JSON
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`flex items-center ${
                  index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / categories.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentCategory.title}</h2>
          {currentCategory.description && (
            <p className="text-gray-600 mb-6">{currentCategory.description}</p>
          )}
          
          {currentCategory.questions.filter(isQuestionVisible).map((question) => (
            <div key={question.id} className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {question.text}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {question.type === 'text' && (
                <input
                  type="text"
                  value={answers[question.id] as string || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Digite sua resposta..."
                />
              )}
              {question.type === 'textarea' && (
                <textarea
                  value={answers[question.id] as string || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Digite sua resposta..."
                  rows={4}
                />
              )}
              {question.type === 'select' && (
                <select
                  value={answers[question.id] as string || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Selecione uma opção</option>
                  {question.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {question.type === 'checkbox' && (
                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={Array.isArray(answers[question.id]) && 
                          (answers[question.id] as string[]).includes(option)}
                        onChange={(e) => {
                          const currentValues = (answers[question.id] as string[]) || [];
                          const newValues = e.target.checked
                            ? [...currentValues, option]
                            : currentValues.filter(v => v !== option);
                          handleAnswer(question.id, newValues);
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-between mt-8">
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center px-6 py-3 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800'
                } transition-colors`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Voltar
              </button>
              <button
                onClick={handleSaveProgress}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Salvar Progresso
              </button>
            </div>
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={`flex items-center px-8 py-3 rounded-lg transition-colors ${
                isStepComplete()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === categories.length - 1 ? 'Revisar' : 'Próximo'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
