class ApiError extends Error {
  public code: number;
  public message: string;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export default ApiError;
