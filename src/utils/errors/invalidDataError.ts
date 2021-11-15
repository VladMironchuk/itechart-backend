export class InvalidDataError extends Error {

  private errorStatus: number

  constructor(status, message = status.message) {
    super(message);
    this.errorStatus = status
  }
}