FROM openjdk:21

EXPOSE 8080

ADD ./build/libs/*.jar /app/app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-jar", "/app/app.jar"]
