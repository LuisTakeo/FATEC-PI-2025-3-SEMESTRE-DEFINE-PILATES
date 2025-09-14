-- Script de inicialização do MySQL para Define Pilates

-- Criar usuário específico para a aplicação (se não existir)
CREATE USER IF NOT EXISTS 'laravel'@'%' IDENTIFIED BY 'password';

-- Garantir privilégios ao usuário
GRANT ALL PRIVILEGES ON define_pilates.* TO 'laravel'@'%';

-- Aplicar as mudanças
FLUSH PRIVILEGES;

-- Usar o banco de dados
USE define_pilates;

-- Criar algumas tabelas básicas (exemplo)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- Inserir dados de exemplo (opcional)
INSERT IGNORE INTO users (name, email, password, created_at, updated_at) VALUES
('Admin User', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());

-- Outros comandos de inicialização podem ser adicionados aqui
