# Wybierz obraz podstawowy z JDK
FROM openjdk:20-jdk-slim

# Ustaw zmienną środowiskową
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""

# Utwórz katalog dla aplikacji
VOLUME /tmp

# Skopiuj plik jar do kontenera
COPY target/pogody-0.0.1-SNAPSHOT.jar /app.jar

# Ustaw komendę uruchomienia aplikacji
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]
