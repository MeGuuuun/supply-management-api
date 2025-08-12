import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        // 예외 메시지가 객체일 경우, message와 코드 추출
        let message = 'Internal server error';
        let code = status;

        if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            message = (exceptionResponse as any).message || message;
            code = (exceptionResponse as any).code || code;
        } else {
            message = exceptionResponse as string;
        }

        // 커스텀 응답 포맷
        response.status(status).json({
            statusCode: status,
            code,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}
