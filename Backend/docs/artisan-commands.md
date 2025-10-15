# Comandos Artisan Customizados (Hexagonal)

Este documento lista e explica os comandos Artisan adicionados para acelerar a adoção da arquitetura hexagonal.

## Sumário
- [make:port](#makeport)
- [make:adapter](#makeadapter)
- [make:usecase](#makeusecase)
- [make:dto](#makedto)
- [make:service](#makeservice)

---
### `make:port`
Gera uma interface de Port (contrato de aplicação) em `Application/Ports`.

Uso básico:
```
php artisan make:port NomeDaPort
```
Resultado:
- Cria `app/Application/Ports/NomeDaPort.php` (interface)

### `make:adapter`
Gera um Adapter (implementação de integração / infraestrutura). Atualmente salva em `app/Adapters`.

Uso:
```
php artisan make:adapter NomeDoAdapter
```
Resultado:
- Cria `app/Adapters/NomeDoAdapter.php`

Observação:
- Ajuste manualmente a interface implementada após gerar (ex.: implementar `StudentRepositoryPort`).
- Em futura evolução você pode mover Adapters para um namespace `Infrastructure` se desejar.

### `make:usecase`
Gera um caso de uso (Use Case) na camada de aplicação. (Opcional se você optar por Services.)

Uso:
```
php artisan make:usecase NomeDoUseCase
```
Resultado:
- Cria `app/Application/UseCases/NomeDoUseCase.php`

### `make:dto`
Gera um DTO (Data Transfer Object) para requests/responses entre camada externa e aplicação.

Uso:
```
php artisan make:dto NomeDoDto
```
Resultado:
- Cria `app/Application/DTOs/NomeDoDto.php`

Sugestões:
- Use sufixos `InputDto` e `OutputDto` quando fizer sentido.

### `make:service`
Gera um Service de aplicação. Pode gerar uma Port automaticamente (derivada ou customizada).

Usos:
```
# Apenas o Service
php artisan make:service Billing/InvoiceService

# Service + Port derivada (InvoicePort)
php artisan make:service Billing/InvoiceService --port

# Service + Port com nome customizado
php artisan make:service Billing/InvoiceService --contract=InvoiceServiceContract
```

Comportamento:
- Sem `--port` e sem `--contract`: gera só o Service (remove placeholders de interface).
- Com `--port`: gera Service + interface derivada `InvoicePort`.
- Com `--contract=Nome`: gera Service + interface `Nome` (mesmo sem `--port`).
- Se arquivo de Port já existir, não sobrescreve e avisa.

Resultado (exemplo `--contract=InvoiceServiceContract`):
- `app/Application/Services/Billing/InvoiceService.php`
- `app/Application/Ports/InvoiceServiceContract.php`

Convenções sugeridas:
- Derivação: Remove o sufixo `Service` e adiciona `Port` (ex.: `StudentService` -> `StudentPort`).
- Use `--contract` para nomes mais expressivos (`StudentServiceContract`, `PaymentProcessingPort`).

Boas práticas para Services:
- Coordenam regras; delegam persistência a Adapters via Ports.
- Retornam DTOs ou estruturas simples; evite retornar Models Eloquent diretamente.

---
## Boas Práticas
- Ports devem ser estáveis: mudanças nelas impactam múltiplos adapters.
- Adapters não devem conter regra de negócio — apenas integração (DB, API externa, fila, etc.).
- DTOs isolam a borda: nunca exponha Models Eloquent diretamente em controllers.
- Services / UseCases testáveis via mocks das Ports.
- Nomeie Ports pelo papel (ex.: `StudentRepositoryPort`, `EnrollmentPort`) e não pela tecnologia.
- Prefira usar `--contract` quando o nome derivado não comunica claramente o propósito.

## Próximos Passos (Ideias Futuras)
- Comando `make:query` para cenários somente leitura (Queries separadas de Commands).
- Comando `make:exception` para exceções de domínio.
- Geração opcional de testes stub (ex.: `--test`).
- Auto-binding de Ports para Services (scan em `Application/Ports`).
- Suporte a `--force` para sobrescrever (com confirmação) arquivos.

---
Última atualização: 2025-10-07 (ajustada para incluir `--contract` e comportamento implícito de geração de Port).
