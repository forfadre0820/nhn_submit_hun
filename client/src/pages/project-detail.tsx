import React from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Target, User, Code, Zap, Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// 프로젝트 데이터 타입 정의
interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  duration: string;
  description: string;
  mainAchievements?: string[];
  mainObjectives?: string[];
  achievements?: string[] | Array<{title: string; description: string}>;
  results?: {
    nps: string;
    projects: string;
    cost: string;
    expertise: string;
  };
  technologies?: string[];
  tools?: string[];
  skills?: string[];
  quote?: string;
  liveStreaming?: {
    title: string;
    items: string[];
  };
  audioEdit?: {
    title: string;
    items: string[];
  };
  specialEffects?: {
    title: string;
    items: string[];
  };
}

// 프로젝트 데이터
const projectData: Record<string, ProjectData> = {
  'online-education': {
    id: 'online-education',
    title: '온,오프라인 실시간 행사/교육 기획·진행',
    subtitle: 'PROJECT 1',
    company: '삼성sds',
    duration: '2023.09 - 2024.11 (14개월)',
    description: '콘텐츠제작역량을기반으로실시간기술이슈데이터및정보전달으로NPS4.5+ 달성',
    mainAchievements: [
      '대규모행사 촬영사(영상, 음향 총괄) 커뮤니케이션',
      '출연자시전 커뮤니케이션(의전진행 관리)',
      '통합상황대팀 큐시트수정및작업대 전환',
      'VOD 자료제작및 다시보기 업무소관리'
    ],
    results: {
      nps: '4.5+',
      projects: '50+',
      cost: '30%',
      expertise: '패키지기술솔루션'
    },
    technologies: [
      'OpenCV', 'AI 그래픽', '영상 솔루션', '음향 시스템', '라이브 스트리밍', 
      '기술적 하울링', 'AI 플랫폼 솔루션', 'Python 자동화', '기술 하울링'
    ],
    skills: [
      '직접 진행 및 현장 대응',
      '영상 작업 및 지도 관리',
      '제작 현장 기반 통합 관리',
      'OpenCV 활용 기술 솔루션',
      'Python 자동화 구현'
    ],
    quote: '"끊이지 않는 라이브러리 오픈소스와 데이터 허브를 통해 패키지 현장에서도 솔루션을 제공할 수 있었으며, 생성형 AI Python을 활용하여 다양한 그래픽 스케일을 생성하여 프로젝트를 실행할 수 있었습니다."'
  },
  'live-streaming': {
    id: 'live-streaming',
    title: '라이브 현장 작업 진행 & 밴드 PM',
    subtitle: 'PROJECT 2',
    company: '제작진 현장 진행 & 밴드 관리',
    duration: '지속적 솔루션 기반 밴드 다이렉트 - 소통으로 모든 콘텐츠 요소 포함',
    description: '중국 큰 늘추천 시 작업 대이 크게 고 대한민국 현장 환경적 소통 산업 기업 스마트 투자 상품 환경 업무 등으로 진행',
    technologies: [
      '밴드 통합 다이렉트', '영상 편집', '음향 편집', '특수 효과 처리',
      '대 현장 투자 솔루션', '현장 어레이 솔루션', '시간 네트워크 관리',
      '특수 어레이 태그 기술', '현장 어레이 솔루션', '밴드 관리 솔루션'
    ],
    liveStreaming: {
      title: '영상 편집',
      items: [
        '현장 영상 기반 산업 구조 디지털 형 스트리밍 등 총 소속 어레이 가이드',
        '실시간 관리 어레이 솔루션에 따라 가이드'
      ]
    },
    audioEdit: {
      title: '음향 편집',
      items: [
        '현장 촬영 솔루션 어레이 크래픽 가이드 실시간 오디오 대응 방식 대 현장',
        '프로필 어레이 솔루션 오디오 관리 가이드'
      ]
    },
    specialEffects: {
      title: '특수 효과 처리',
      items: [
        '실시간 그래픽 처리 어레이 솔루션 실시간 특수 효과 대응 방식 대 현장',
        '특수 어레이 솔루션 그래픽 처리 어레이 가이드'
      ]
    },
    quote: '"현장 중심의 실시간 솔루션을 통해 안정적인 라이브 스트리밍 서비스를 제공할 수 있었습니다."'
  },
  'samsung-project': {
    id: 'samsung-project',
    title: '삼성 콘텐츠 교육 기획전문가',
    subtitle: 'PROJECT 2',
    company: '삼성 콘텐츠',
    duration: '2023.02 - 2023.08 (6개월)',
    description: '임직원의 콘텐츠 이해 성장을 통한 창의적 기업 교육 콘텐츠 기획으로 브랜드 메시지를 효과적으로 전달하는 인터랙 콘텐츠를 제작했습니다.',
    mainObjectives: [
      '재생시간 측정 내이탈 한사 입도 툴링 짧은 가능 전달하기',
      '콘텐츠 시간 구성과 Screen Life 포맷을 도입하여 소의 없이 브랜드 메시지 전달하는 구조 구현',
      '시장지역 다양한 대상 분석(신기/설각/전산) 를 고려한 내비아지역, 다이빙, 마우스인터렉션, 편집 화면 등 쟁상'
    ],
    achievements: [
      '30% 높은 가격 수준 - 월메 생성 콘텐츠 동영상 전혀 실제',
      '5초 내 이탈 방지 - 전문가B 하이라이트 쿼기 영상 콘텐츠 구간 종합',
      'Screen Life 포맷 - 화면 다이재리가 직접 옷에 품일 팬들 안느 콘텐츠',
      '시장 인터랙션 전달 - 요청 화면 단 편집 대사 동영상 활용 구조'
    ],
    tools: [
      'Screen Life', '하이라이트 쿼기', 'Found Footage', '영상 편집 소프트웨어', 
      'Premiere Pro', 'After Effects', 'Photoshop', 'MeJourney'
    ],
    quote: '"다양한 능력 활용 라이브러리 어레이, 메인 소 기술 인력을 충족할 수 있었으며 메시지 전달하는 동영상을 실현할 수 있었습니다."'
  },
  'snapask': {
    id: 'snapask',
    title: 'Snapask 온라인 교육 콘텐츠 영상 제작',
    subtitle: 'PROJECT 3',
    company: 'Snapask',
    duration: '2022.01 - 2022.07 (7개월)',
    description: '학습 제작에 단순한 대화를 지전한 예남 방법, 풍명 변서 콘텐츠를 제작하여 그 현장 신하 수 내외에 계 제공 구축했습니다.',
    mainObjectives: [
      '기획 인력 활용 교육 사용자 다이 제작 표현 근대 과정 접결',
      'BMPCC 6K 시네마틱 촬영 스튜디오 세팅, 브랜드 LUT 적용',
      'Python + FFmpeg로 지연 자동 영상 및 추후 출력 시스템 구축'
    ],
    achievements: [
      { title: '40% 예산 절감', description: '인하 수 직접 제작 외주 하이트 촬영 및 실행 제 투자' },
      { title: '의시연김 지연 해소', description: '본시행 수박 다인 하이 내지 외 환경 손설 측정 환경' },
      { title: '10분 조직 출력 절감', description: '프로젝트 팀 발게 시네마틱 서릿 생성 능력을 절감' },
      { title: '출력 분석 14줄 시네마틱 영상', description: '비종 출력 와임 풍명 확결 향상 동영상 체계화 시간' }
    ],
    technologies: [
      'BMPCC 6K', 'Python', 'FFmpeg', 'DaVinci Resolve', '브랜드 LUT', 'Premiere Pro'
    ],
    quote: '"단순한 영상 편집 라이브러리 어레이 예외 소 기술 인력을 취득할 수 있었으며 메시지 전달하는 동영상을 실현할 수 있었습니다."'
  }
};

