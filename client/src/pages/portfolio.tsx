import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  MapPin, 
  Code, 
  Palette, 
  Camera, 
  Monitor,
  Award,
  Calendar,
  ExternalLink,
  Github,
  Linkedin
} from 'lucide-react';

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState('home');
  const { scrollY } = useScroll();
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '소개' },
    { id: 'expertise', label: '전문성' },
    { id: 'work', label: '작업' },
    { id: 'contact', label: '연락처' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  // 스크롤 기반 비디오 애니메이션
  const videoScale = useTransform(scrollY, [0, 500], [1, 10]);
  const videoPosition = useTransform(scrollY, [0, 500], ['0%', '-100%']);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* 고정 네비게이션 */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                currentSection === item.id
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 홈 섹션 - 비디오 애니메이션 */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="text-center z-10 max-w-5xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-0 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            메시지를 넘어
            <br />
            <span className="inline-flex items-center">
              시청자의 경험까지
              <motion.div 
                className="mx-4 bg-black dark:bg-white rounded-sm shadow-lg overflow-hidden"
                style={{ 
                  width: isPortrait ? '80px' : '120px',
                  height: isPortrait ? '80px' : '45px',
                  scale: videoScale,
                  y: videoPosition
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white dark:text-black" />
                </div>
              </motion.div>
              설계하는
            </span>
            <br />
            <span className="text-black dark:text-white">
              콘텐츠 제작자 이승훈 입니다
            </span>
            <span className="text-blue-500 text-6xl md:text-8xl">.</span>
          </motion.h1>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
              콘텐츠 제작 전문가
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              기획부터 송출까지 전 과정을 직접 수행하는 원스톱 제작 역량
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                솔루션 기획부터
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-black dark:text-white mb-2">사업개발/분석·구현</h4>
                  <p className="text-gray-600 dark:text-gray-300">브랜드 마케팅 전략 수립</p>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-black dark:text-white mb-2">콘텐츠 기획·구현</h4>
                  <p className="text-gray-600 dark:text-gray-300">핵심 메시지 전달</p>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-black dark:text-white mb-2">제작 관리·실행</h4>
                  <p className="text-gray-600 dark:text-gray-300">다양한 플랫폼 최적화</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                타겟 기반 콘텐츠 PD
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-black dark:text-white mb-2">마케팅 기획 전문성</h4>
                  <p className="text-gray-600 dark:text-gray-300">타겟 분석부터 콘텐츠 기획까지</p>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-black dark:text-white mb-2">OpenCV 영상 처리</h4>
                  <p className="text-gray-600 dark:text-gray-300">AI 기반 영상 전처리</p>
                </div>
                <div className="p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-black dark:text-white mb-2">FFmpeg 자동화</h4>
                  <p className="text-gray-600 dark:text-gray-300">배치 렌더링 최적화</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 전문성 섹션 */}
      <section id="expertise" className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
              전문 기술 역량
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              제작 환경과 기술을 안정적으로 운영
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 직접 진행 및 현장 대응 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>직접 진행 및 현장 대응</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    제작 전반을 직접 담당하는 원스톱 서비스 제공
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary">솔루션 기획</Badge>
                    <Badge variant="secondary">콘텐츠 제작</Badge>
                    <Badge variant="secondary">현장 대응</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 제작 역량 및 기술 지원 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Monitor className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle>제작 역량 및 기술 지원</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    전문 기술과 숙련된 현장 경험
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline">통합 제작 관리</Badge>
                    <Badge variant="outline">브랜드 최적화</Badge>
                    <Badge variant="outline">다양한 플랫폼 지원</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 사용자 행동 기반 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Palette className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle>사용자 행동 기반</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    사용자 분석과 행동 데이터 기반 전략 수립
                  </p>
                  <div className="space-y-2">
                    <Badge variant="destructive">Python 분석</Badge>
                    <Badge variant="destructive">OpenCV 처리</Badge>
                    <Badge variant="destructive">기술 구현</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 작업 섹션 */}
      <section id="work" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
              주요 프로젝트
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              다양한 분야의 콘텐츠 제작 경험
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 온오프라인 실시간 행사/교육 기획·진행 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>온오프라인 실시간 행사/교육 기획·진행</CardTitle>
                    <Badge>PROJECT 1</Badge>
                  </div>
                  <CardDescription>
                    2023.09 - 2024.11 (14개월)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    콘텐츠 제작 역량을 기반으로 실시간 기술 이슈 대응과 진행 전반으로 NPS 4.5+ 달성
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">NPS 4.5+ 달성</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm">50+ 행사 진행</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">실시간 기술 대응</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 라이브 현장 직접 진행 & 밴드 PM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>라이브 현장 직접 진행 & 밴드 PM</CardTitle>
                    <Badge>PROJECT 2</Badge>
                  </div>
                  <CardDescription>
                    제작 전반을 기반으로 밴드 디자인 · 송출로 모든 플랫폼 조응조율
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    현장 경험을 바탕으로 한 전체적인 제작 관리 및 팀 리더십
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">밴드 통합 디자인</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-green-500" />
                      <span className="text-sm">영상 편집</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">통합 플랫폼 관리</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 삼성물산 고객기반 진단 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>삼성물산 고객기반 진단</CardTitle>
                    <Badge>PROJECT 3</Badge>
                  </div>
                  <CardDescription>
                    2023.02 - 2023.08 (6개월)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    업계 최고 수준의 콘텐츠 회사 성능 분석하고 역량 솔루션 제공
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">40% 예산 절감</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm">5초 내 이탈 방지</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Screen Life 포맷 구현</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 영상 제작 전문성 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>영상 제작 전문성</CardTitle>
                    <Badge>CREATIVE</Badge>
                  </div>
                  <CardDescription>
                    전체 제작 과정을 수행하는 원스톱 솔루션
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    기획, 촬영, 편집, 컬러 그레이딩, 시네마틱 효과 등 전 과정 담당
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">기획 및 전제작</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="w-4 h-4 text-green-500" />
                      <span className="text-sm">컬러 그레이딩</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">편집 및 모션 워크</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section id="contact" className="py-20 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
              연락처
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              프로젝트 문의 및 협업 제안을 환영합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-blue-500" />
                    <span>연락처 정보</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">contact@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">서울, 대한민국</span>
                  </div>
                  <Separator />
                  <div className="flex space-x-4">
                    <Button size="sm" variant="outline">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button size="sm" variant="outline">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>주요 역량</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">NPS 고객 만족도</span>
                      <Badge>4.5+</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">완료된 프로젝트</span>
                      <Badge>50+</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">예산 절감률</span>
                      <Badge>30%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">기술 전문성</span>
                      <Badge>전문가급</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}