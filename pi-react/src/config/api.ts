/**
 * Configuração centralizada da API
 * Importar este arquivo em qualquer service que precisar acessar a API
 */

// URL base da API (vem do .env)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// URL base para endpoints da API
export const API_BASE_URL = `${API_URL}/api`;

// Funções auxiliares
export const getFullUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Headers padrão
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('Define-Pilates-AuthToken');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Log em desenvolvimento
if (import.meta.env.DEV) {
  console.log('🌐 API Configuration:', {
    API_URL,
    API_BASE_URL,
  });
}

// Exportar como default também
export default {
  API_URL,
  API_BASE_URL,
  getFullUrl,
  getAuthHeaders,
};