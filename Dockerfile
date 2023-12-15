# Stage 1: Build frontend
FROM docker.io/library/node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot
FROM docker.io/library/maven:3.8.3-openjdk-17 AS backend-build
WORKDIR /app
COPY src/ ./src/
COPY pom.xml ./pom.xml
COPY .mvn/ ./mvn
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static/
RUN mvn clean package -DskipTests

# Stage 3: Final image
FROM docker.io/library/eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/target/*.jar /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]
