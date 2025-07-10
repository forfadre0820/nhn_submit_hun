# Replit에서 GitHub으로 프로젝트 업로드 가이드

## 방법 1: Replit Version Control 사용 (권장)

1. **Replit 왼쪽 사이드바의 Git 아이콘 클릭**
2. **"Connect to GitHub" 클릭**
3. **GitHub 계정 로그인 및 권한 허용**
4. **새 레포지토리 생성:**
   - Repository name: `nhn_submit`
   - Description: `LEESEUNGHUN 콘텐츠 제작자 포트폴리오`
   - Public으로 설정
5. **"Create and push" 클릭**

## 방법 2: 파일 다운로드 후 수동 업로드

### 1단계: 필요한 파일들 확인
```
프로젝트 핵심 파일들:
- client/ (전체 폴더)
- attached_assets/ (이미지, 비디오)
- package.json
- vite.config.ts
- tailwind.config.ts
- build-static.js
- README.md
```

### 2단계: GitHub에 레포지토리 생성
1. GitHub.com → New repository
2. 이름: `nhn_submit`
3. Public 선택
4. README 체크 해제

### 3단계: 파일 업로드
1. Replit에서 Files 탭으로 이동
2. 각 폴더/파일을 우클릭 → Download
3. GitHub 레포지토리에서 "Add file" → "Upload files"
4. 다운로드한 파일들을 드래그&드롭

## 방법 3: ZIP 파일로 전체 다운로드

1. Replit 상단 메뉴에서 "..." → "Download as zip"
2. ZIP 파일 압축 해제
3. GitHub에서 폴더별로 업로드

## GitHub Pages 설정

업로드 완료 후:
1. Settings → Pages
2. Source: GitHub Actions 선택
3. .github/workflows/deploy.yml 파일 생성 (자동 배포용)

## 주의사항

- 비디오 파일이 100MB 이상이면 Git LFS 사용 필요
- attached_assets 폴더의 큰 파일들은 압축해서 업로드
- 불필요한 파일 제외 (.git, node_modules 등)