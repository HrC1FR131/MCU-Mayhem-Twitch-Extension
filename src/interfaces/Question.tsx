export interface Question {
  number: number;
  question: string;
  type: string;
  time: number;
  choices: string;
  answer: string;
  weight: number;
  asked: boolean;
}
