# CampU: Backend 포팅 매뉴얼

## Build & Deploy

### Clone Repository

```
git clone ${REPOSITORY_URL}
cd ${GIT_PROJECT}
```

### Spring Boot application-prod.yml 생성

```
spring:
  datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: ${MARIADB_URL}
    username: ${MARIADB_USERNAME}
    password: ${MARIADB_PASSWORD}

  jpa:
    hibernate:
      ddl-auto: none
    defer-datasource-initialization: true
    properties:
      format_sql: true
    show-sql: false
    open-in-view: true

  redis:
    host: ${REDIS_HOST}
    port: ${REDIS_PORT}
    password: ${REDIS_PASSWORD}

logging:
  level:
    root: INFO
    web:
    com.d106.campu: INFO
    org.springframework.security: INFO
    org.springframework.web.cors: INFO
    org.hibernate.sql: INFO
    org.hibernate.type.descriptor.sql: INFO

cors:
  origin:
    list: >
      ${ALLOW_ORIGIN}

jwt:
  access-token-key: ${ACCESS_TOKEN_KEY}
  refresh-token-key: ${REFRESH_TOKEN_KEY}
  access-token-validity-in-seconds: ${ACCESS_TOKEN_EXPIRATION}
  refresh-token-validity-in-seconds: ${REFRESH_TOKEN_EXPIRATION}

coolsms:
  api:
    domain: https://api.coolsms.co.kr
    key: ${KEY}
    secret: ${SECRET}
    from: ${TEL}

app:
  base-url: https://k10d106.p.ssafy.io/api

imp:
  code: ${CODE} # 고객사 식별코드
  api:
    key: ${KEY} # REST API Key
    secret: ${SECRET} # REST API Secret
```

### Spring Boot application-prod.yml 복사

```
cp application.yml backend/d102-api/src/main/resources/application-prod.yml
cp application.yml backend/d102-file/src/main/resources/application-prod.yml
```

### Gradle 빌드

```
cd backend && chmod +x gradlew && ./gradlew clean build
```

### Docker Compose .env 생성

```
TAG=${COMMIT_ID}
REGISTRY=${REGISTRY_DOMAIN}

MARIADB_EXTERNAL_PORT=${MARIADB_EXTERNAL_PORT}
MARIADB_PORT=${MARIADB_INTERNAL_PORT}
MARIADB_ROOT_PASSWORD=${MARIADB_PASSWORD}
MARIADB_USER=${MARIADB_USER}
MARIADB_PASSWORD=${MARIADB_PASSWORD}
MARIADB_DATABASE=${MARIADB_DATABASE}

REDIS_EXTERNAL_PORT=${REDIS_EXTERNAL_PORT}
REDIS_PORT=${REDIS_INTERNAL_PORT}
REDIS_PASSWORD=${REDIS_PASSWORD}
```

### Docker Compose .env 복사

```
cp .env exec/backend-deploy/.env
```

### Docker Network 생성 (기존에 생성된 네트워크가 없다면)

```
docker network create d106-network
```

### Docker Compose 실행

```
docker compose up -d
```
