# 🏗️ Arquitetura Hexagonal - Sistema Pilates API

## 📋 Visão Geral

Este sistema implementa **Arquitetura Hexagonal** (Ports and Adapters) no Laravel para um sistema de gerenciamento de aulas de Pilates. A arquitetura separa completamente a lógica de negócio dos detalhes de implementação (banco de dados, HTTP, etc.).

## 🎯 Princípios da Arquitetura Hexagonal

### 1. **Separação de Responsabilidades**
- **Domínio**: Regras de negócio puras
- **Aplicação**: Casos de uso e orquestração
- **Adapters**: Interface com mundo externo (HTTP, Database, etc.)

### 2. **Inversão de Dependência**
- O núcleo não depende de detalhes externos
- Interfaces (Ports) definem contratos
- Adapters implementam as interfaces

### 3. **Testabilidade**
- Lógica de negócio isolada e testável
- Mocks fáceis através das interfaces
- Testes independentes de infraestrutura

## 🏛️ Estrutura do Projeto

```
Backend/app/
├── Domain/                    # 🎯 NÚCLEO - Entidades de Negócio
│   ├── PilatesClass/
│   └── User/
├── Application/               # 🎮 CASOS DE USO
│   ├── Ports/                # 🔌 Interfaces (Contratos)
│   │   ├── ApplicationPort.php
│   │   ├── SQLPort.php
│   │   └── NoSQLPort.php
│   └── Services/             # 🎭 Implementação dos Casos de Uso
│       └── PilatesApplicationService.php
├── Adapters/                 # 🔧 ADAPTADORES (Mundo Externo)
│   ├── Database/            # 💾 Persistência
│   │   ├── MySQLAdapter.php
│   │   └── MongoDBAdapter.php
│   └── Http/                # 🌐 Interface HTTP
│       └── Controllers/
│           └── PilatesController.php
├── Models/                   # 📊 Models Eloquent (ORM)
├── Http/Middleware/         # 🛡️ Middlewares
└── Providers/               # ⚙️ Service Container
    └── HexagonalArchitectureProvider.php
```

## 🔌 Ports (Interfaces)

### ApplicationPort
Define os casos de uso do sistema:
```php
interface ApplicationPort
{
    public function createUser(array $userData): array;
    public function getUserById(int $id): ?array;
    public function createPilatesClass(array $classData): array;
    public function bookUserToClass(int $userId, int $classId): bool;
    // ... outros métodos
}
```

### SQLPort
Define operações relacionais:
```php
interface SQLPort
{
    public function create(string $table, array $data): array;
    public function findById(string $table, int $id): ?array;
    public function findAvailableClasses(\DateTime $date): array;
    // ... outros métodos
}
```

### NoSQLPort
Define operações não relacionais:
```php
interface NoSQLPort
{
    public function logUserActivity(int $userId, string $action, array $data = []): bool;
    public function cacheData(string $key, mixed $data, int $ttl = 3600): bool;
    public function storeUserPreferences(int $userId, array $preferences): bool;
    // ... outros métodos
}
```

## 🔧 Adapters (Implementações)

### MySQLAdapter
Implementa `SQLPort` usando Laravel Eloquent:
```php
class MySQLAdapter implements SQLPort
{
    public function create(string $table, array $data): array
    {
        $model = $this->getModel($table);
        $record = $model::create($data);
        return $record->toArray();
    }
    // ... implementações
}
```

### MongoDBAdapter
Implementa `NoSQLPort` usando MongoDB:
```php
class MongoDBAdapter implements NoSQLPort
{
    public function logUserActivity(int $userId, string $action, array $data = []): bool
    {
        return $this->insertDocument('user_activities', [
            'user_id' => $userId,
            'action' => $action,
            'data' => $data,
            'timestamp' => new UTCDateTime()
        ]);
    }
    // ... implementações
}
```

### PilatesController
Adapter HTTP que usa `ApplicationPort`:
```php
class PilatesController extends BaseController
{
    public function __construct(private ApplicationPort $applicationService) {}

    public function createUser(Request $request): JsonResponse
    {
        $user = $this->applicationService->createUser($request->validated());
        return response()->json(['success' => true, 'data' => $user], 201);
    }
    // ... outros endpoints
}
```

