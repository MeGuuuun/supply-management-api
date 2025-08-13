## 🎯 프로젝트 목표
- Restful API 설계 및 개발 능력 함양
- 데이터베이스 관계 설정 및 ORM 사용 경험
- 실무에서 자주 사용되는 기술 스택 적용
- 제한된 시간 내에 요구사항 분석하고 구현하는 능력 배양

<br>

## ⚙️ 기술 스택

### Backend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)

### Dev-ops

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### Tools

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

<br>

## 🪄 주요 기능

+ ### 필수 기능

  **카테고리 관리 API**
    - [x] 새 카테고리 등록
    - [x] 전체 카테고리 목록 조회
    - [x] 카테고리 갱신
    - [x] 카테고리 삭제

  **비품 관리 API**
    - [x] 새 비품 등록 (특정 카테고리에 속하도록)
    - [x] 전체 비품 목록 조회 (Redis 사용하여 API 응답 캐싱 TTL 설정 필수)
    - [x] 쿼리 파라미터를 통해 특정 카테고리에 속한 비품만 필터링 조회
    - [x] 특정 비품 상세 정보 조회
    - [x] 특정 비품 정보 수정

<br>

 + ### 심화 기능

   **사용자 관리 API**
    - [x] 간단한 사용자(직원) 모델 추가 (직원ID, 이름)

   **대여/반납 이력 관리 API**
    - [x] 특정 비품 대여 API (어떤 직원이 빌려갔는지 기록)
    - [x] 특정 비품 반납 API
    - [x] 특정 비품의 대여/반납 이력 조회

   **유효성 검사 Validation**
    - [x] 비품 등록/수정 시 요청 데이터의 유효성 검사

   **페이징 Pagination**
    - [x] 비품 검색 API 시 페이징 처리하여 응답

<br>

## 📚 API 명세서

### [POSTMAN DOCS](https://documenter.getpostman.com/view/14476064/2sB3BGFULw)

<br>

## 🧩ERD
<img width="1826" height="1110" alt="Image" src="https://github.com/user-attachments/assets/7263ab69-164b-49c6-a37a-e43d3d93c9b6" />

<br>

## ✏️ 프로젝트 실행 방법

### 1. 프로젝트 클론

   ```bash
  git clone https://github.com/MeGuuuun/supply-management-api.git
   ```
### 2. docker compose 명령어 실행

   ```bash
    docker-compose up --build -d
   ```
<br>
