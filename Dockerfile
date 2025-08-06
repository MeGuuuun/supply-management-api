# Stage 1: Build Stage (빌드 환경)
# 이 스테이지에서는 애플리케이션을 빌드하고 컴파일합니다.
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json (또는 yarn.lock) 복사
# 의존성 설치를 위해 먼저 복사합니다.
COPY package*.json ./

# 의존성 설치
# 개발 의존성도 이 단계에서 설치합니다.
RUN npm install

# 모든 소스 코드 복사
COPY . .

# NestJS 애플리케이션 빌드
# 이 명령어가 TypeScript(.ts) 파일을 JavaScript(.js)로 컴파일하여 dist 폴더에 저장합니다.
RUN npm run build

# Stage 2: Production Stage (실행 환경)
# 이 스테이지에서는 빌드된 결과물만 가져와서 최종 이미지를 만듭니다.
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json (또는 yarn.lock) 복사
# 프로덕션 의존성만 설치하기 위해 다시 복사합니다.
COPY --from=builder /app/package*.json ./

# 프로덕션 의존성만 설치 (개발 의존성은 제외)
RUN npm install --omit=dev

# 빌드 스테이지에서 생성된 'dist' 폴더만 최종 이미지로 복사
# 이렇게 하면 .ts 파일은 최종 이미지에 포함되지 않습니다.
COPY --from=builder /app/dist ./dist

# 애플리케이션이 사용할 포트 노출
EXPOSE 3000

# 애플리케이션 실행 명령어
# 컴파일된 main.js 파일을 실행합니다.
CMD ["node", "dist/main.js"]