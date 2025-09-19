Minimal Spring Boot skeleton

This folder contains a minimal Spring Boot app skeleton (Java 17, Spring Boot 3.2) and a Dockerfile.

To run locally with Maven:

1) Install Java 17 and Maven
2) cd Backend-Spring
3) mvn -B package
4) java -jar target/backend-spring-0.0.1-SNAPSHOT.jar

To run via Docker:

cd Backend-Spring
# build
docker build -t backend-spring:local .
# run
docker run --rm -p 8080:8080 backend-spring:local

The app exposes /api/hello returning a plain text hello message.
