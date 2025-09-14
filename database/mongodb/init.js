// Script de inicialização do MongoDB para Define Pilates

// Conectar ao banco de dados
db = db.getSiblingDB('define_pilates_mongo');

// Criar usuário para a aplicação
db.createUser({
  user: 'laravel',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'define_pilates_mongo'
    }
  ]
});

// Criar coleções básicas (exemplo)
db.createCollection('sessions');
db.createCollection('logs');
db.createCollection('cache');

// Inserir dados de exemplo nas coleções
db.sessions.insertOne({
  _id: "example_session",
  user_id: 1,
  ip_address: "127.0.0.1",
  user_agent: "Mozilla/5.0",
  payload: "session_data_example",
  last_activity: new Date()
});

db.logs.insertOne({
  level: "info",
  message: "MongoDB inicializado com sucesso",
  context: {},
  timestamp: new Date()
});

// Criar índices para performance
db.sessions.createIndex({ "last_activity": 1 });
db.logs.createIndex({ "timestamp": -1 });

print("MongoDB inicializado com sucesso para Define Pilates!");
