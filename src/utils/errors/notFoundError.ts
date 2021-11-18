export class NotFoundError extends Error {

  private errorStatus: number

  constructor(message = "Data not found") {
    super(message);
    this.errorStatus = 404
  }
}