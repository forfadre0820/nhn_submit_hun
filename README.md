# LEESEUNGHUN – Content Creator Portfolio

> 콘텐츠 제작자 이승훈의 포트폴리오 웹사이트

## 🎯 프로젝트 소개

메시지를 넘어 시청자의 경험까지 설계하는 콘텐츠 제작자 이승훈의 포트폴리오 사이트입니다. 
모던한 React 기반의 웹 애플리케이션으로, 인터랙티브한 쇼릴 경험과 상세한 프로젝트 정보를 제공합니다.

## ✨ 주요 특징

- **인터랙티브 쇼릴**: GSAP를 활용한 스크롤 기반 비디오 확대 애니메이션
- **프로젝트 모달**: 상세한 프로젝트 정보를 모달 형태로 제공
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽한 반응형 구현
- **한국어 최적화**: 한글 타이포그래피와 행간/자간 최적화

## 🛠 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **Framer Motion** (애니메이션)
- **GSAP** (스크롤 애니메이션)

### UI Components
- **shadcn/ui** (UI 컴포넌트)
- **Radix UI** (Headless 컴포넌트)
- **Lucide React** (아이콘)

### Backend
- **Express.js** (API 서버)
- **Drizzle ORM** (데이터베이스)
- **PostgreSQL** (Neon 서버리스)

## 📁 프로젝트 구조

```
nhn_submit/
├── client/                 # 프론트엔드 소스
│   ├── src/
│   │   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   └── lib/           # 유틸리티 함수
│   └── index.html
├── attached_assets/        # 정적 자산 (이미지, 비디오)
├── server/                # 백엔드 소스
├── shared/                # 공유 타입 정의
└── build-static.js        # 정적 사이트 빌드 스크립트
```

## 🚀 로컬 개발 환경 설정

### 1. 프로젝트 클론
```bash
git clone https://github.com/yourusername/nhn_submit.git
cd nhn_submit
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 정적 사이트 빌드
```bash
node build-static.js
```

## 🌐 배포

### GitHub Pages 자동 배포
- `main` 브랜치에 푸시하면 GitHub Actions를 통해 자동 배포
- 배포 URL: `https://yourusername.github.io/nhn_submit`

### 배포 과정
1. GitHub Actions가 코드 빌드
2. 정적 파일을 `gh-pages` 브랜치에 배포
3. GitHub Pages에서 사이트 호스팅

## 📱 주요 페이지

### 메인 포트폴리오
- **Hero 섹션**: 스크롤 인터랙션이 있는 쇼릴 비디오
- **About**: 교육 배경과 경력 정보
- **Main Project**: 4개 주요 프로젝트 (모달 형태로 상세 정보)
- **Visual Gallery**: 8개 갤러리 이미지
- **Contact**: 협업 제안 및 연락처

### 프로젝트 모달
각 프로젝트별 상세 정보:
- 프로젝트 기간 및 배경
- 주요 성과 및 역할
- 활용 기술 스택
- 프로젝트 이미지 갤러리

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#ff6b6b` (레드 액센트)
- **Text**: `#282623` (다크 그레이)
- **Secondary**: `#58534e` (미디움 그레이)
- **Background**: `#ffffff` (화이트)

### 타이포그래피
- **Hero**: 62px (모바일: 48px)
- **Section Title**: text-4xl lg:text-5xl
- **Heading**: text-xl lg:text-2xl
- **Body**: text-base
- **Small**: text-sm

## 📞 연락처

- **Email**: buen136003@gmail.com
- **Portfolio**: [GitHub Pages URL]

## 📄 라이선스

MIT License

---

**LEESEUNGHUN 2025** - 콘텐츠 제작자 포트폴리오