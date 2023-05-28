import { ServerErrorDefinition } from '../types';

export class ApplicationError extends Error {
  public statusCode: number;
  public type: ServerErrorDefinition;

  constructor({
    message,
    statusCode,
    type
  }: {
    message: string;
    statusCode: number;
    type: ServerErrorDefinition;
  }) {
    super(message);

    this.statusCode = statusCode;
    this.type = type;
  }
}
