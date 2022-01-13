import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : "Internal server error";

    const devErrorResponse: any = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: exception?.message,
    };

    const prodErrorResponse: any = {
      statusCode,
      message,
    };
    this.logger.log(
      `request method: ${request.method} request url${request.url}`,
      JSON.stringify(devErrorResponse)
    );
    response
      .status(statusCode)
      .json(
        process.env.NODE_ENV === "development"
          ? devErrorResponse
          : prodErrorResponse
      );
  }
}
