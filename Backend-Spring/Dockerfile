# Multi-stage Dockerfile para Spring Boot

# Stage 1: Build
FROM eclipse-temurin:17-jdk-focal AS builder
WORKDIR /app

# Instalar Maven caso não exista o wrapper
RUN apt-get update && apt-get install -y maven curl && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de configuração Maven primeiro (cache layer)
COPY pom.xml ./
COPY mvnw* ./
COPY .mvn .mvn

# Dar permissão de execução ao Maven wrapper (se existir)
RUN chmod +x ./mvnw || true

# Baixar dependências (será cached se pom.xml não mudar)
RUN ./mvnw dependency:go-offline -B 2>/dev/null || mvn dependency:go-offline -B

# Copiar código fonte
COPY src ./src

# Build da aplicação
RUN ./mvnw clean package -DskipTests -B 2>/dev/null || mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# Criar usuário não-root
RUN groupadd -r spring && useradd -r -g spring spring

# Copiar apenas o JAR da aplicação do stage anterior
COPY --from=builder /app/target/*.jar app.jar

# Mudar proprietário do arquivo
RUN chown spring:spring app.jar

# Usar usuário não-root
USER spring

# Configurações JVM otimizadas
ENV JAVA_OPTS="-Xmx512m -Xms256m -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dspring.profiles.active=nodb -jar app.jar"]
