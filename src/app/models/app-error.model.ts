export interface AppError {
  status?: number;
  message?: string;
  errorMessage?: string[];
  validationErrors?: AppValidationError[];
  stackTrace?: string;
  referenceId?: string;
}

export interface AppValidationError {
  fieldName: string;
  message: string;
}