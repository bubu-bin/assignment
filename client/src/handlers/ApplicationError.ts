export class ApplicationError extends Error {
  public statusCode?: string;

  constructor({
    message,
    statusCode
  }: {
    message: string;
    statusCode?: string;
  }) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
