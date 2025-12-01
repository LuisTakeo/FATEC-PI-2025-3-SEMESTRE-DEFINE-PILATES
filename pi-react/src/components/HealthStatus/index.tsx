import { useState, useEffect } from 'react';
import { checkBackendHealth, type HealthCheckResponse } from '../../services/healthcheck';

/**
 * Componente para mostrar status do backend
 * Pode ser usado em desenvolvimento ou em produção
 */
export function HealthStatus() {
    const [health, setHealth] = useState<HealthCheckResponse | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const checkHealth = async () => {
        setIsChecking(true);
        const result = await checkBackendHealth();
        setHealth(result);
        setIsChecking(false);
    };

    useEffect(() => {
        checkHealth();
        
        // Verifica a cada 30 segundos
        const interval = setInterval(checkHealth, 30000);
        
        return () => clearInterval(interval);
    }, []);

    if (!health) {
        return (
            <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                <span className="text-sm">Verificando conexão...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div 
                className={`w-2 h-2 rounded-full ${
                    health.status === 'ok' 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                } ${isChecking ? 'animate-pulse' : ''}`}
            />
            <span className={`text-sm ${
                health.status === 'ok' 
                    ? 'text-green-600' 
                    : 'text-red-600'
            }`}>
                {health.status === 'ok' ? 'Backend Online' : 'Backend Offline'}
            </span>
            {health.message && (
                <span className="text-xs text-gray-500">
                    ({health.message})
                </span>
            )}
        </div>
    );
}

/**
 * Hook personalizado para usar healthcheck em qualquer componente
 */
export function useHealthCheck(intervalMs: number = 30000) {
    const [health, setHealth] = useState<HealthCheckResponse | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        const check = async () => {
            setIsChecking(true);
            const result = await checkBackendHealth();
            setHealth(result);
            setIsChecking(false);
        };

        check(); // Verifica imediatamente
        const interval = setInterval(check, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return { health, isChecking };
}
