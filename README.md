# FATEC-PI-2025-3-SEMESTRE-DEFINE-PILATES
Projeto integrador para atender a um estúdio de pilates, referente a turma de 3º semestre de Desenvolvimento de Software Multiplataforma da  FATEC Itaquera.


Como rodar o projeto

Este README descreve como rodar o projeto completo (Backend Laravel, Frontend Next.js, bancos) usando Docker Compose e também como rodá-lo localmente sem Docker.

Pré-requisitos
- Docker e Docker Compose instalados (para usar Docker).
- Node.js e npm para rodar o frontend localmente.
- PHP, Composer e extensões para rodar o backend localmente.

Rodar com Docker Compose
1. Na raiz do repositório, suba os serviços:

   docker-compose up -d --build

2. Serviços e portas:
   - Backend (Laravel): http://localhost:8000
   - Frontend (Next.js): http://localhost:3000
   - phpMyAdmin: http://localhost:8080 (user: root, password: password)
   - mongo-express: http://localhost:8081 (user: admin, password: password)

3. Ver logs:

   docker-compose logs -f mongo-express
   docker-compose logs -f mongodb

Parar/remover:

   docker-compose down
   docker-compose down -v   # remove volumes (perde dados)

Rodar sem Docker
Backend (Laravel):
1. cd Backend
2. composer install
3. cp .env.example .env
4. php artisan key:generate
5. editar .env conforme seu banco (DB_* )
6. php artisan migrate --seed
7. php artisan serve --host=0.0.0.0 --port=8000

Atualizar doc do Swagger:
1. php artisan config:clear
2. php artisan l5-swagger:generate

Frontend (Next.js):
1. cd frontend
2. npm install
3. npm run dev  # modo desenvolvimento
4. npm run build && npm run start  # produção


