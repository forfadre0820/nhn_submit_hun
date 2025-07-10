# nhn_submit 레포지토리 생성 및 GitHub Pages 배포 가이드

## 1단계: GitHub에서 새 레포지토리 생성

### GitHub.com에서 레포지토리 생성
1. **GitHub.com 로그인**
2. **우측 상단 "+" 버튼 → "New repository"**
3. **레포지토리 설정:**
   - Repository name: `nhn_submit`
   - Description: `LEESEUNGHUN Content Creator Portfolio - 콘텐츠 제작자 포트폴리오`
   - **Public 선택** (GitHub Pages 무료 사용)
   - **"Create repository" 클릭**

## 2단계: 프로젝트 파일 업로드

### 방법 1: GitHub 웹에서 직접 업로드 (권장)
1. **새로 만든 nhn_submit 레포지토리 페이지에서**
2. **"uploading an existing file" 클릭**
3. **현재 Replit 프로젝트의 핵심 파일들을 선택적으로 업로드:**

#### 필수 업로드 파일 목록:
```
📁 client/
  📁 src/
    📁 components/
    📁 pages/
      📄 combined-landing-new.tsx (메인 포트폴리오)
    📁 lib/
    📄 App.tsx
    📄 main.tsx
  📄 index.html
📁 attached_assets/
  📄 ShowReels_2025_public.mp4 (쇼릴 영상)
  📄 *.jpg, *.png (포트폴리오 이미지들)
📁 shared/
📁 server/ (선택사항)
📄 package.json
📄 vite.config.ts
📄 tailwind.config.ts
📄 postcss.config.js
📄 tsconfig.json
📄 build-static.js
📄 README.md
```

## 3단계: GitHub Pages 설정

### GitHub Pages 활성화
1. **nhn_submit 레포지토리 → Settings 탭**
2. **좌측 메뉴에서 "Pages" 클릭**
3. **Source 설정:**
   - Source: "GitHub Actions" 선택 (권장)
   - 또는 "Deploy from a branch" → "main" branch 선택

### GitHub Actions 배포 설정 (자동 빌드)
`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build static site
      run: node build-static.js
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 4단계: 정적 사이트 빌드 확인

### 로컬에서 빌드 테스트 (선택사항)
```bash
# 프로젝트 클론 후
cd nhn_submit
npm install
node build-static.js
```

## 5단계: 도메인 접속

### GitHub Pages URL
- **기본 URL**: `https://yourusername.github.io/nhn_submit`
- **배포 완료까지 약 5-10분 소요**

### 커스텀 도메인 설정 (선택사항)
1. **Settings → Pages → Custom domain**
2. **도메인 입력 후 Save**
3. **DNS 설정에서 CNAME 레코드 추가**

## 트러블슈팅

### 일반적인 문제 해결
1. **빌드 오류**: package.json 의존성 확인
2. **경로 오류**: attached_assets 폴더 구조 확인
3. **비디오 재생 안됨**: 파일 크기 제한 (100MB) 확인

### 파일 크기 최적화
- 비디오 파일을 50MB 이하로 압축
- 이미지는 WebP 포맷으로 변환 권장
- 불필요한 attached_assets 파일 제거

## 현재 프로젝트 상태 (2025.01.10)

### 주요 업데이트 완료
✓ Samsung 온·오프라인 콘텐츠 기획 프로젝트 업데이트
✓ 제목: "온·오프라인 실시간 행사/교육 기획·진행"
✓ 기간: 2023.01 ~ 2024.11 (23개월)
✓ 클라이언트: "삼성 그룹"
✓ 3개 주요 역할 섹션 재구성
✓ 활용 기술 4개 카테고리 간소화
✓ 한국어 텍스트 포맷팅 최적화

### 다음 단계
1. nhn_submit 레포지토리 생성 및 파일 업로드
2. GitHub Pages 배포 설정
3. 도메인 접속 확인
4. 포트폴리오 최종 검토