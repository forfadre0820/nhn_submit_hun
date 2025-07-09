import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactWorkspaceImage from "@assets/image_1752013143751.png";
import SamsungOfflineImage from "@assets/오프라인 운영_1752012039625.png";
import SnapaskContentImage from "@assets/image_1752012210723.png";
import SamsungEducationImage from "@assets/1_1752012693958.jpg";
import JinairPromoImage from "@assets/image_1752012778140.png";
import IntegratedOperationImage from "@assets/온 오프라인 통합운영_1752007176743.jpg";
import TechSupportImage from "@assets/현장 기술 대응_1752007178380.jpg";
import OverseasEventImage from "@assets/오프라인 운영_1752007181258.jpg";
import OnlineEventImage from "@assets/온라인 이벤트 기획 운영_1752007184273.jpg";

// Gallery images
import GalleryCalligraphyImage from "@assets/image_1752014631972.png";
import GalleryBeautyImage from "@assets/image_1752014636911.png";
import GalleryWorkspaceImage from "@assets/image_1752014643264.png";
import GalleryInterviewImage from "@assets/image_1752014659090.png";
import GalleryLuxuryBagImage from "@assets/image_1752014666138.png";
import GalleryMalePortraitImage from "@assets/image_1752014670363.png";
import GalleryCasualPortraitImage from "@assets/image_1752014672407.png";
import GalleryJinairPromotionImage from "@assets/image_1752014683656.png";

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

