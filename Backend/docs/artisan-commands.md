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
Gera uma interface de Port.

Uso básico:
```
php artisan make:port NomeDaPort
```
Resultado:
- Cria `app/Adapters/Ports/NomeDaPort.php` (Interface)

### `make:adapter`
Gera um Adapter que implementa uma Port existente.

Uso:
```
php artisan make:adapter NomeDoAdapter --port=NomeDaPort
```
Opções:
- `--port=` Nome da interface de Port (obrigatória).

Resultado:
- Cria `app/Adapters/Implementations/NomeDoAdapter.php`
- Implementa a interface informada.

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
Gera um Service de aplicação. Pode opcionalmente gerar e/ou associar uma Port.

Uso simples:
```
php artisan make:service NomeDoService
```
Com geração automática de Port correspondente:
```
php artisan make:service NomeDoService --port
```
Resultado quando usado com `--port`:
- Cria `app/Application/Services/NomeDoService.php`
- Cria `app/Adapters/Ports/NomeDoServicePort.php` (interface)
- Service implementa a Port gerada.

Resultado sem `--port`:
- Cria somente `app/Application/Services/NomeDoService.php`

Convenções sugeridas:
- Nome da porta derivado: `NomeDoServicePort`
- Services devem focar coordenação e orquestração de regras delegando persistência a Adapters.

---
## Boas Práticas
- Ports devem ser estáveis: mudanças nelas impactam múltiplos adapters.
- Adapters não devem conter regra de negócio — apenas integração (DB, API externa, fila, etc.).
- DTOs ajudam a isolar a borda: nunca exponha Models Eloquent diretamente em controllers.
- Services ou UseCases devem ser testáveis via mocks das Ports.

## Próximos Passos (Ideias Futuras)
- Comando `make:query` para cenários somente leitura.
- Comando `make:exception` para exceções de domínio.
- Geração opcional de testes stub.

---
Última atualização: 2025-10-07.
