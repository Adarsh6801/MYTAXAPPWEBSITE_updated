export interface ITaxPayerInfoStepsProps {
  state: any;
  onStepSubmit: (values: object[]) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  goTo?: (pageNumber: number) => void;
}

export interface IOrganizerQuestionStatus {
  comment: string;
  reminder: boolean;
}

export interface IOrganizerStepProps {
  question: string;
  message: string;
  reminder: boolean;
  answer: null | FileList | string | number | boolean;
  isFile: boolean;
  file?: FileList | null;
  files?: any;
}