// Animation constants
const ANIMATION_DURATIONS = {
  modal: 0.4,
  modalContent: 0.5,
  stagger: 0.1
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
  const [isClosingModal, setIsClosingModal] = useState(false);
  
  // Portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      src: SamsungOfflineImage,
      alt: "Samsung 온·오프라인 콘텐츠 기획",
      title: "Samsung 온·오프라인 콘텐츠 기획",
      subtitle: "통합 교육 프로그램 운영",
      description: "SAMSUNG\n온 오프라인 콘텐츠 기획. 운영",
      category: "Event Planning",
      year: "2023-2024",
      client: "삼성 그룹",
      role: "기획, 운영, 제작",
      tools: ["Adobe Premiere", "After Effects", "Photoshop"],
      images: [IntegratedOperationImage, TechSupportImage, OverseasEventImage, OnlineEventImage]
    },
    {
      id: "2",
      src: SnapaskContentImage,
      alt: "Snapask 프리미엄 콘텐츠 영상 제작",
      title: "Snapask 프리미엄 콘텐츠 영상 제작",
      subtitle: "교육 콘텐츠 기획 및 제작",
      description: "SNAPASK KOREA\n프리미엄 콘텐츠 영상 제작",
      category: "Content Production",
      year: "2022-2023",
      client: "Snapask Korea",
      role: "콘텐츠 기획, 영상 제작",
      tools: ["Video Production", "Educational Content", "Mobile Platform"],
      images: [IntegratedOperationImage, TechSupportImage, OverseasEventImage, OnlineEventImage]
    },
    {
      id: "3",
      src: SamsungEducationImage,
      alt: "Samsung 교육 콘텐츠 기획 제작",
      title: "Samsung 교육 콘텐츠 기획 제작",
      subtitle: "기업 교육 프로그램 개발",
      description: "SAMSUNG\n교육형 영상 콘텐츠 기획, 제작",
      category: "Educational Content",
      year: "2023",
      client: "삼성교육재단",
      role: "교육 콘텐츠 기획",
      tools: ["Learning Management", "Video Production", "Interactive Content"],
      images: [IntegratedOperationImage, TechSupportImage, OverseasEventImage, OnlineEventImage]
    },
    {
      id: "4",
      src: JinairPromoImage,
      alt: "Jinair 베트남 인플루언서 프로모션 콘텐츠 제작",
      title: "Jinair 베트남 인플루언서 프로모션 콘텐츠 제작",
      subtitle: "해외 마케팅 콘텐츠 기획",
      description: "JINAIR\n베트남 인플루언서 홍보 콘텐츠 제작",
      category: "Marketing Content",
      year: "2023",
      client: "Jinair",
      role: "마케팅 콘텐츠 기획",
      tools: ["Influencer Marketing", "Brand Content", "Video Production"],
      images: [IntegratedOperationImage, TechSupportImage, OverseasEventImage, OnlineEventImage]
    }
  ];

  // Gallery items
  const galleryItems: PortfolioItem[] = [
    {
      id: "gallery-1",
      src: GalleryCalligraphyImage,
      alt: "영성의 시각화된 표현",
      title: "캘리그래피 아트",
      subtitle: "전통 서예와 현대 디자인의 만남",
      description: "영성을 시각화한 서예 작품으로 전통과 현대의 조화를 추구합니다.",
      category: "Typography",
      year: "2024",
      client: "개인 작업",
      role: "디자인, 서예",
      tools: ["Traditional Calligraphy", "Digital Design"],
      images: []
    },
    {
      id: "gallery-2",
      src: GalleryBeautyImage,
      alt: "뷰티 브랜드 모델 촬영",
      title: "뷰티 포트레이트",
      subtitle: "화장품 브랜드 광고 촬영",
      description: "자연스러운 뷰티 룩을 강조한 제품 광고 콘텐츠입니다.",
      category: "Beauty Photography",
      year: "2024",
      client: "ETUDE",
      role: "포토그래피, 리터칭",
      tools: ["Studio Photography", "Photoshop"],
      images: []
    },
    {
      id: "gallery-3",
      src: GalleryWorkspaceImage,
      alt: "창작 작업 공간 스냅",
      title: "워크스페이스",
      subtitle: "집중과 창의성이 만나는 공간",
      description: "업무와 창작이 이루어지는 개인 작업 공간의 모습입니다.",
      category: "Lifestyle",
      year: "2024",
      client: "개인 기록",
      role: "스냅 사진",
      tools: ["Natural Light", "Candid Photography"],
      images: []
    },
    {
      id: "gallery-4",
      src: GalleryInterviewImage,
      alt: "인터뷰 현장 촬영",
      title: "인터뷰 세팅",
      subtitle: "진솔한 대화의 순간",
      description: "자연스러운 인터뷰 분위기를 담은 현장 스냅입니다.",
      category: "Documentary",
      year: "2024",
      client: "언론사",
      role: "현장 촬영",
      tools: ["Documentary Style", "Natural Setting"],
      images: []
    },
    {
      id: "gallery-5",
      src: GalleryLuxuryBagImage,
      alt: "럭셔리 제품 촬영",
      title: "제품 포토그래피",
      subtitle: "고급스러운 브랜드 이미지",
      description: "럭셔리 브랜드의 제품 특성을 극대화한 스튜디오 촬영입니다.",
      category: "Product Photography",
      year: "2024",
      client: "Louis Vuitton",
      role: "제품 촬영, 후보정",
      tools: ["Studio Setup", "Product Photography"],
      images: []
    },
    {
      id: "gallery-6",
      src: GalleryMalePortraitImage,
      alt: "남성 포트레이트 촬영",
      title: "남성 포트레이트",
      subtitle: "클래식한 매력의 표현",
      description: "세련된 남성의 매력을 담은 클래식 포트레이트입니다.",
      category: "Portrait",
      year: "2024",
      client: "개인 촬영",
      role: "포트레이트 촬영",
      tools: ["Studio Portrait", "Classic Lighting"],
      images: []
    },
    {
      id: "gallery-7",
      src: GalleryCasualPortraitImage,
      alt: "캐주얼 포트레이트",
      title: "자연스러운 매력",
      subtitle: "편안한 분위기의 인물 사진",
      description: "자연스럽고 편안한 분위기를 담은 캐주얼 포트레이트입니다.",
      category: "Casual Portrait",
      year: "2024",
      client: "개인 촬영",
      role: "포트레이트 촬영",
      tools: ["Natural Light", "Casual Setup"],
      images: []
    },
    {
      id: "gallery-8",
      src: GalleryJinairPromotionImage,
      alt: "진에어 프로모션 콘텐츠",
      title: "항공사 프로모션",
      subtitle: "여행의 설렘을 담은 비주얼",
      description: "진에어의 쿠폰 대방출 프로모션을 위한 그래픽 디자인입니다.",
      category: "Promotion Design",
      year: "2024",
      client: "JIN AIR",
      role: "그래픽 디자인",
      tools: ["Graphic Design", "Promotion Material"],
      images: []
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

  // Modal close with dissolve effect
  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingModal(false);
    }, 400);
  };

  // Navigation handler with smooth scroll to section
  const handleNavigation = (section: string) => {
    closeModal();
    setTimeout(() => {
      switch(section) {
        case 'home':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'about':
          document.querySelector('.next')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'work':
          document.querySelector('[data-section="work"]')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'contact':
          document.querySelector('[data-section="contact"]')?.scrollIntoView({ behavior: 'smooth' });
          break;
      }
    }, 500);
  };

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[99999]">
        <div className="bg-gray-100/90 backdrop-blur-md rounded-full px-8 py-3">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              Home
            </button>
            <button 
              onClick={() => document.querySelector('.next')?.scrollIntoView({ behavior: 'smooth' })}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              About
            </button>
            <button 
              onClick={() => document.querySelector('[data-section="work"]')?.scrollIntoView({ behavior: 'smooth' })}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              Work
            </button>
            <button 
              onClick={() => document.querySelector('[data-section="contact"]')?.scrollIntoView({ behavior: 'smooth' })}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              Contact
            </button>
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
                    src="/attached_assets/ShowReels_2025_public_1752082844140.mp4"
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
      <section className="next bg-white text-black relative z-1 min-h-screen" data-section="about">
        <div className="container mx-auto px-4 pt-20">
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
                <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">ABOUT Hun</h3>
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
                <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                  Education & Experience
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
                      <div className="text-gray-500 mt-2 text-[14px]">온, 오프라인 콘텐츠 기획 및 제작 총괄, 프로젝트 관리, 라이브 콘텐츠 운영, 클라이언트 협력사 관리</div>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>Snapask Korea</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2022.01 - 2022.07</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>Assistant Production Manager</p>
                      <div className="text-gray-500 mt-2 text-[14px]">홍콩 기반 에듀테크 기업, 콘텐츠 기획·제작, 현장 촬영 연출, 콘텐츠 편집·배포</div>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className={`${FONT_SIZES.body} font-medium text-gray-900`}>프리랜서</h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>2019.01 - 2020.01</span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>영상 제작·PD/편집자·콘텐츠기획 </p>
                      <div className="text-gray-500 mt-2 text-[14px]">B2B 클라이언트 대상 콘텐츠 기획·연출·제작, 촬영·조명·미술, 후반 제작 및 품질관리</div>
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
                      <li>• 정보처리기사</li>
                      <li>• 정보처리산업기사</li>
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
            <div className={SPACING.sectionGap} data-section="work">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">MAIN PROJECT</h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>03</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Portfolio Grid - Single Row Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {portfolioItems.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(item)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* 프로젝트 이미지 카드 */}
                    <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[16/9]">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* 호버 오버레이 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className={`company block ${FONT_SIZES.small} opacity-90 font-medium drop-shadow-lg`}>{item.description.split('\n')[0]}</span>
                          <span className={`content block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}>{item.description.split('\n')[1]}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className={SPACING.sectionGap} data-section="gallery">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">VISUAL GALLERY</h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>04</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Gallery Grid - Masonry Layout (Pinterest style) */}
              <div className="columns-2 md:columns-4 gap-4 mb-8 space-y-4">
                {galleryItems.map((item, index) => {
                  // 다양한 높이 패턴 생성 (rem 단위 사용)
                  const heightVariants = [
                    'h-[12rem]', 'h-[20rem]', 'h-[14rem]', 'h-[18rem]', 'h-[10rem]', 'h-[22rem]', 'h-[13rem]', 'h-[19rem]'
                  ];
                  const randomHeight = heightVariants[index % heightVariants.length];
                  
                  return (
                    <motion.div
                      key={`gallery-${item.id}`}
                      className={`group cursor-pointer break-inside-avoid mb-4 ${randomHeight}`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedProject(item)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* 갤러리 이미지 카드 */}
                      <div className="relative overflow-hidden bg-gray-100 rounded-lg w-full h-full">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* 호버 오버레이 */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className={`company block ${FONT_SIZES.small} opacity-90 font-medium drop-shadow-lg`}>{item.client}</span>
                            <span className={`content block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}>{item.title}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-0" data-section="contact">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">Keep going with you</h3>
                <span className={`${FONT_SIZES.small} font-medium text-gray-500`}>05</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* MAKE IT BETTER Section */}
              <div className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[500px]">
                  {/* Left Column - Image */}
                  <div className="relative">
                    <div className="w-full h-full bg-gray-100 overflow-hidden">
                      <img 
                        src={ContactWorkspaceImage}
                        loading="lazy" 
                        decoding="async" 
                        draggable="false" 
                        alt="Professional Content Production Workspace" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="bg-gray-50 p-8 lg:p-16 flex flex-col justify-center text-[#4b5563]">
                    <motion.h3 
                      className="text-red-500 font-light mb-8 lg:mb-12"
                      style={{ 
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: '300',
                        fontSize: '4rem',
                        lineHeight: '1.1',
                        letterSpacing: '-0.02em'
                      }}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94] 
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <span>&gt;</span>Collaboration
                    </motion.h3>
                    
                    <div className="text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Noto Sans', sans-serif", fontWeight: '300' }}>
                      <p className="text-[14px] mb-4 text-[#4b5563] font-normal">
                        콘텐츠 PD는 단순 제작자가 아닌 메시지를 전달할 수 있어야 하는 설계자입니다. 저는 기획부터 
                        연출, 촬영, 편집, 사용자 경험까지 모든 과정에서 '무엇을, 어떻게' 보여줄지를 고민해왔습니다.
                      </p>
                      <p className="text-[14px] mb-4 text-[#4b5563] font-normal">
                        라이브 콘텐츠에선 출연자의 심리를 설계하고, 플랫폼에선 이탈 데이터를 분석해 UI 개선을 제안했으며, 
                        AI 툴을 활용해 제작 속도와 품질을 동시에 끌어올렸습니다. 감성과 전략, 창의성과 기술을 
                        넘나들며 종합적인 콘텐츠 구조를 설계하는 PD로 성장해왔으며, 앞으로도 명확한 메시지를 중심에 둔 
                        콘텐츠를 만들어가겠습니다.
                      </p>
                    </div>
                    
                    <a 
                      href="mailto:buen136003@gmail.com"
                      className="inline-block text-gray-900 hover:text-gray-700 transition-colors underline text-[16px] font-light"
                      style={{ fontFamily: "'Noto Sans', sans-serif", fontWeight: '400' }}
                    >
                      Contact With Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="pb-[18px] pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Separator Line - Same as other sections */}
            <div className="separator-wrap mb-4">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>
            
            {/* Footer Content - 3 Column Layout */}
            <div className="grid grid-cols-3 gap-8 items-center text-center">
              {/* Left - Back to top */}
              <div className="text-left">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-[14px]"
                >
                  Back to top ↑
                </button>
              </div>
              
              {/* Center - Copyright */}
              <div>
                <p className="text-gray-500 text-[14px]">© LEESEUNGHUN 2025</p>
              </div>
              
              {/* Right - Email */}
              <div className="text-right">
                <a 
                  href="mailto:buen136003@gmail.com"
                  className="text-gray-500 hover:text-gray-700 transition-colors text-[14px]"
                >
                  buen136003@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Gallery Item Simple Modal */}
      {selectedProject && selectedProject.id.startsWith("gallery-") && (
        <motion.div 
          className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingModal ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.modal }}
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isClosingModal ? 0.9 : 1, opacity: isClosingModal ? 0 : 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: ANIMATION_DURATIONS.modal }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
            
            {/* Image */}
            <div className="relative">
              <img
                src={selectedProject.src}
                alt={selectedProject.alt}
                className="w-full h-auto max-h-[60vh] object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-2`}>{selectedProject.title}</h3>
              <p className={`${FONT_SIZES.body} text-gray-600 mb-4`}>{selectedProject.subtitle}</p>
              <p className={`${FONT_SIZES.small} text-gray-700 leading-relaxed`}>{selectedProject.description}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{selectedProject.client}</span>
                  <span>{selectedProject.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Project Detail Modal - Floating Lightbox Style */}
      {selectedProject && !selectedProject.id.startsWith("gallery-") && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingModal ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.modal, ease: "easeInOut" }}
          onClick={closeModal}
        >
          {/* Navigation Bar - Hidden in lightbox */}
          <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100000] opacity-0 pointer-events-none">
            <div className="bg-gray-100/90 backdrop-blur-md rounded-full px-8 py-3">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
                >
                  About
                </button>
                <button 
                  onClick={() => handleNavigation('work')}
                  className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
                >
                  Work
                </button>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
                >
                  Contact
                </button>
              </div>
            </div>
          </nav>

          <motion.div 
            className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative tracking-tight leading-relaxed overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ 
              scale: isClosingModal ? 0.95 : 1, 
              opacity: isClosingModal ? 0 : 1, 
              y: isClosingModal ? -30 : 0 
            }}
            exit={{ scale: 0.95, opacity: 0, y: -30 }}
            transition={{ duration: ANIMATION_DURATIONS.modalContent, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Custom Scroll Container */}
            <div className="h-full overflow-y-scroll custom-scrollbar">
            {/* Page Header */}
            <div className="px-8 lg:px-16 pb-2 pt-16">
              {/* Back Link */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: ANIMATION_DURATIONS.stagger }}
              >
                <button
                  onClick={closeModal}
                  className="text-sm text-[#58534e] hover:text-[#282623] transition-colors flex items-center gap-1"
                >
                  ← Back To All Work
                </button>
              </motion.div>

              {/* Header Body */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ANIMATION_DURATIONS.stagger * 2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    <h1 className="text-4xl lg:text-5xl text-[#282623] leading-tight mb-0 font-semibold">
                      온·오프라인 실시간 행사<br />
                      /교육 기획·진행
                    </h1>
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
                    <p className="text-[#282623] text-sm tracking-tight leading-relaxed">
                      삼성 그룹의 온·오프라인 실시간 행사/교육 기획·진행 프로젝트를 담당했습니다. 진행과 동시에 콘텐츠 제작 기반의 기술 이슈 대응, 커뮤니케이션을 주도하여 고객 만족도 NPS 4.5+를 달성하고, 온라인 이벤트 콘텐츠는 신규 고객사 5개를 수주했습니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Container */}
            <div className="px-8 lg:px-16 pb-12">
              {/* Project Images Gallery */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ANIMATION_DURATIONS.stagger * 3 }}
              >
                {/* 두 줄 이미지 그리드 */}
                <div className="mb-8">
                  {/* 첫 번째 줄 - 2개 이미지 */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                      <img
                        src={IntegratedOperationImage}
                        alt="온·오프라인 통합 운영 - 대형 강의실에서 진행"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                      <img
                        src={TechSupportImage}
                        alt="현장 기술 대응 - HDMI 분배기 및 장비 설정"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* 두 번째 줄 - 2개 이미지 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                      <img
                        src={OverseasEventImage}
                        alt="해외법인 초청 이벤트 운영 - 국제 비즈니스 프로그램"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                      <img
                        src={OnlineEventImage}
                        alt="온라인 이벤트 기획 - 가상 아바타 활용 이벤트"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <p className="text-sm text-[#58534e] italic">오프라인 교육부터 온라인 이벤트까지 통합 운영</p>
                </div>
              </motion.div>

              {/* Project Details */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ANIMATION_DURATIONS.stagger * 4 }}
              >
                {/* 프로젝트 기간 */}
                <div className="mb-6">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                    프로젝트 기간
                  </h2>
                </div>
                <div className="space-y-5 mb-8">
                  <div>
                    <div className="text-sm text-[#282623] tracking-tight leading-relaxed">
                      전체 기간: 2023.01 ~ 2024.11 (23개월)
                    </div>
                  </div>
                </div>

                {/* 주요 성과 */}
                <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                    주요 성과
                  </h2>
                </div>
                <div className="space-y-5 mb-8">
                  <div>
                    <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 고객 만족도 NPS 4.5+ 달성</h3>
                    <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">30+ 온 오프라인 행사, 교육에서 일관된 고품질 서비스 제공</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 기업 고객사 수주 5개</h3>
                    <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">NH농협, 삼성교육재단, 한국증권 등 온라인 이벤트 프로젝트 수주</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 운영 효율성 개선</h3>
                    <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">자동화 프로그램 도입으로 인력 및 시간 비용 절감</p>
                  </div>
                </div>
                
                {/* 주요 역할 */}
                <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">3</span>
                    주요 역할
                  </h2>
                </div>
                <div className="space-y-5 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">실시간 행사 운영 및 기술 대응</h3>
                    <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                      <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">삼성 그룹 대규모 행사 → 영상, 음향, 송출 등 여러 협력사 동시 작업 → 실시간 기술 이슈 & 출연자 변수 발생</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">협력사 커뮤니케이션</h4>
                        <ul className="text-sm text-[#58534e] space-y-2 tracking-tight leading-relaxed">
                          <li>• 영상: 앵글, 트랜지션 품질 확보</li>
                          <li>• 음향: 밸런스 조정 및 품질 관리</li>
                          <li>• 송출: 실시간 기술 이슈 대응</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">돌발 상황 대응</h4>
                        <ul className="text-sm text-[#58534e] space-y-2 tracking-tight leading-relaxed">
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
                        <ul className="text-sm text-[#58534e] space-y-2 tracking-tight leading-relaxed">
                          <li>• Midjourney, Stable Diffusion ComfyUI 활용</li>
                          <li>• Python , 오픈소스 (Pulid, Ipadater, Flux) 활용 후보정</li>
                          <li>• AI 생성 흔적 최소화 → 실사용급 완성</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">자동화 프로그램 (폐쇄망 환경)</h4>
                        <ul className="text-sm text-[#58534e] space-y-2 tracking-tight leading-relaxed">
                          <li>• Python + OCR 화면 인식 시스템 구축</li>
                          <li>• 화면 인식 기반 영상, 음악 송출 타이밍 자동 제어</li>
                          <li>• 수동 조작 대비 타이밍 오류 90% 감소</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">사용자 몰입 유도를 위한 온라인 콘텐츠 플랫폼 기획</h3>
                    <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                      <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">기존 플랫폼 한계 (임직원 참여 데이터 확보 어려움) → 메타버스 환경에서 자연스러운 몰입 & 참여 유도 필요와 RAW DATA 확보</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">플랫폼 확장 기획</h4>
                        <ul className="text-sm text-[#58534e] space-y-2 tracking-tight leading-relaxed">
                          <li>• 외부 플랫폼 연동·상품화 </li>
                          <li>• 실질적 임직원 참여 RAW 데이터 확보</li>
                          <li>• 현실 조직 공간 반영 맵 디자인</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">데이터 구조 설계</h4>
                        <ul className="text-sm text-[#58534e] space-y-2 tracking-tight leading-relaxed">
                          <li>• SnowFlake 기반 행동 로그 수집</li>
                          <li>• API 연동 구조 협의</li>
                          <li>• 사용자 자율 탐색 유도</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 활용 기술 */}
                <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">4</span>
                    활용 기술
                  </h2>
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

              </motion.div>

            </div>
            
            {/* Bottom padding for scroll */}
            <div className="pb-8"></div>
            </div> {/* Close scroll container */}
            

            
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-10 h-10 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
              onClick={closeModal}
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </motion.div>
        </motion.div>
      )}
      {/* Other Projects - Floating Lightbox Style */}
      {selectedProject && selectedProject.id !== "1" && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingModal ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.modal, ease: "easeInOut" }}
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative tracking-tight leading-relaxed overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ 
              scale: isClosingModal ? 0.95 : 1, 
              opacity: isClosingModal ? 0 : 1, 
              y: isClosingModal ? -30 : 0 
            }}
            exit={{ scale: 0.95, opacity: 0, y: -30 }}
            transition={{ duration: ANIMATION_DURATIONS.modalContent, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Custom Scroll Container */}
            <div className="h-full overflow-y-scroll custom-scrollbar">
            {/* Page Header */}
            <div className="px-8 lg:px-16 pb-2 pt-16">
              {/* Back Link */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: ANIMATION_DURATIONS.stagger }}
              >
                <button
                  onClick={closeModal}
                  className="text-sm text-[#58534e] hover:text-[#282623] transition-colors flex items-center gap-1"
                >
                  ← Back To All Work
                </button>
              </motion.div>

              {/* Header Body */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ANIMATION_DURATIONS.stagger * 2 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    <h1 className="text-4xl lg:text-5xl text-[#282623] leading-tight mb-0 font-semibold">
                      {selectedProject.id === "1" ? "온·오프라인 실시간 행사/교육 기획·진행" :
                       selectedProject.id === "2" ? "프리미엄 콘텐츠 영상 제작" :
                       selectedProject.id === "3" ? "교육 콘텐츠 기획 제작" :
                       selectedProject.id === "4" ? "베트남 인플루언서 프로모션 콘텐츠 제작" :
                       selectedProject.title}
                    </h1>
                  </div>
                </div>

                {/* Header Details */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <h5 className="opacity-50 text-base font-normal mb-2">Categories</h5>
                      <p className="text-sm text-[#282623]">{selectedProject.category}</p>
                    </div>
                    
                    <div>
                      <h5 className="opacity-50 text-base font-normal mb-2">Client</h5>
                      <p className="text-sm text-[#282623]">{selectedProject.client}</p>
                    </div>
                    
                    <div>
                      <h5 className="opacity-50 text-base font-normal mb-2">Role</h5>
                      <p className="text-sm text-[#282623]">
                        {selectedProject.id === "1" ? "기획, 운영, 제작" :
                         selectedProject.id === "2" ? "영상 기획, 연출, 편집" :
                         selectedProject.id === "3" ? "콘텐츠 기획, 제작" :
                         selectedProject.id === "4" ? "프로모션 기획, 운영" :
                         "기획, 운영, 제작"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#282623] text-sm tracking-tight leading-relaxed">
                      {selectedProject.id === "1" 
                        ? "삼성 그룹의 온·오프라인 실시간 행사/교육 기획·진행 프로젝트를 담당했습니다. 진행과 동시에 콘텐츠 제작 기반의 기술 이슈 대응, 커뮤니케이션을 주도하여 고객 만족도 NPS 4.5+를 달성하고, 온라인 이벤트 콘텐츠는 신규 고객사 5개를 수주했습니다."
                        : selectedProject.id === "2"
                        ? "Snapask Korea의 프리미엄 교육 콘텐츠 영상 제작을 담당했습니다. 인하우스 제작 체제 전환으로 제작 예산 40% 절감을 달성하고, 전 제작 과정을 직접 수행하여 본사 의사결정 지연 문제를 해소했습니다."
                        : selectedProject.id === "3"
                        ? "삼성 멀티캠퍼스의 교육 콘텐츠 기획 및 제작을 담당했습니다. 학습자 중심의 교육 설계와 실무 중심 커리큘럼 개발로 교육 만족도를 크게 향상시켰습니다."
                        : selectedProject.id === "4"
                        ? "진에어 베트남 인플루언서 프로모션 콘텐츠 제작 및 운영을 담당했습니다. 현지 문화와 트렌드를 반영한 콘텐츠 기획으로 높은 참여율과 브랜드 인지도 향상을 달성했습니다."
                        : selectedProject.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Container */}
            <div className="px-8 lg:px-16 pb-12">
              {/* Project Images Gallery */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ANIMATION_DURATIONS.stagger * 3 }}
              >
                {/* 프로젝트별 이미지 레이아웃 */}
                {selectedProject.id === "1" && (
                  <>
                    {/* 삼성 프로젝트 - 2x2 그리드 */}
                    <div className="mb-8">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                          <img
                            src={IntegratedOperationImage}
                            alt="온·오프라인 통합 운영 - 대형 강의실에서 진행"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                          <img
                            src={TechSupportImage}
                            alt="현장 기술 대응 - HDMI 분배기 및 장비 설정"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                          <img
                            src={OverseasEventImage}
                            alt="해외법인 초청 이벤트 운영 - 국제 비즈니스 프로그램"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                          <img
                            src={OnlineEventImage}
                            alt="온라인 이벤트 기획 - 가상 아바타 활용 이벤트"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedProject.id !== "1" && (
                  <>
                    {/* 다른 프로젝트들 - 단일 이미지 */}
                    <div className="mb-8">
                      <div className="aspect-[16/9] bg-[#b9b8b6] overflow-hidden rounded-lg">
                        <img
                          src={selectedProject.src}
                          alt={selectedProject.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="text-center mb-8">
                  <p className="text-sm text-[#58534e] italic">
                    {selectedProject.id === "1" 
                      ? "오프라인 교육부터 온라인 이벤트까지 통합 운영"
                      : selectedProject.subtitle}
                  </p>
                </div>
              </motion.div>

              {/* Project Details */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ANIMATION_DURATIONS.stagger * 4 }}
              >
                {/* 프로젝트별 상세 내용 */}
                {selectedProject.id === "1" && (
                  <>
                    {/* 삼성 프로젝트 상세 내용 - 기존과 동일 */}
                    <div className="mb-6">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                        프로젝트 기간
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="text-sm text-[#282623] tracking-tight leading-relaxed">
                        전체 기간: 2023.01 ~ 2024.11 (23개월)
                      </div>
                    </div>
                  </>
                )}

                {selectedProject.id === "2" && (
                  <>
                    {/* Snapask 프로젝트 상세 내용 */}
                    <div className="mb-6">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                        프로젝트 기간
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="text-sm text-[#282623] tracking-tight leading-relaxed">
                        전체 기간: 2022.01 ~ 2022.07 (7개월)
                      </div>
                    </div>

                    {/* 프로젝트 배경 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                        프로젝트 배경
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                          외주 제작에 따른 의사결정 지연, 예산 낭비, 품질 편차 문제를 해결하기 위해 전 공정 인하우스 제작 체계를 구축했습니다. 프리랜서 시절부터 쌓인 기획, 연출, 촬영, 편집, 조명, 미술 경험을 바탕으로 모든 제작 과정을 수행하며 프로덕트를 성공적으로 완수했습니다.
                        </p>
                      </div>
                    </div>

                    {/* 주요 역할 및 기술적 성과 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">3</span>
                        주요 역할 및 기술적 성과
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">기획·연출·촬영·조명·미술(스튜디오 제작 포함) 전 제작 과정 직접 수행</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            전 제작 과정 직접 수행으로 본사 의사결정 지연 문제 해소
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">BMPCC 6K 시네마틱 촬영·스튜디오 세팅, 브랜드 LUT 적용</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            시네마틱 촬영 및 스튜디오 환경 직접 세팅으로 프로모션 영상 품질 향상
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">Python + FFmpeg를 자막 자동 생성 및 오류 검수 시스템 구축</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            대규모 컷편집 반복 작업 효율화로 생산성 향상
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 핵심 성과 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">4</span>
                        핵심 성과
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-bold">40%</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">예산절감</span>
                        </div>
                        <p className="text-sm text-[#58534e]">인하우스 제작체계로 외주 비용절감 및 품질 재투자</p>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">의사결정</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">지연해소</span>
                        </div>
                        <p className="text-sm text-[#58534e]">본사와 우선자의 커뮤니케이션 최소화로 의사숙도 향상</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-bold">10만+</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">조회수 달성</span>
                        </div>
                        <p className="text-sm text-[#58534e]">프로모션 영상 2편 시네마틱 품질로 높은 참여율 달성</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">BP</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">홍콩본사 사례선정</span>
                        </div>
                        <p className="text-sm text-[#58534e]">미술 효과장비 품질 향상 콘텐츠 사례 선정</p>
                      </div>
                    </div>

                    {/* 기술 스택 및 도구 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">5</span>
                        기술 스택 및 도구
                      </h2>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">촬영 및 제작</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• BMPCC 6K 시네마틱 촬영</li>
                            <li>• 스튜디오 조명 시스템 구축</li>
                            <li>• DaVinci Resolve 후반 작업</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">자동화 개발</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• Python 기반 오디오 추출</li>
                            <li>• FFmpeg 자막 생성 시스템</li>
                            <li>• 타임라인 자동 분할 처리</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">품질 관리</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• 브랜드 LUT 커스텀 적용</li>
                            <li>• 시네마틱 컬러 그레이딩</li>
                            <li>• 자동 오류 검수 시스템</li>
                          </ul>
                        </div>
                      </div>
                    </div>


                  </>
                )}

                {selectedProject.id === "3" && (
                  <>
                    {/* 삼성 교육 콘텐츠 프로젝트 */}
                    <div className="mb-6">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                        프로젝트 기간
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="text-sm text-[#282623] tracking-tight leading-relaxed">
                        전체 기간: 2023.05 ~ 2024.03 (11개월)
                      </div>
                    </div>

                    {/* 프로젝트 배경 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                        프로젝트 배경
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                          삼성 멀티캠퍼스 교육 프로그램의 디지털 트랜스포메이션 과정에서 기존 이론 중심 교육의 한계를 극복하고, 실무 중심의 체계적 학습 경험을 제공하기 위해 종합적인 교육 콘텐츠 기획 및 제작 프로젝트를 진행했습니다.
                        </p>
                      </div>
                    </div>

                    {/* 주요 역할 및 기술적 성과 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">3</span>
                        주요 역할 및 기술적 성과
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">교육 콘텐츠 아키텍처 설계</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            학습자 중심의 단계별 커리큘럼 설계 및 인터랙티브 학습 요소 도입
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">멀티미디어 콘텐츠 제작 및 최적화</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            영상, 그래픽, 인터랙티브 요소를 통합한 종합적 학습 경험 구현
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">시스템 통합 및 사용자 경험 최적화</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            LMS 연동 및 학습 성과 추적 시스템 구축으로 교육 효과 극대화
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 핵심 성과 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">4</span>
                        핵심 성과
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-bold">30%</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">학습 효과 향상</span>
                        </div>
                        <p className="text-sm text-[#58534e]">인터랙티브 콘텐츠로 학습자 참여도 및 이해도 대폭 증가</p>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">완료율</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">95% 달성</span>
                        </div>
                        <p className="text-sm text-[#58534e]">체계적 학습 경로 설계로 높은 과정 완료율 달성</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">표준화</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">교육 모듈화</span>
                        </div>
                        <p className="text-sm text-[#58534e]">재사용 가능한 교육 모듈 개발로 확장성 확보</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">기업</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">수강생 만족도</span>
                        </div>
                        <p className="text-sm text-[#58534e]">실무 중심 커리큘럼으로 높은 교육 만족도 및 현업 활용도</p>
                      </div>
                    </div>

                    {/* 기술 스택 및 도구 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">5</span>
                        기술 스택 및 도구
                      </h2>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">교육 설계</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• 학습자 중심 커리큘럼 설계</li>
                            <li>• 단계별 학습 로드맵 구성</li>
                            <li>• 인터랙티브 학습 요소 도입</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">콘텐츠 제작</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• 영상 콘텐츠 기획 및 제작</li>
                            <li>• 그래픽 디자인 및 인포그래픽</li>
                            <li>• 실습 자료 및 과제 개발</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">시스템 통합</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• LMS 시스템 연동</li>
                            <li>• 학습 성과 추적 시스템</li>
                            <li>• 사용자 경험 최적화</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedProject.id === "4" && (
                  <>
                    {/* 진에어 프로젝트 */}
                    <div className="mb-6">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                        프로젝트 기간
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="text-sm text-[#282623] tracking-tight leading-relaxed">
                        전체 기간: 2023.02 ~ 2023.04 (3개월)
                      </div>
                    </div>

                    {/* 프로젝트 배경 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                        프로젝트 배경
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                          진에어의 베트남 시장 진출 과정에서 현지 문화와 소비자 특성을 고려한 차별화된 마케팅 전략이 필요했습니다. 기존 한국식 마케팅 접근법의 한계를 극복하고, 베트남 현지 인플루언서들과의 협업을 통해 브랜드 인지도 향상과 현지 시장 정착을 목표로 한 프로모션 프로젝트를 진행했습니다.
                        </p>
                      </div>
                    </div>

                    {/* 주요 역할 및 기술적 성과 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">3</span>
                        주요 역할 및 기술적 성과
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">현지 문화 맞춤형 콘텐츠 기획</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            베트남 현지 트렌드와 문화적 특성을 반영한 브랜드 메시지 설계 및 실행
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">인플루언서 네트워크 구축 및 협업 체계 수립</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            현지 주요 인플루언서와의 협업 체계 구축 및 콘텐츠 제작 가이드라인 제공
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#282623] mb-2 tracking-tight leading-relaxed">다채널 프로모션 전략 및 성과 측정</h3>
                        <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed">
                            SNS 플랫폼별 특성에 맞는 콘텐츠 배포 및 실시간 효과 측정 시스템 구축
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 핵심 성과 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">4</span>
                        핵심 성과
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-bold">200%</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">참여율 향상</span>
                        </div>
                        <p className="text-sm text-[#58534e]">현지 맞춤 콘텐츠로 기존 대비 200% 이상 참여율 상승</p>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">브랜드</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">인지도 상승</span>
                        </div>
                        <p className="text-sm text-[#58534e]">베트남 시장 내 진에어 브랜드 인지도 크게 개선</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">모델</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">마케팅 사례</span>
                        </div>
                        <p className="text-sm text-[#58534e]">현지 인플루언서 마케팅 성공 모델 케이스 구축</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#282623] rounded-full flex items-center justify-center text-white font-medium text-sm">확장</div>
                          <span className="ml-3 text-lg font-semibold text-[#282623]">시장 기반</span>
                        </div>
                        <p className="text-sm text-[#58534e]">베트남 시장 진출을 위한 마케팅 인프라 구축</p>
                      </div>
                    </div>

                    {/* 기술 스택 및 도구 */}
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">5</span>
                        기술 스택 및 도구
                      </h2>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">콘텐츠 기획</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• 현지 문화 분석 및 트렌드 리서치</li>
                            <li>• 브랜드 메시지 현지화 전략</li>
                            <li>• 크리에이티브 가이드라인 수립</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">SNS 운영</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• 플랫폼별 콘텐츠 최적화</li>
                            <li>• 인플루언서 협업 관리</li>
                            <li>• 실시간 소통 및 피드백 관리</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#282623] mb-3">데이터 분석</h4>
                          <ul className="space-y-2 text-sm text-[#58534e]">
                            <li>• 참여율 및 도달률 분석</li>
                            <li>• 인플루언서 성과 측정</li>
                            <li>• ROI 분석 및 최적화</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}


              </motion.div>
            </div>
            
            {/* Bottom padding for scroll */}
            <div className="pb-8"></div>
            </div> {/* Close scroll container */}
            
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-10 h-10 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
              onClick={closeModal}
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}