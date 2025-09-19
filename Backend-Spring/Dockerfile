FROM eclipse-temurin:17-jdk-focal
WORKDIR /app
COPY . /app
RUN ./mvnw -q -DskipTests package || (apt-get update && apt-get install -y maven && mvn -DskipTests package)
EXPOSE 8080
CMD ["java","-jar","target/backend-spring-0.0.1-SNAPSHOT.jar"]
