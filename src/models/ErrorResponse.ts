export class ErrorResponse {
  public error: {
    message: string;
  };

  constructor(message: string) {
    this.error = {
      message
    }
  }
}