## 🎭 Application Service

### PilatesApplicationService
Orquestra os casos de uso usando ambos os adapters:
```php
class PilatesApplicationService implements ApplicationPort
{
    public function __construct(
        private SQLPort $sqlAdapter,
        private NoSQLPort $noSQLAdapter
    ) {}

    public function createUser(array $userData): array
    {
        // 1. Validação de negócio
        // 2. Criar no SQL
        $user = $this->sqlAdapter->createUser($userData);

        // 3. Log no NoSQL
        $this->noSQLAdapter->logUserActivity($user['id'], 'user_created');

        // 4. Preferências padrão no NoSQL
        $this->noSQLAdapter->storeUserPreferences($user['id'], $defaults);

        return $user;
    }
}
```

## ⚙️ Injeção de Dependência

### HexagonalArchitectureProvider
Configura todas as dependências:
```php
class HexagonalArchitectureProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(SQLPort::class, MySQLAdapter::class);
        $this->app->bind(NoSQLPort::class, MongoDBAdapter::class);

        $this->app->bind(ApplicationPort::class, function ($app) {
            return new PilatesApplicationService(
                $app->make(SQLPort::class),
                $app->make(NoSQLPort::class)
            );
        });
    }
}
```

## 🌐 API Endpoints

### Base URL: `/api/v1`

#### 👥 Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/{id}` - Buscar por ID
- `PUT /users/{id}` - Atualizar usuário
- `DELETE /users/{id}` - Deletar usuário
- `GET /users/{userId}/classes` - Aulas do usuário

#### 🧘 Aulas de Pilates
- `GET /classes` - Listar aulas
- `POST /classes` - Criar aula
- `GET /classes/available` - Aulas disponíveis
- `GET /classes/{id}` - Buscar por ID
- `PUT /classes/{id}` - Atualizar aula
- `DELETE /classes/{id}` - Deletar aula

#### 📋 Reservas
- `POST /bookings` - Fazer reserva

#### 🩺 Health Check
- `GET /health` - Status da API

## 🗄️ Modelos de Dados

### SQL (MySQL)
- **users**: ID, name, email, password, timestamps
- **pilates_classes**: ID, name, description, instructor_id, max_participants, start_time, end_time, price, status, timestamps
- **bookings**: ID, user_id, class_id, status, paid_amount, booking_date, notes, timestamps

### NoSQL (MongoDB)
- **user_activities**: user_id, action, data, timestamp
- **user_preferences**: user_id, preferences, updated_at
- **user_sessions**: user_id, session_data, last_activity
- **cache_storage**: key, data, expires_at
- **class_bookings**: user_id, class_id, booking_id, timestamp

## 🧪 Vantagens da Arquitetura

### ✅ Benefícios
1. **Testabilidade**: Lógica isolada e mockável
2. **Flexibilidade**: Troca fácil de adapters
3. **Manutenibilidade**: Responsabilidades bem definidas
4. **Escalabilidade**: Adição simples de novos adapters
5. **Clean Code**: Código organizado e legível

### 🎯 Casos de Uso Cobertos
- ✅ Gerenciamento de usuários completo
- ✅ CRUD de aulas de Pilates
- ✅ Sistema de reservas com validações
- ✅ Cache inteligente
- ✅ Log de atividades
- ✅ Preferências de usuário
- ✅ Analytics básicas

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   composer install
   ```

2. **Configurar banco:**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

3. **Iniciar servidor:**
   ```bash
   php artisan serve
   ```

4. **Testar API:**
   ```bash
   curl http://localhost:8000/api/v1/health
   ```

## 📝 Exemplo de Resposta da API

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "preferences": {
      "notification_enabled": true,
      "language": "pt-BR",
      "theme": "light"
    }
  },
  "architecture": "Hexagonal Architecture",
  "timestamp": "2025-09-14T20:30:00Z"
}
```

---

**🏗️ Arquitetura Hexagonal implementada com sucesso!**
*Sistema robusto, testável e flexível para gerenciamento de aulas de Pilates.*
