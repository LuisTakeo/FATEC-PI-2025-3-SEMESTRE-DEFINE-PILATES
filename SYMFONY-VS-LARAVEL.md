# 🆚 Comparativo: Laravel vs Symfony - Define Pilates

## 📊 **Estrutura de Pastas:**

### **Laravel** (`Backend/`):
```
Backend/
├── app/
│   ├── Http/Controllers/     # Controladores
│   ├── Models/              # Modelos Eloquent
│   ├── Providers/           # Service Providers
│   └── ...
├── config/                  # Configurações
├── database/
│   ├── migrations/          # Migrations
│   └── seeders/            # Seeders
├── resources/
│   └── views/              # Templates
├── routes/                 # Rotas
├── storage/                # Arquivos/logs
├── vendor/                 # Dependências
└── public/                 # Arquivos públicos
```

### **Symfony** (`Backend-Symfony/`):
```
Backend-Symfony/
├── src/
│   ├── Entity/             # Entidades Doctrine (MySQL)
│   ├── Document/           # Documentos MongoDB
│   ├── Controller/         # Controladores
│   └── Repository/         # Repositórios
├── config/                 # Configurações
├── migrations/             # Migrations
├── templates/              # Templates Twig
├── public/                 # Arquivos públicos
├── var/                    # Cache/logs
└── vendor/                 # Dependências
```

## 📈 **Comparativo de Complexidade:**

| Aspecto | Laravel | Symfony | Vencedor |
|---------|---------|---------|----------|
| **Pastas principais** | ~15 | ~8 | 🟢 Symfony |
| **Configuração inicial** | Média | Simples | 🟢 Symfony |
| **API REST** | Manual (Routes + Controllers) | Automática (API Platform) | 🟢 Symfony |
| **MongoDB** | Package externo | ODM integrado | 🟢 Symfony |
| **Documentação API** | Swagger manual | Auto-gerada | 🟢 Symfony |
| **Flexibilidade** | Alta | Muito Alta | 🟢 Symfony |
| **Curva de aprendizado** | Baixa | Média | 🟢 Laravel |
| **Comunidade** | Muito Grande | Grande | 🟢 Laravel |

## 🚀 **APIs REST - Comparação:**

### **Laravel** (Exemplo User API):
```php
// Route
Route::apiResource('users', UserController::class);

// Controller (precisa criar manualmente)
class UserController extends Controller {
    public function index() { /* código manual */ }
    public function store(Request $request) { /* código manual */ }
    // ... mais métodos
}

// Model
class User extends Model {
    protected $fillable = ['name', 'email'];
}
```

### **Symfony** (Exemplo User API):
```php
// Entity com API Platform - ZERO configuração extra!
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(),
        new Put(),
        new Delete()
    ]
)]
class User {
    // Propriedades e métodos
}
```

## 🎯 **Vantagens de cada um:**

### **🟢 Laravel Vantagens:**
- ✅ **Eloquent ORM** mais intuitivo
- ✅ **Artisan** com muitos comandos úteis
- ✅ **Blade** templates simples
- ✅ **Ecosystem** muito rico (Breeze, Jetstream, etc)
- ✅ **Documentação** excelente em português
- ✅ **Comunidade** muito ativa no Brasil

### **🟢 Symfony Vantagens:**
- ✅ **Estrutura mais limpa** (menos pastas)
- ✅ **API Platform** = API REST automática
- ✅ **Performance** superior
- ✅ **Flexibilidade** extrema (micro-framework possível)
- ✅ **Doctrine** mais poderoso para queries complexas
- ✅ **MongoDB ODM** nativo
- ✅ **Auto-documentação** da API (OpenAPI/Swagger)

## 📊 **Teste Prático - Contagem de Arquivos:**

```bash
# Laravel
find Backend/ -name "*.php" | wc -l     # ~50+ arquivos base

# Symfony
find Backend-Symfony/ -name "*.php" | wc -l  # ~20+ arquivos base
```

## 🌐 **URLs de Acesso:**

### **Desenvolvimento:**
- **Laravel**: http://localhost:8000
- **Symfony**: http://localhost:8001
- **Symfony API Docs**: http://localhost:8001/api (auto-gerada!)

### **Comandos Docker:**
```bash
# Subir ambos para comparar
docker-compose -f docker-compose-compare.yml up -d

# Ver logs de cada um
docker-compose -f docker-compose-compare.yml logs laravel-backend
docker-compose -f docker-compose-compare.yml logs symfony-backend
```

## 🏆 **Recomendação:**

### **Para este projeto (Sistema de Pilates):**

**🥇 Symfony** seria melhor por:
1. **API REST automática** com API Platform
2. **MongoDB nativo** com ODM
3. **Estrutura mais limpa** (menos confusão)
4. **Performance superior**
5. **Auto-documentação** da API

### **Mas Laravel** é melhor se:
1. **Equipe iniciante** em PHP
2. **Precisa de muitos packages** prontos
3. **Foco em desenvolvimento rápido** com Eloquent
4. **Comunidade brasileira** importante

## 💡 **Conclusão:**
- **Symfony**: Mais profissional, estrutura limpa, APIs automáticas
- **Laravel**: Mais fácil, ecosystem rico, comunidade forte

**Para APIs modernas = Symfony 🚀**
**Para desenvolvimento rápido = Laravel ⚡**
