FROM openjdk:17-alpine AS builder

workdir /app

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw clean package

FROM openjdk:17-alpine

COPY --from=builder /app/target/*.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=prod"]
