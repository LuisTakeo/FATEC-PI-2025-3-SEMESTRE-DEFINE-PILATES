<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class ApiExceptionHandler extends ExceptionHandler
{
    /**
     * Render an exception as an HTTP response.
     */
    public function render($request, Throwable $e): JsonResponse
    {
        if ($request->is('api/*')) {
            return $this->handleApiException($request, $e);
        }

        return parent::render($request, $e);
    }

    /**
     * Handle API exceptions in a consistent format
     */
    private function handleApiException(Request $request, Throwable $e): JsonResponse
    {
        $response = [
            'success' => false,
            'architecture' => 'Hexagonal Architecture',
            'timestamp' => now()->toISOString(),
        ];

        if ($e instanceof ValidationException) {
            $response['message'] = 'Validation failed';
            $response['errors'] = $e->errors();
            return response()->json($response, 422);
        }

        if ($e instanceof HttpException) {
            $response['message'] = $e->getMessage() ?: 'HTTP Exception';
            return response()->json($response, $e->getStatusCode());
        }

        if ($e instanceof \InvalidArgumentException) {
            $response['message'] = $e->getMessage();
            return response()->json($response, 400);
        }

        // Generic error
        $response['message'] = app()->environment('production')
            ? 'An error occurred while processing your request'
            : $e->getMessage();

        if (!app()->environment('production')) {
            $response['debug'] = [
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ];
        }

        return response()->json($response, 500);
    }
}
