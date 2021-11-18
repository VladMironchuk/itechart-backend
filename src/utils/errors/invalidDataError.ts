export class InvalidDataError extends Error {

  private errorStatus: number

  constructor(message = "Invalid data input") {
    super(message);
    this.errorStatus = 400
  }
}