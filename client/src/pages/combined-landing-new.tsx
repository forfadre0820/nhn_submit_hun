import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Snapask from "@assets/Snapask.jpg";
import EsportsImage from "@assets/image_1751953797146.png";
import WorkspaceImage from "@assets/image_1751953806704.png";
import CalligraphyImage from "@assets/image_1751953823504.png";
import InterviewImage from "@assets/image_1751953828507.png";
import PerfumeImage from "@assets/image_1751953840186.png";
import TravelImage from "@assets/image_1751953842744.png";
import EducationImage from "@assets/image_1751953845629.png";
import SnapaskOfficeImage from "@assets/image_1751953847874.png";
import JinairEventImage from "@assets/image_1751953850208.png";
import SnapaskInterviewImage from "@assets/image_1751953852561.png";
import ModelPortraitImage from "@assets/image_1751953866736.png";

gsap.registerPlugin(ScrollTrigger);

// Constants for consistent styling
const FONT_SIZES = {
  hero: "text-6xl", // 62px equivalent
  sectionTitle: "text-4xl lg:text-5xl",
  subsectionTitle: "text-2xl lg:text-3xl",
  heading: "text-xl lg:text-2xl",
  subheading: "text-lg",
  body: "text-base",
  small: "text-sm",
  tiny: "text-xs"
};

const SPACING = {
  sectionGap: "mb-20",
  subsectionGap: "mb-12",
  itemGap: "mb-8",
  smallGap: "mb-4"
};

// Portfolio item interface
interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  client: string;
  role: string;
  tools: string[];
  images: string[];
}

