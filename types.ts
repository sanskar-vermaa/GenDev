export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GeneratedCode {
  html: string;
  css: string;
  javascript: string;
  prompt: string;
  timestamp: number;
}

export interface GeneratedImage {
  dataUrl: string;
  prompt: string;
  timestamp: number;
}

export interface ServiceError {
  message: string;
}