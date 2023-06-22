# Stage 1: Build the application
FROM maven:3.8.3-openjdk-17 as build

WORKDIR /app

COPY src/ ./src/
COPY pom.xml ./pom.xml
COPY .mvn/ ./mvn

RUN mvn clean package -DskipTests
RUN ls /app/target/*.jar

# Stage 2: Create the final image
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar
RUN ls /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]
