export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.status =
          'Bad Request, missing typically due to malformed request syntax, invalid request message framing, or deceptive request routing.';
        break;
      case 401:
        this.status = 'Unauthorized, you are not logged in.';
        break;
      case 403:
        this.status =
          'Forbidden. The request failure is tied to application logic, such as insufficient permissions to a resource or action.';
        break;
      case 404:
        this.status =
          'Not found. The server cannot find the requested resource.';
        break;
      case 405:
        this.status = 'Metod not allowed.';
        break;
      case 415:
        this.status = 'The media type is not supported.';
        break;
      case statusCode.toString().startsWith('5'):
        this.status = 'Internal Server Error';
        break;
      default:
        this.status = 'Request failed due to an unknown error.';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
