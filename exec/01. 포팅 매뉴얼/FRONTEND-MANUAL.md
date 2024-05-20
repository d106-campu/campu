# CampU: Frontend 포팅 매뉴얼

## Build & Deploy

### Clone Repository

```
git clone ${REPOSITORY_URL}
cd ${GIT_PROJECT}
```

### React .env 생성

```
VITE_NODE_ENV=${ENV}
VITE_BASE_URL=${URL}
VITE_KAKAO_API_KEY=${API_KEY}
VITE_SSE_URL=${SSE_URL}
VITE_IMAGE_BASE_URL_PROD=${IMAGE_URL}
```

### React .env 복사

```
cp .env frontend/.env
```

### npm 빌드

```
npm i --force
npm run build
```

### HTTPS 설정

`/var/lib/letsencrypt` 디렉토리에 `privkey.pem`, `fullchain.pem`, `cert.pem` 파일 준비

```
cp privkey.pem /var/lib/letsencrypt/privkey.pem
cp fullchain.pem /var/lib/letsencrypt/fullchain.pem
cp cert.pem /var/lib/letsencrypt/cert.pem
```

### Docker Compose .env 생성

```
TAG=${COMMIT_ID}
REGISTRY=${REGISTRY_DOMAIN}
```

### Docker Compose .env 복사

```
cp .env exec/frontend-deploy/.env
```

### Docker Network 생성 (기존에 생성된 네트워크가 없다면)

```
docker network create d106-network
```

### Docker Compose 실행

```
docker compose up -d
```
