import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class HttpErrorFilter implements ExceptionFilter {
    private readonly logger;
    constructor();
    catch(exception: Error, host: ArgumentsHost): any;
}
