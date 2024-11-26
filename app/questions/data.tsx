// questions.tsx
interface AnswerOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  explanation: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  status: 'correct' | 'wrong' | 'pending';
  name: string;
  unit: string;
  stem: string;
  answers: AnswerOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    status: 'correct',
    name: 'Addition',
    unit: 'Basic Math',
    stem: 'What is 2 + 2?',
    answers: [
      {
        id: 'A',
        text: '3',
        explanation: 'Incorrect. 2 + 2 is not 3, as this is less than the sum.',
        isCorrect: false
      },
      {
        id: 'B',
        text: '4',
        explanation: 'Correct! 2 + 2 equals 4 because when we combine two groups of two, we get four.',
        isCorrect: true
      },
      {
        id: 'C',
        text: '5',
        explanation: 'Incorrect. 2 + 2 is not 5, as this is more than the sum.',
        isCorrect: false
      },
      {
        id: 'D',
        text: '6',
        explanation: 'Incorrect. 2 + 2 is not 6, as this is too large.',
        isCorrect: false
      }
    ]
  },
  {
    id: 2,
    status: 'pending',
    name: 'Subtraction',
    unit: 'Basic Math',
    stem: 'What is 5 - 3?',
    answers: [
      {
        id: 'A',
        text: '2',
        explanation: 'Correct! 5 - 3 equals 2.',
        isCorrect: true
      },
      {
        id: 'B',
        text: '1',
        explanation: 'Incorrect. 5 - 3 is not 1.',
        isCorrect: false
      },
      {
        id: 'C',
        text: '8',
        explanation: 'Incorrect. 5 - 3 is not 8.',
        isCorrect: false
      },
      {
        id: 'D',
        text: '0',
        explanation: 'Incorrect. 5 - 3 is not 0.',
        isCorrect: false
      }
    ]
  }
  // You can add more questions here
];


