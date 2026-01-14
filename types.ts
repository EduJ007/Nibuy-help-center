
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
