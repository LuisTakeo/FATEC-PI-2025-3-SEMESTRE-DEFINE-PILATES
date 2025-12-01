import { API_URL } from "../config/api";

export interface HealthCheckResponse {
    status: 'ok' | 'error';
    timestamp?: string;
    message?: string;
    version?: string;
}

/**
 * Verifica se o backend está acessível
 * @returns Promise com status do healthcheck
 */
export async function checkBackendHealth(): Promise<HealthCheckResponse> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(`${API_URL}/api/health`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return {
                status: 'error',
                message: `Backend respondeu com status ${response.status}`,
                timestamp: new Date().toISOString()
            };
        }

        const data = await response.json();
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            ...data
        };

    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return {
                    status: 'error',
                    message: 'Timeout: Backend não respondeu em 5 segundos',
                    timestamp: new Date().toISOString()
                };
            }
            return {
                status: 'error',
                message: `Erro ao conectar: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
        return {
            status: 'error',
            message: 'Erro desconhecido ao conectar com o backend',
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Hook personalizado para verificar health periodicamente
 * Uso: const health = useHealthCheck(30000); // verifica a cada 30s
 */
export function createHealthMonitor(intervalMs: number = 30000, onStatusChange?: (status: HealthCheckResponse) => void) {
    let intervalId: NodeJS.Timeout | null = null;

    const start = () => {
        // Verifica imediatamente
        checkBackendHealth().then(onStatusChange);

        // Continua verificando no intervalo
        intervalId = setInterval(() => {
            checkBackendHealth().then(onStatusChange);
        }, intervalMs);
    };

    const stop = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    return { start, stop };
}
