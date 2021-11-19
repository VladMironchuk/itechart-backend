export class NotAuthorizedError extends Error {

  private errorStatus: number

  constructor(message = "Unauthorized") {
    super(message);
    this.errorStatus = 401
  }
}