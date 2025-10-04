# Guia de Monitoramento e Recursos (Dev Environment)

Este documento reúne comandos e práticas para acompanhar uso de memória, swap, CPU e saúde dos serviços (Laravel, Next.js, MySQL, MongoDB) rodando em Docker dentro do WSL2.

---
## Sumário
1. Conceitos rápidos (RAM x Swap)
2. Comandos essenciais Linux/WSL
3. Interpretação de métricas (thresholds práticos)
4. Monitorando containers Docker
5. Ajustes recomendados (.wslconfig, MySQL, MongoDB, Node)
6. Estratégias de redução de consumo
7. Perfis de configuração sugeridos
8. Checagem de problemas comuns
9. Anotações futuras / melhorias

---
## 1. Conceitos rápidos
- **RAM**: memória física alocada para a VM do WSL2.
- **Swap**: espaço em disco (muito mais lento) usado para páginas de memória inativas quando a RAM enche.
- **Thrashing**: quando o sistema passa tempo significativo movendo páginas entre RAM e Swap (swap in/out contínuo), causando lentidão geral.
- **MemAvailable** (em `/proc/meminfo`): melhor indicador da folga real de memória.

### Sinais saudáveis
- Swap usado pequeno e praticamente estático.
- `si` / `so` (vmstat) = 0 na maior parte do tempo.
- MemAvailable > ~25–30% da RAM total.

### Sinais de pressão
- MemAvailable < 200MB de forma persistente.
- SwapUsed crescendo + `si/so` > 0 continuamente.
- Latência percebida em rebuilds (Next.js) / queries simples (MySQL) / cold starts.

---
## 2. Comandos essenciais (rodar dentro do WSL)

| Objetivo | Comando |
|----------|---------|
| Visão geral de memória | `free -h` |
| Detalhes de memória/swap | `cat /proc/meminfo | grep -E "Mem|Swap"` |
| Atividade de swap e CPU a cada 2s | `vmstat 2` |
| Uso por processo | `top` ou `htop` (instalar) |
| Somente processos Docker | `docker stats` |
| Logs de possível OOM | `dmesg | grep -i oom` |
| Swap ativo e arquivo(s) | `swapon --show` |
| IO / Espera | `iostat -x 2` (pacote sysstat) |
| Redes container | `docker ps --format 'table {{.Names}}\t{{.Status}}'` |
| Ver healthchecks | `docker inspect <container> | grep -i health -n` |

Instalações úteis:
```
sudo apt update
sudo apt install -y htop sysstat iotop
```

---
## 3. Thresholds práticos
| Métrica | OK | Atenção | Ação urgente |
|--------|----|---------|--------------|
| MemAvailable | > 30% | 10–30% | < 10% persistente |
| SwapUsed | < 10% | 10–30% estável | > 30% e crescendo |
| vmstat si/so | 0 | picos ocasionais | >0 constante |
| Rebuild Next.js | < 3s | 3–8s | > 8–10s constante |
| Latência query simples MySQL | < 50ms | 50–150ms | > 150ms sem carga |

---
## 4. Monitorando containers Docker

Uso em tempo real:
```
docker stats
```
Filtrar um serviço:
```
docker stats define-pilates-backend
```
Logs recentes:
```
docker logs --tail=200 define-pilates-mongodb
```
Health status:
```
docker inspect --format='{{json .State.Health}}' define-pilates-mongodb | jq
```

Parar serviços não necessários momentaneamente:
```
docker compose stop mongodb
```
Subir só backend + banco MySQL:
```
docker compose up -d laravel-backend mysql
```
Subir `mongo-express` (profile):
```
docker compose --profile tools up -d mongo-express
```

---
## 5. Ajustes recomendados

### 5.1 `.wslconfig` (colocar em `%UserProfile%/.wslconfig` no Windows e depois `wsl --shutdown`)
Perfil equilibrado:
```
[wsl2]
memory=4GB
processors=4
swap=2GB
localhostForwarding=true
```
Perfil compacto:
```
[wsl2]
memory=3GB
processors=2
swap=2GB
```

### 5.2 MySQL (arquivo `my.cnf` exemplo)
```
[mysqld]
innodb_buffer_pool_size=64M
innodb_log_file_size=32M
performance_schema=OFF
table_open_cache=128
```
Montar no compose (exemplo futuro):
```
volumes:
  - ./database/mysql/my.cnf:/etc/mysql/conf.d/my.cnf:ro
```

### 5.3 MongoDB limitar cache (`mongod.conf`)
```
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 0.25
```
Compose (exemplo futuro):
```
volumes:
  - ./database/mongodb/mongod.conf:/etc/mongo/mongod.conf:ro
command: ["mongod", "--config", "/etc/mongo/mongod.conf"]
```

### 5.4 Next.js
- Limitar heap: `NODE_OPTIONS=--max_old_space_size=512`
- Evitar múltiplos frontends simultâneos.
- Remover libs não usadas em dev.

### 5.5 Laravel
- Desligar Xdebug quando não depurando.
- (Opcional) Cache de config/rotas quando for ficar mais estático:
```
php artisan config:cache
php artisan route:cache
```
(Em dev, só use se entender que mudanças podem exigir `php artisan optimize:clear`.)

---
## 6. Estratégias de redução de consumo
1. Subir apenas serviços necessários (ex: desligar Mongo quando não usado).
2. Aumentar intervalo de healthchecks (Mongo já em 30s; pode elevar MySQL para 10s se desejar).
3. Evitar watchers duplos (não rodar `npm run dev` fora e dentro do container ao mesmo tempo).
4. Usar profiles para ferramentas (mongo-express, futuros: adminer, redis-commander, etc.).
5. Limitar caches de bancos em ambiente dev pequeno.
6. Revisar dependências grandes no frontend (chart libs, rich text) — carregar sob demanda.

---
## 7. Perfis de configuração sugeridos

| Perfil | Uso | RAM | CPUs | Observações |
|--------|-----|-----|------|-------------|
| Compacto | Notebook limitado | 3GB | 2 | Limite caches MySQL/Mongo |
| Equilibrado | Dev diário | 4GB | 4 | Melhor hot reload |
| Conforto | Máquina folgada | 6–8GB | 4–6 | Cache amplo, múltiplos containers extras |

---
## 8. Checklist de diagnóstico rápido
| Sintoma | Verificar | Ação |
|---------|-----------|------|
| Rebuild lento | `docker stats`, `free -h` | Aumentar RAM ou reduzir serviços |
| Query MySQL lenta | Logs MySQL + buffer pool | Reduzir carga ou subir memória |
| Swap alto | `vmstat 2` si/so | Aumentar memória ou desligar serviços |
| Latência HTTP backend | CPU saturada? | Adicionar vCPU ou investigar loops |
| Logs Mongo ruidosos | Healthcheck / ferramentas | Aumentar intervalo ou remover express |

---
## 9. Próximas melhorias possíveis
- Adicionar `my.cnf` real no repositório.
- Adicionar `mongod.conf` e command override no compose.
- Automatizar script de coleta de métricas (`scripts/diagnostico.sh`).
- Integrar ferramenta leve de APM (ex: Laravel Telescope — usar com moderação em dev).

---
## Anotações finais
Este guia foca operação suave em máquina de desenvolvimento com recursos moderados. Ajuste conforme seu hardware evoluir ou stack expandir.

Se adicionar novos serviços (Redis, Elastic, etc.), revisite: memória disponível, perfis WSL e limites de healthcheck.

> Atualize este documento conforme aplicar os exemplos (ex: adicionar realmente os arquivos `my.cnf`, `mongod.conf`).
