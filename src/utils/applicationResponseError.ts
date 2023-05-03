export default class ApplicationResponseException extends Error {
  statusCode: any;
  errorCode: any;
  actualError: any;
  constructor(
    message: string,
    statusCode: any,
    errorCode = null,
    actualError = null
  ) {
    super(message);
    this.name = "ApplicationResponseException";
    if (statusCode) this.statusCode = statusCode;
    if (errorCode) this.errorCode = errorCode;
    if (actualError) this.actualError = actualError;
  }
}