// MasonryGrid component
interface MasonryGridProps {
  items: PortfolioItem[];
  onProjectClick: (item: PortfolioItem) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items, onProjectClick }) => {
  const [columns, setColumns] = useState<{ left: PortfolioItem[], right: PortfolioItem[], center?: PortfolioItem[] }>({
    left: [],
    right: [],
    center: []
  });
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle image load and measure height
  const handleImageLoad = useCallback((id: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    // Use 16:9 aspect ratio for all images
    const containerWidth = window.innerWidth <= 768 ? 
      (window.innerWidth - 48) : // Mobile: full width minus padding
      (1152 - 48) / 2; // Desktop: half container width minus gap
    const height = containerWidth * (9 / 16); // 16:9 ratio
    
    setImageHeights(prev => ({
      ...prev,
      [id]: height
    }));
  }, []);

  // Split images into balanced columns
  const distributeImages = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Single column for mobile
      setColumns({ left: items, right: [] });
    } else {
      // Two columns for desktop
      const leftColumn: PortfolioItem[] = [];
      const rightColumn: PortfolioItem[] = [];
      let leftHeight = 0;
      let rightHeight = 0;

      items.forEach(item => {
        const height = imageHeights[item.id] || 300;
        if (leftHeight <= rightHeight) {
          leftColumn.push(item);
          leftHeight += height;
        } else {
          rightColumn.push(item);
          rightHeight += height;
        }
      });

      setColumns({ left: leftColumn, right: rightColumn });
    }
  }, [items, imageHeights]);

  // Initial distribution and when heights change
  useEffect(() => {
    distributeImages();
  }, [distributeImages]);

  // Update when image heights change
  useEffect(() => {
    if (Object.keys(imageHeights).length > 0) {
      distributeImages();
    }
  }, [imageHeights, distributeImages]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset heights to trigger recalculation
      setImageHeights({});
      setIsLoading(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderColumn = (columnItems: PortfolioItem[]) => (
    <div className="flex flex-col gap-4">
      {columnItems.map(item => (
        <motion.div
          key={item.id}
          className="group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => onProjectClick(item)}
        >
          <div 
            className="relative overflow-hidden bg-gray-100 rounded-lg"
            style={{ height: imageHeights[item.id] || 300 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onLoad={(e) => handleImageLoad(item.id, e)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={`title block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}>{item.title}</span>
                <span className={`subtitle block ${FONT_SIZES.small} opacity-90`}>{item.subtitle}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );



  return (
    <div className="flex gap-4">
      {/* Left Column */}
      <div className="flex-1">
        {renderColumn(columns.left)}
      </div>
      
      {/* Right Column (Desktop only) */}
      {columns.right.length > 0 && (
        <div className="flex-1 hidden md:block">
          {renderColumn(columns.right)}
        </div>
      )}
    </div>
  );
};

export default function CombinedLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showSoundControl, setShowSoundControl] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  // Portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      src: EsportsImage,
      alt: "E-sports Event Production",
      title: "E-sports 중계",
      subtitle: "Live Broadcasting",
      description: "실시간 E-sports 대회 중계 제작으로 시청자들에게 몰입감 있는 경험을 제공했습니다. 다각도 카메라 설정과 실시간 편집을 통해 게임의 긴장감을 극대화하고, 해설진과의 협업으로 전문적인 중계 콘텐츠를 완성했습니다.",
      category: "Broadcasting",
      year: "2023",
      client: "Samsung Multicampus",
      role: "Production Director",
      tools: ["Adobe Premiere Pro", "OBS Studio", "Multi-camera Setup"],
      images: [EsportsImage]
    },
    {
      id: "2", 
      src: WorkspaceImage,
      alt: "Content Creator Workspace",
      title: "작업 공간 설계",
      subtitle: "Workspace Design",
      description: "콘텐츠 제작자를 위한 최적화된 작업 공간을 설계하고 구축했습니다. 촬영 환경, 조명 설정, 장비 배치를 체계적으로 계획하여 효율적인 제작 워크플로우를 구현했습니다.",
      category: "Space Design",
      year: "2023",
      client: "Individual Creator",
      role: "Space Planner & Designer",
      tools: ["Space Planning", "Lighting Design", "Equipment Setup"],
      images: [WorkspaceImage]
    },
    {
      id: "3",
      src: CalligraphyImage,
      alt: "Typography Design", 
      title: "브랜드 타이포그래피",
      subtitle: "Brand Typography",
      description: "브랜드의 정체성을 반영하는 타이포그래피 디자인 작업입니다. 한글 캘리그래피의 전통적 아름다움과 현대적 감각을 조화시켜 독창적인 브랜드 폰트를 개발했습니다.",
      category: "Brand Design",
      year: "2022",
      client: "Cultural Brand",
      role: "Typography Designer",
      tools: ["Adobe Illustrator", "Calligraphy", "Font Development"],
      images: [CalligraphyImage]
    },
    {
      id: "4",
      src: InterviewImage,
      alt: "Corporate Interview",
      title: "기업 인터뷰", 
      subtitle: "Corporate Interview",
      description: "기업의 핵심 인물들과의 인터뷰를 통해 브랜드 스토리와 비전을 효과적으로 전달하는 영상을 제작했습니다. 자연스러운 대화 분위기 연출과 전문적인 촬영 기법으로 신뢰감 있는 콘텐츠를 완성했습니다.",
      category: "Corporate Content",
      year: "2023",
      client: "Tech Company",
      role: "Director & Producer",
      tools: ["Sony FX6", "Professional Lighting", "Interview Setup"],
      images: [InterviewImage]
    },
    {
      id: "5",
      src: PerfumeImage,
      alt: "Product Photography",
      title: "제품 촬영",
      subtitle: "Product Photography",
      description: "럭셔리 제품의 프리미엄 이미지를 구현하기 위한 제품 촬영 프로젝트입니다. 정교한 조명 설정과 구도를 통해 제품의 고급스러움과 디테일을 극대화했습니다.",
      category: "Product Photography",
      year: "2023",
      client: "Luxury Brand",
      role: "Product Photographer",
      tools: ["Canon R5", "Studio Lighting", "Macro Lens"],
      images: [PerfumeImage]
    },
    {
      id: "6",
      src: TravelImage,
      alt: "Travel Content",
      title: "여행 콘텐츠",
      subtitle: "Travel Content",
      description: "여행지의 매력을 생생하게 담아내는 콘텐츠 제작 프로젝트입니다. 현지의 문화와 풍경을 자연스럽게 기록하며, 시청자들에게 몰입감 있는 여행 경험을 제공했습니다.",
      category: "Travel Content",
      year: "2022",
      client: "Tourism Board",
      role: "Content Creator",
      tools: ["DJI Drone", "GoPro", "Gimbal Stabilizer"],
      images: [TravelImage]
    },
    {
      id: "7",
      src: EducationImage,
      alt: "Educational Content",
      title: "교육 콘텐츠",
      subtitle: "Educational Content",
      description: "효과적인 학습을 위한 교육 콘텐츠 기획 및 제작을 담당했습니다. 복잡한 개념을 시각적으로 쉽게 이해할 수 있도록 구성하고, 학습자의 참여도를 높이는 인터랙티브 요소를 추가했습니다.",
      category: "Educational Content",
      year: "2023",
      client: "Samsung Multicampus",
      role: "Educational Content Producer",
      tools: ["After Effects", "Motion Graphics", "Interactive Design"],
      images: [EducationImage]
    },
    {
      id: "8", 
      src: SnapaskInterviewImage,
      alt: "Snapask Team Interview",
      title: "팀 인터뷰",
      subtitle: "Team Interview",
      description: "Snapask Korea 팀원들과의 인터뷰를 통해 기업 문화와 비전을 소개하는 콘텐츠를 제작했습니다. 자연스러운 팀 분위기를 담아내며 회사의 인재상과 가치관을 효과적으로 전달했습니다.",
      category: "Corporate Content",
      year: "2022",
      client: "Snapask Korea",
      role: "Assistant Production Manager",
      tools: ["Multi-camera Setup", "Interview Lighting", "Post Production"],
      images: [SnapaskInterviewImage]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!heroRef.current || !videoWrapRef.current) return;

      const hero = heroRef.current;
      const videoWrap = videoWrapRef.current;

      // Cache initial video position and calculate transforms
      const rect = videoWrap.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate translation to center the video
      const centerX = vw / 2;
      const centerY = vh / 2;
      const currentCenterX = rect.left + rect.width / 2;
      const currentCenterY = rect.top + rect.height / 2;
      const x = centerX - currentCenterX;
      const y = centerY - currentCenterY;

      // Create ScrollTrigger for 12 scroll actions to fullscreen
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=1200vh",
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Ease-in-out cubic interpolation for smooth scaling
          const easedProgress = progress < 0.5 
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          // Dynamic aspect ratio handling
          const viewportAspectRatio = window.innerWidth / window.innerHeight;
          
          // Apply square crop for portrait/square viewports
          if (viewportAspectRatio <= 1.0) {
            videoWrap.classList.add('square-crop');
          } else {
            videoWrap.classList.remove('square-crop');
          }
          
          // Calculate target scale to fit viewport
          const targetScale = Math.max(
            window.innerWidth / 140,
            window.innerHeight / 68
          );
          
          const currentScale = 1 + (targetScale - 1) * easedProgress;
          
          // Add scaling class to remove clip-path
          if (progress > 0.05) {
            videoWrap.classList.add('scaling');
          } else {
            videoWrap.classList.remove('scaling');
          }
          
          // Apply transforms
          gsap.set(videoWrap, {
            x: x * easedProgress,
            y: y * easedProgress,
            scale: currentScale,
            transformOrigin: "50% 50%",
            zIndex: progress > 0.1 ? 9999 : 1,
            force3D: true
          });
          
          // Update video fullscreen state for sound control
          setIsVideoFullscreen(progress >= 0.8);
        }
      });

    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);



  // Sound control handlers
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const handleVideoMouseEnter = () => {
    if (isVideoFullscreen) {
      setShowSoundControl(true);
    }
  };

  const handleVideoMouseLeave = () => {
    setShowSoundControl(false);
  };

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[99999]">
        <div className="bg-gray-100/90 backdrop-blur-md rounded-full px-8 py-3">
          <div className="flex items-center space-x-8">
            <a href="#work" className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors`}>Work</a>
            <a href="#about" className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors`}>About</a>
            <a href="#contact" className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors`}>Contact</a>
          </div>
        </div>
      </nav>
      {/* Hero Section with Text Masking */}
      <section 
        ref={heroRef}
        className="hero h-screen flex items-center justify-center relative bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className={`hero__heading font-bold leading-tight ${SPACING.itemGap}`}
            style={{ fontSize: "62px", lineHeight: "1.1" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-2 text-center max-w-4xl mx-auto">
              <div className="block text-left" style={{ lineHeight: "1.1" }}>메세지를 넘어</div>
              <div className="block mt-[2px] mb-[2px] pt-[1px] pb-[1px]" style={{ lineHeight: "1.1" }}>      시청자의 경험까지</div>
              <div className="block pt-[0px] pb-[0px] mt-[-4px] mb-[-4px]" style={{ lineHeight: "1.1" }}>
                설계하는<span 
                  ref={videoWrapRef}
                  className="hero__videoWrap inline-block relative cursor-pointer"
                  style={{
                    width: "140px",
                    height: "68px",
                    verticalAlign: "baseline",
                    willChange: "transform",
                    marginLeft: "12px",
                    marginRight: "0px"
                  }}
                  onMouseEnter={handleVideoMouseEnter}
                  onMouseLeave={handleVideoMouseLeave}
                  onClick={toggleSound}
                >
                  <video
                    ref={videoRef}
                    src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(1.05)",
                      borderRadius: "0"
                    }}
                    className="mt-[10px] mb-[10px]" />
                </span>
              </div>
              <div className="block pt-[3px] pb-[3px]" style={{ lineHeight: "1.1" }}>콘텐츠 제작자 이승훈 입니다<span className="text-pink-500">.</span></div>
            </div>
          </motion.h1>

          {/* Scroll Indicator */}
          <motion.div 
            id="main-scroll-indicator"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-[99999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`${FONT_SIZES.small} ${SPACING.smallGap} transition-colors duration-300 ${isVideoFullscreen ? 'text-white' : 'text-black/80'}`}
            >
              {isVideoFullscreen ? 'Keep to explore' : 'Scroll to explore'}
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className={`w-6 h-10 border-2 rounded-full flex justify-center ml-[39px] mr-[39px] transition-colors duration-300 ${isVideoFullscreen ? 'border-white/40' : 'border-black/30'}`}
            >
              <div className={`w-1 h-3 rounded-full mt-2 transition-colors duration-300 ${isVideoFullscreen ? 'bg-white/60' : 'bg-black/50'}`}></div>
            </motion.div>
          </motion.div>





          {/* Sound Control Overlay */}
          {isVideoFullscreen && (
            <motion.div 
              className="fixed inset-0 z-[99999] pointer-events-auto cursor-pointer"
              onClick={toggleSound}
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
            >
              <motion.div
                className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm rounded-full p-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showSoundControl ? 1 : 0,
                  scale: showSoundControl ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                {isVideoMuted ? (
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" 
                    />
                  </svg>
                ) : (
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
                    />
                  </svg>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Next Section - Portfolio */}
      <section className="next bg-white text-black relative z-1 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main About Section */}
            <div className={SPACING.sectionGap}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">
                  ABOUT 이승훈
                </h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>01</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <h2 className={`${FONT_SIZES.sectionTitle} font-bold text-gray-900 leading-tight ${SPACING.smallGap}`}>
                    콘텐츠 제작자이자 크리에이터를 위한 교육자
                  </h2>
                  <p className="text-gray-700 text-[14px]">10년 이상의 영상 제작 경력을 바탕으로 다수의 공모전, 영화제 출품 및 방송 제작에 참여하며 기획·연출·편집·색보정·사운드 등 제작 전반의 워크플로우를 체계적으로 수행해왔습니다. 다양한 프로젝트를 총괄하며 제작 전 과정에 대한 깊이 있는 이해를 바탕으로 일정, 예산, 품질을 효과적으로 관리했습니다.</p>
                </div>

                {/* Right Column - Services */}
                <div className="lg:col-span-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className={`${FONT_SIZES.body} font-medium text-gray-900 mb-1`}>콘텐츠 기획, 제작</h4>
                      <p className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}>시청자 데이터와 시청환경 분석을 바탕으로 한 전략적 기획력과 촬영·편집·조명·미술까지 아우르는 올라운드 제작 역량으로 고품질 콘텐츠를 구현하여 제작비 최적화와 브랜드 가치 향상을 견인합니다.</p>
                    </div>
                    
                    <div>
                      <h4 className={`${FONT_SIZES.body} font-medium text-gray-900 mb-1`}>프로젝트 매니지먼트</h4>
                      <p className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}>콘텐츠 제작 전문성과 IT 기술 활용 능력을 결합해 창작과 기술의 경계를 넘나들며, 혁신적인 제작 워크플로우 구축을 통해 프로젝트 성과를 극대화합니다.</p>
                    </div>
                    
                    <div>
                      <h4 className={`${FONT_SIZES.body} font-medium text-gray-900 mb-1`}>온, 오프라인 콘텐츠 운영</h4>
                      <p className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}>라이브 콘텐츠를 직접 운영하며 출연자 관리와 제작 능력을 기반으로 한 기술적 이슈 대응을 통해 1년간 NPS 4.5 이상의 안정적인 성과를 달성합니다. </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <h5 className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}>전문 분야</h5>
                  <p className={`text-gray-900 font-medium ${FONT_SIZES.small}`}>콘텐츠 제작 & 교육</p>
                </div>
                
                <div>
                  <h5 className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}>활동 지역</h5>
                  <p className={`text-gray-900 font-medium ${FONT_SIZES.small}`}>대한민국</p>
                </div>
                
                <div>
                  <h5 className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}>경력</h5>
                  <p className={`text-gray-900 font-medium ${FONT_SIZES.small}`}>5+ years</p>
                </div>
                
                <div>
                  <h5 className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}>플랫폼</h5>
                  <p className={`text-gray-900 font-medium ${FONT_SIZES.small}`}>YouTube & 온라인</p>
                </div>
              </div>
            </div>

            {/* Education & Career Section */}
            <div className={SPACING.sectionGap}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">
                  학력 & 경력
                </h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>02</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education Section */}
                <div>
                  <h4 className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}>학력</h4>
                  <div className="space-y-6">
                    <div className="border-l-2 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>상명대학교(서울) 대학원(석사)</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2022.07 - 휴학중</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>감성공학과</p>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>상명대학교(서울)</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2022.07 졸업</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>컴퓨터과학과</p>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>한국애니메이션고등학교</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2010.06 - 2013.03</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>주전공: 영상연출과 | 부전공: 컴퓨터게임제작과</p>
                    </div>
                  </div>
                </div>

                {/* Career Section */}
                <div>
                  <h4 className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}>주요 경력</h4>
                  <div className="space-y-6">
                    <div className="border-l-2 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>삼성 멀티캠퍼스</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2022.07 - 재직중</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>Professional</p>
                      <div className={`text-gray-500 ${FONT_SIZES.tiny} mt-2 leading-relaxed`}>온, 오프라인 콘텐츠 기획 및 제작 총괄, 프로젝트 관리, 라이브 콘텐츠 운영, 클라이언트 협력사 관리</div>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>Snapask Korea</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2022.01 - 2022.07</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>Assistant Production Manager</p>
                      <div className={`text-gray-500 ${FONT_SIZES.tiny} mt-2 leading-relaxed`}>홍콩 기반 에듀테크 기업, 콘텐츠 기획·제작, 현장 촬영 연출, 콘텐츠 편집·배포</div>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>프리랜서</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2019.01 - 2020.01</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>영상 제작·PD/편집자·콘텐츠기획 </p>
                      <div className={`text-gray-500 ${FONT_SIZES.tiny} mt-2 leading-relaxed`}>B2B 클라이언트 대상 콘텐츠 기획·연출·제작, 촬영·조명·미술, 후반 제작 및 품질관리</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications & Skills */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <h5 className={`${FONT_SIZES.body} font-medium text-gray-900 mb-3`}>보유 자격증</h5>
                    <ul className={`space-y-2 ${FONT_SIZES.small} text-gray-600`}>
                      <li>• 컴퓨터그래픽스운용기능사</li>
                      <li>• 멀티미디어콘텐츠제작전문가</li>
                      <li>• Adobe Certified Expert (Premiere Pro)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className={`${FONT_SIZES.body} font-medium text-gray-900 mb-3`}>전문 기술</h5>
                    <ul className={`space-y-2 ${FONT_SIZES.small} text-gray-600`}>
                      <li>• Adobe Creative Suite (전문가)</li>
                      <li>• Final Cut Pro (고급)</li>
                      <li>• DaVinci Resolve (중급)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className={`${FONT_SIZES.body} font-medium text-gray-900 mb-3`}>언어 능력</h5>
                    <ul className={`space-y-2 ${FONT_SIZES.small} text-gray-600`}>
                      <li>• 한국어 (모국어)</li>
                      <li>• 영어 (업무 수준)</li>
                      <li>• 일본어 (기초 회화)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Work Section */}
            <div className={SPACING.sectionGap}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">
                  주요 작업
                </h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>03</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Portfolio Grid - Balanced Masonry Layout */}
              <MasonryGrid 
                items={portfolioItems}
                onProjectClick={setSelectedProject}
              />
            </div>

            {/* Contact Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">Wtih me</h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>04</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-6">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Image-Text Layout - Site Grid */}
              <div className="grid grid-cols-12 gap-4 items-start mb-4">
                {/* Left Column - Image */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="relative overflow-hidden">
                    <div className="absolute left-0 right-0 -inset-y-24" style={{ transform: 'translate3d(0px, 0.9888rem, 0px)' }}>
                      <figure className="overflow-hidden absolute top-0 left-0 h-full w-full">
                        <picture className="absolute inset-0">
                          <img 
                            src={Snapask}
                            loading="lazy" 
                            decoding="async" 
                            draggable="false" 
                            width="2076" 
                            height="2595" 
                            alt="Content Creator Workspace" 
                            className="object-cover w-full h-full"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div className="pt-[125%]"></div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="col-span-12 lg:col-span-6 lg:col-start-8 lg:-mt-15 mt-12 lg:mt-0">
                  <motion.h2 
                    className="text-black mb-10 lg:mb-16 leading-tight uppercase"
                    style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: '700',
                      fontSize: '54px',
                      letterSpacing: '-0.02em',
                      lineHeight: '0.9'
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    I KEEP CHALLENGING<br />
                    MYSELF TO MAKE<br />
                    GOOD AND<br />
                    MEANINGFUL<br />
                    CONTENT
                  </motion.h2>
                  
                  <div className={`col-span-4 text-gray-700 ${FONT_SIZES.body} leading-relaxed mt-10 lg:mt-18 lg:pr-12`}>
                    <p className="text-[14px]">
                      콘텐츠 PD는 단순 제작자가 아닌 메시지를 전달할 수 있어야 하는 설계자입니다. 
                      저는 기획부터 연출, 촬영, 편집, 사용자 경험까지 모든 과정에서 '무엇을, 어떻게' 보여줄지를 고민해왔습니다. 
                      라이브 콘텐츠에선 출연자의 심리를 설계하고, 플랫폼에선 이탈 데이터를 분석해 UI 개선을 제안했으며, 
                      AI 툴을 활용해 제작 속도와 품질을 동시에 끌어올렸습니다. 
                      감성과 전략, 창의성과 기술을 넘나들며 종합적인 콘텐츠 구조를 설계하는 PD로 성장해왔으며, 
                      앞으로도 명확한 메시지를 중심에 둔 콘텐츠를 만들어가겠습니다.
                    </p>
                  </div>
                  
                  <a 
                    href="mailto:buen136003@gmail.com"
                    className={`mt-10 lg:mt-15 text-gray-900 font-medium ${FONT_SIZES.body} border-b-2 border-gray-900 hover:border-gray-600 transition-colors pb-1 inline-block`}
                  >Contact with Me</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Bottom Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button 
                type="button" 
                className={`text-gray-600 hover:text-gray-900 transition-colors ${FONT_SIZES.body}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ 맨 위로
              </button>
              
              <div className="text-center">
                <p className={`text-gray-500 ${FONT_SIZES.body}`}>Copyright © LEESEUNGHUN 2025</p>
              </div>
              
              <div className={`text-gray-600 ${FONT_SIZES.body}`}>
                Seoul, KR {new Date().toLocaleTimeString('ko-KR', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Project Detail Modal - Professional Style */}
      {selectedProject && selectedProject.id === "1" && (
        <motion.div 
          className="fixed inset-0 bg-white z-[99999] overflow-y-auto text-[14px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => setSelectedProject(null)}
        >
          {/* Navigation Bar */}
          <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[99999]">
            <div className="bg-gray-100/90 backdrop-blur-md rounded-full px-8 py-3">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="text-sm text-gray-700 hover:text-black transition-colors cursor-pointer"
                >
                  Home
                </button>
                <a href="#work" className="text-sm text-gray-700 hover:text-black transition-colors">Work</a>
                <a href="#about" className="text-sm text-gray-700 hover:text-black transition-colors">About</a>
                <a href="#contact" className="text-sm text-gray-700 hover:text-black transition-colors">Contact</a>
              </div>
            </div>
          </nav>

          <motion.div 
            className="bg-white w-full max-w-4xl mx-auto min-h-screen relative tracking-tight leading-relaxed"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Page Header */}
            <div className="px-8 lg:px-16 py-12 pt-24">
              
              {/* Back Link */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm text-[#58534e] hover:text-[#282623] transition-colors"
                >
                  ← Back To All Work
                </button>
              </motion.div>

              {/* Header Body */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    <h1 className="text-4xl lg:text-5xl font-light text-[#282623] leading-tight mb-0">온·오프라인 실시간 행사/교육 기획·진행</h1>
                  </div>
                </div>

                {/* Header Details */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <h5 className="opacity-50 text-base font-normal mb-2">Categories</h5>
                      <p className="text-sm text-[#282623]">행사, 교육 기획</p>
                    </div>
                    
                    <div>
                      <h5 className="opacity-50 text-base font-normal mb-2">Client</h5>
                      <p className="text-sm text-[#282623]">삼성 그룹</p>
                    </div>
                    
                    <div>
                      <h5 className="opacity-50 text-base font-normal mb-2">Role</h5>
                      <p className="text-sm text-[#282623]">기획, 운영, 제작</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#282623] text-sm tracking-tight leading-relaxed">삼성 그룹의 온·오프라인 실시간 행사/교육 기획·진행 프로젝트를 담당했습니다. 진행과 동시에 콘텐츠 제작 기반의 기술 이슈 대응,  커뮤니케이션을 주도하여 고객 만족도 NPS 4.5+를 달성하고, 온라인 이벤트 콘텐츠는 신규 고객사 5개를 수주했습니다.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cover Image */}
            <motion.div 
              className="mb-16 px-8 lg:px-16"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="w-full aspect-[16/9] bg-[#b9b8b6] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop"
                  alt="온·오프라인 실시간 행사/교육 기획·진행"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content Container */}
            <div className="px-8 lg:px-16 pb-12">

              {/* Additional Project Images */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=450&fit=crop"
                      alt="온라인 행사 진행 모습"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=450&fit=crop"
                      alt="현장 진행 및 모니터링"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <p className="text-sm text-[#58534e] italic">현장진행부터 기술구현까지</p>
                </div>
              </motion.div>

              {/* Project Details */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >




                {/* 기간 */}
                <div className="mb-6">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">• 기간</h2>
                </div>
                <div className="mb-8">
                  <div className="text-sm text-[#282623] tracking-tight leading-relaxed">전체 기간: 2023.01 ~ 2024.11 (23개월)</div>
                </div>

                {/* 성과 */}
                <div className="mb-6 mt-8">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">• 성과</h2>
                </div>
                <div className="space-y-5 mb-8">
                  <div>
                    <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">고객 만족도 NPS 4.5+ 달성</h3>
                    <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">50개 이상 행사에서 일관된 고품질 서비스 제공</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">기업 고객사 수주 5개</h3>
                    <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">NH농협, 삼성교육재단, 한국증권 등 온라인 이벤트 프로젝트 수주</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">운영 효율성 30% 개선</h3>
                    <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">자동화 프로그램 도입으로 인력 및 시간 비용 절감</p>
                  </div>
                </div>
                
                {/* 주요 역할 */}
                <div className="mb-6 mt-8">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">• 주요 역할</h2>
                </div>
                <div className="space-y-5 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">실시간 행사 운영 및 기술 대응</h3>
                    <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                      <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                        삼성 그룹 대규모 행사 → 영상, 음향, 송출 등 여러 협력사 동시 작업 → 실시간 기술 이슈 & 출연자 변수 발생
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">협력사 커뮤니케이션</h4>
                        <ul className="text-sm text-[#58534e] space-y-1">
                          <li className="mt-[4px] mb-[4px]">• 영상: 앵글, 트랜지션 품질 확보</li>
                          <li>• 음향: 밸런스 조정 및 품질 관리</li>
                          <li>• 송출: 실시간 기술 이슈 대응</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">돌발 상황 대응</h4>
                        <ul className="text-sm text-[#58534e] space-y-1">
                          <li>• 출연자 지각, 건강 이상 등</li>
                          <li>• 큐시트 실시간 수정</li>
                          <li>• 직접 대체 진행 수행</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">콘텐츠 제작 및 자동화 시스템 개발</h3>
                    <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                      <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                        행사별 다양한 그래픽 필요 + 송출 타이밍 오류 = 행사 품질 직접 영향 → 효율적 제작 & 자동화 필요
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">그래픽 제작 시스템</h4>
                        <ul className="text-sm text-[#58534e] space-y-1">
                          <li>• Midjourney, Stable Diffusion ComfyUI 활용</li>
                          <li>• Python 기반 후보정</li>
                          <li>• AI 생성 흔적 최소화 → 실사용급 완성</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">자동화 프로그램</h4>
                        <ul className="text-sm text-[#58534e] space-y-1">
                          <li>• Python + OCR 화면 인식</li>
                          <li>• 영상, 음악 송출 타이밍 제어</li>
                          <li>• 타이밍 오류 최소화</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">플랫폼 기획 및 데이터 설계</h3>
                    <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                      <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                        기존 플랫폼 한계 → 임직원 참여 데이터 확보 어려움 → 메타버스 환경에서 자연스러운 몰입 & 참여 유도 필요
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">플랫폼 확장 기획</h4>
                        <ul className="text-sm text-[#58534e] space-y-1">
                          <li>• 자체 플랫폼 확장 설계</li>
                          <li>• 실질적 임직원 참여 데이터 확보</li>
                          <li>• 현실 조직 공간 반영 맵 디자인</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">데이터 구조 설계</h4>
                        <ul className="text-sm text-[#58534e] space-y-1">
                          <li>• SnowFlake 기반 행동 로그 수집</li>
                          <li>• API 연동 구조 협의</li>
                          <li>• 사용자 자율 탐색 유도</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 활용 기술 */}
                <div className="mb-6 mt-8">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">• 활용 기술</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                  <div>
                    <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Adobe Creative Suite</div>
                    <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Premiere Pro, After Effects, Photoshop</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">생성형 AI</div>
                    <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Midjourney, Stable Diffusion ComfyUI</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">자동화 개발</div>
                    <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Python, OCR 화면 인식</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">데이터 설계</div>
                    <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">SnowFlake, API 연동</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <button 
                      type="button" 
                      className="text-sm text-[#58534e] hover:text-[#282623] transition-colors"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      ↑ 맨 위로
                    </button>
                    
                    <div className="text-center">
                      <p className="text-sm text-[#58534e]">Copyright © LEESEUNGHUN 2025</p>
                    </div>
                    
                    <div className="text-sm text-[#58534e]">
                      Seoul, KR {new Date().toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      })}
                    </div>
                  </div>
                </div>

              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Other Projects - Simple Modal */}
      {selectedProject && selectedProject.id !== "1" && (
        <motion.div 
          className="fixed inset-0 bg-gray-50 bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-[99999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            className="relative max-w-3xl max-h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg overflow-y-auto border border-gray-200"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full flex items-center justify-center transition-all z-10"
              onClick={() => setSelectedProject(null)}
            >
              <span className="text-lg leading-none">×</span>
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedProject.title}
                </h1>
                <p className="text-gray-600">{selectedProject.subtitle}</p>
              </div>

              <div className="mb-6">
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">프로젝트 설명</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">카테고리</h4>
                    <p className="text-gray-900 font-medium text-sm">{selectedProject.category}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">클라이언트</h4>
                    <p className="text-gray-900 font-medium text-sm">{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">사용 도구</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.tools.map((tool, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="text-gray-500 text-xs">
                    {portfolioItems.findIndex(item => item.id === selectedProject.id) + 1} / {portfolioItems.length}
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-sm"
                  >
                    돌아가기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}