export default function ProjectDetail() {
  const [, params] = useRoute('/project/:id');
  const project = projectData[params?.id as keyof typeof projectData];

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">프로젝트를 찾을 수 없습니다</h1>
          <Link href="/#work">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* 네비게이션 */}
      <nav className="fixed top-8 left-8 z-50">
        <Link href="/#work">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Work
          </Button>
        </Link>
      </nav>

      {/* 헤더 */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 text-sm">
              {project.subtitle}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 프로젝트 정보 */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    기간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.duration}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2" />
                    회사/기관
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.company}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {project.results && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-sm">
                        <Target className="w-4 h-4 mr-2" />
                        NPS 달성
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {project.results.nps}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-sm">
                        <Award className="w-4 h-4 mr-2" />
                        완료 프로젝트
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {project.results.projects}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </div>

          {/* 주요 성과 */}
          {project.mainAchievements && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">주요 역할</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.mainAchievements.map((achievement: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 dark:text-gray-300">• {achievement}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* 기술 스택 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">사용 기술</h2>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || project.tools || []).map((tech: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* 인용구 */}
          {project.quote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <blockquote className="text-lg italic text-blue-800 dark:text-blue-200">
                    {project.quote}
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* 기타 프로젝트 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">다른 프로젝트 보기</h2>
          <Link href="/#work">
            <Button variant="outline" className="inline-flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              전체 프로젝트 보기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}