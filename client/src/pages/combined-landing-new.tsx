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
                <h3 className={`${FONT_SIZES.small} font-medium text-red-500 uppercase tracking-wide`}>
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
                <h3 className={`${FONT_SIZES.small} font-medium text-red-500 uppercase tracking-wide`}>
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
                <h3 className={`${FONT_SIZES.small} font-medium text-red-500 uppercase tracking-wide`}>
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
                <h3 className={`${FONT_SIZES.small} font-medium text-red-500 uppercase tracking-wide`}>
                  연락하기
                </h3>
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

      {/* Project Detail Modal - TURTLE AND HARE Style */}
      {selectedProject && selectedProject.id === "1" && (
        <motion.div 
          className="fixed inset-0 bg-white z-[99999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            className="bg-white w-full max-w-6xl max-h-[100vh] overflow-y-auto relative scrollbar-hide"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content Container */}
            <div className="px-8 lg:px-16 py-8">
              
              {/* Back Link */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm text-black hover:text-gray-600 transition-colors border-b border-black pb-1"
                >
                  Back To All Work
                </button>
              </motion.div>

              {/* Project Title */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-7xl lg:text-8xl font-black text-black tracking-tight leading-[0.9] uppercase">
                  온·오프라인 실시간<br />
                  행사/교육 기획·진행
                </h1>
              </motion.div>

              {/* Cover Image */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={selectedProject.src}
                    alt="온·오프라인 실시간 행사/교육 기획·진행"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Introduction Section */}
              <motion.div 
                className="grid grid-cols-12 gap-12 mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Introduction */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                    <h2 className="text-lg font-bold text-black">Introduction</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-black">
                    온·오프라인 통합 행사 플랫폼의 개발과 운영을 담당한 프로젝트입니다. 실시간 스트리밍 기술과 AI 기반 현장 대응 시스템을 구축하여 50개 이상의 행사에서 NPS 4.5+ 고객만족도를 달성했습니다. Python과 OpenCV를 활용한 자동화 솔루션으로 효율적인 VOD 제작과 디지털콘텐츠 관리를 실현했습니다.
                  </p>
                </div>
              </motion.div>

              {/* The Process Behind The Creation */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                  <h2 className="text-lg font-bold text-black uppercase">The Process Behind The Creation</h2>
                </div>
                <p className="text-base text-black mb-12 leading-relaxed">
                  온·오프라인 통합 플랫폼의 전체적인 시스템 구조를 설계하고, Python과 OpenCV를 활용한 실시간 처리 아키텍처를 구축했습니다. 50+ 행사에서의 실시간 모니터링, 돌발상황 대응, 그리고 참가자들의 만족도를 높이기 위한 체계적인 운영 프로세스를 개발했습니다.
                </p>
              </motion.div>

              {/* 핵심성과 */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-black mb-8">핵심성과</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-500 text-white p-6 rounded-2xl flex items-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">NPS 4.5+ 달성</div>
                      <div className="text-sm opacity-80">50+ 행사에서 일관된 고객만족도 유지</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500 text-white p-6 rounded-2xl flex items-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">50+ 행사진행</div>
                      <div className="text-sm opacity-80">온·오프라인 하이브리드 대규모 행사 운영</div>
                    </div>
                  </div>

                  <div className="bg-blue-500 text-white p-6 rounded-2xl flex items-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H7v6h6V7z"/>
                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5v10h10V5H5z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">실시간 & 벤더 관리</div>
                      <div className="text-sm opacity-80">제작역량기반통합적 프로젝트리드</div>
                    </div>
                  </div>

                  <div className="bg-blue-500 text-white p-6 rounded-2xl flex items-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">패배반응솔루션</div>
                      <div className="text-sm opacity-80">OpenCV와 Python으로 제약적명 구축</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 활용 기술 스택 */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <h3 className="text-2xl font-bold text-black mb-8">활용 기술 스택</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">Python</span>
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">OpenCV</span>
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">실시간 스트리밍</span>
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">VOD 제작</span>
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">AI 솔루션</span>
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">프로젝트 관리</span>
                  <span className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium">현장 운영</span>
                </div>
              </motion.div>

              {/* 직접 현장진행 & 벤더 관리 */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h3 className="text-2xl font-bold text-black mb-8">직접 현장진행 & 벤더 관리</h3>
                
                {/* 현장경험 하이라이트 */}
                <div className="bg-blue-50 p-8 rounded-2xl mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-black">현장경험 하이라이트</h4>
                  </div>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      IT 전문성 바탕으로 행사진행
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      출연자 컨셉 이상으로 직접 대해 진행 및 큐시트 수정
                    </li>
                  </ul>
                </div>

                {/* 기술 태그들 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium">실시간 모니터링</div>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium">현장 대응</div>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium">벤더 관리</div>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium">품질 관리</div>
                </div>

                {/* 영상팀과 음향팀 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-black">영상팀</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 촬영 경험 기반양웅구도 디렉팅</li>
                      <li>• 스토리텔링 중심 전환 효과 가이드</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.788a1 1 0 011.617.788zM11 7.116V12.884a5.002 5.002 0 000-5.768zm2 2.768a3.001 3.001 0 000-1.768v1.768z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-black">음향팀</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 환경별 최적 마이크 배치 가이드</li>
                      <li>• 실시간 오디오 밸런싱 디렉팅</li>
                    </ul>
                  </div>
                </div>

                {/* 통합 프로젝트 관리 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V5a2 2 0 00-2-2H4zm8 0a2 2 0 012-2v1a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V5a2 2 0 00-2-2h-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h5 className="font-bold text-black mb-2">직접진행</h5>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h5 className="font-bold text-black mb-2">품질관리</h5>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h5 className="font-bold text-black mb-2">벤더조율</h5>
                  </div>
                </div>

                {/* 전체프로젝트관리 안내 */}
                <div className="bg-blue-50 p-6 rounded-2xl mt-8">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-black mb-2">전체프로젝트운영 안의 통합형 PM</h5>
                      <p className="text-sm text-gray-700">제작역량이 있어 각 부여와 소통이 가능하고, 바꿔 제시, 문제 해결이 가능합니다. 팔요시 직접 투입되어 지 행까지 담당할 수 있는 현장 즉석 PM입니다.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 제약환경에서 기술로 안정적 송출 구현 */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <h3 className="text-2xl font-bold text-black mb-8">제약환경에서 기술로 안정적 송출 구현</h3>
                
                <div className="bg-blue-50 p-8 rounded-2xl mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-black">작업진행 및 현장 대응</h4>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl mb-6">
                    <h5 className="font-bold text-blue-500 text-center mb-4">출연자 불참시 작업 마이크를 잡고 대체 진행</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>• 벤더 제휴으로 중간 대응</div>
                      <div>• 풀질 유지</div>
                    </div>
                  </div>
                </div>

                {/* 제약환경 기술지원 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h5 className="font-bold text-black">코딩제시 및 현장조치</h5>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 콘텐츠저희</li>
                      <li>• 뷔편 요소자치</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                        </svg>
                      </div>
                      <h5 className="font-bold text-black">음악자동화</h5>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 뮤온트 데이터</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h5 className="font-bold text-black">PC 원격화</h5>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 실속대응</li>
                    </ul>
                  </div>
                </div>

                {/* 제작역량 + IT 지식 */}
                <div className="bg-blue-50 p-6 rounded-2xl mt-8">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-black mb-2">제작역량 + IT 지식시너지: 직접 시행, 경영괴기술력 이해로 현장 문제들 즉각 해결하고 품질 유지</h5>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 패배반응솔루션 */}
              <motion.div 
                className="mb-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <h3 className="text-2xl font-bold text-black mb-8">패배반응솔루션</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-black">기술적 도전</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 외부 API 사용 불가 폐쇄망</li>
                      <li>• 기본 솔루션 시설 좋은 불가</li>
                      <li>• 정활한타이밍 확보 필수</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-black">OpenCV 솔루션</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• 로컬 기반 OpenCV로 롱대페면 인식, 쿠폰얼드 포착, 이른 얼굴영역 없자동화</li>
                      <li>• 화면 인식 패턴 감지</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-black">AI 라스△ 활용</h4>
                    </div>
                    <p className="text-sm text-gray-700">AI 생성 이미지에 Python 기반보정으로 고품질 시각자료 구축</p>
                    <div className="bg-purple-100 p-3 rounded-lg mt-3">
                      <span className="text-xs text-purple-700 font-medium">품질 최적화 AI 후보정</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-black">핵심성과</h4>
                    </div>
                    <p className="text-sm text-gray-700">제약환경에서도 기술 솔루션으로 정확한 타이밍 제어, 인명적 송출시스템</p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">업계 제어</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">품질 향상</span>
                    </div>
                  </div>
                </div>

                {/* 제작역량이 있어야 해결가능한 기술문제들 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mt-8">
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-black mb-3">제작역량이 있어야 해결가능한 기술문제들</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-bold text-blue-500 mb-2">✓ 촬영 지식</h5>
                          <p className="text-sm text-gray-700">화면 지식, 패턴 감지</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-bold text-blue-500 mb-2">✓ 기술이해</h5>
                          <p className="text-sm text-gray-700">기술이해</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-bold text-blue-500 mb-2">✓ 자원경험</h5>
                          <p className="text-sm text-gray-700">문제해결력</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-bold text-blue-500 mb-2">✓ 문제해결력</h5>
                          <p className="text-sm text-gray-700">문제해결력</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Credits Section */}
              <motion.div 
                className="grid grid-cols-12 gap-12 mb-32"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                {/* Credits */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                    <h2 className="text-lg font-bold text-black">Credits</h2>
                  </div>
                  <div className="space-y-4 text-black leading-relaxed">
                    <div>
                      <strong>Agency:</strong> Samsung Multicampus<br/>
                      <strong>Project Lead:</strong> 이승훈 / Creative Director: 이승훈 / Art Director: 이승훈 / Project Director: 이승훈 / Project Manager: 이승훈 / Studio Representative: 이승훈 / Agency Director: 이승훈 / Storyboard & Concepts: 이승훈 / Animation: 이승훈 / Character Modeling & Shading: 이승훈 / Character Blendshapes: 이승훈 / Character Rigging: 이승훈 / Environment Modeling & Shading: 이승훈 / Props and Assets Development: 이승훈 / Technical Development: Python, OpenCV / 3D Animation Supervisor: 이승훈 / Lighting & Rendering: 이승훈 / Composite & Post-production: 이승훈 / Color Grading: 이승훈
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