import { NextResponse } from 'next/server';

type ApiResponseData = {
    success: boolean;
    message?: string;
    data?: unknown;
    error?: string;
    details?: unknown;
    pagination?: unknown;
};

export class ApiResponse {
    /**
     * Return a success response
     */
    static success(data: unknown, message?: string, status = 200, pagination?: unknown) {
        const body: ApiResponseData = {
            success: true,
            data,
        };

        if (message) {
            body.message = message;
        }

        if (pagination) {
            body.pagination = pagination;
        }

        return NextResponse.json(body, { status });
    }

    /**
     * Return an error response
     */
    static error(message: string, status = 400, details?: unknown) {
        const body: ApiResponseData = {
            success: false,
            error: message,
        };

        if (details) {
            body.details = details;
        }

        return NextResponse.json(body, { status });
    }

    /**
     * Return a server error response (500)
     */
    static serverError(message = 'Internal server error', details?: unknown) {
        return this.error(message, 500, details);
    }

    /**
     * Return an unauthorized response (401)
     */
    static unauthorized(message = 'Unauthorized') {
        return this.error(message, 401);
    }

    /**
     * Return a validation error response (422)
     */
    static validationError(details?: unknown, message = 'Validation error') {
        return this.error(message, 422, details);
    }
}

