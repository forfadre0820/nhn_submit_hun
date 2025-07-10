import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FONT_SIZES, SPACING, ANIMATION_DURATIONS } from "../constants/styles";

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
import VRCulturalHeritageImage from "@assets/NISI20180418_0000135162_web_1752090687436.jpg";
import KoreyaHospitalImage from "@assets/4_1752092502620.jpg";
import GalleryBeautyImage from "@assets/image_1752014636911.png";
import PersonalPortfolioImage from "@assets/86639380-814e6f3935db756d97edfc2262f7958ce4cf73d56bd0b605c511f97007163f9c (1)_1752092998931.png";
import GalleryInterviewImage from "@assets/image_1752014659090.png";
import LikelionHackathonImage from "@assets/image_1752092842644.png";
import GalleryMalePortraitImage from "@assets/image_1752014670363.png";
import JinairSurfingDayImage from "@assets/image_1752095977745.png";
import GalleryJinairPromotionImage from "@assets/image_1752014683656.png";

// 3번 프로젝트 새로운 이미지들
import SamsungEducationStudio from "@assets/1_1752108034457.jpg";
import SamsungEducationFilming from "@assets/2_1752108034458.jpg";
import SamsungEducationScreenLife from "@assets/3_1752108034455.jpg";
import SamsungEducationMultiscreen from "@assets/4_1752108034456.jpg";

gsap.registerPlugin(ScrollTrigger);

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
  const [columns, setColumns] = useState<{
    left: PortfolioItem[];
    right: PortfolioItem[];
    center?: PortfolioItem[];
  }>({
    left: [],
    right: [],
    center: [],
  });
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle image load and measure height
  const handleImageLoad = useCallback(
    (id: string, event: React.SyntheticEvent<HTMLImageElement>) => {
      // Use 16:9 aspect ratio for all images
      const containerWidth =
        window.innerWidth <= 768
          ? window.innerWidth - 48 // Mobile: full width minus padding
          : (1152 - 48) / 2; // Desktop: half container width minus gap
      const height = containerWidth * (9 / 16); // 16:9 ratio

      setImageHeights((prev) => ({
        ...prev,
        [id]: height,
      }));
    },
    [],
  );

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

      items.forEach((item) => {
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderColumn = (columnItems: PortfolioItem[]) => (
    <div className="flex flex-col gap-4">
      {columnItems.map((item) => (
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
                <span
                  className={`title block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}
                >
                  {item.title}
                </span>
                <span
                  className={`subtitle block ${FONT_SIZES.small} opacity-90`}
                >
                  {item.subtitle}
                </span>
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
      <div className="flex-1">{renderColumn(columns.left)}</div>

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
  // 프로젝트 모달 상태 - 리팩토링
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);

  // 갤러리 전용 상태
  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<PortfolioItem | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isClosingGallery, setIsClosingGallery] = useState(false);

  // 새로운 프로젝트 모달 핸들러들
  const openProjectModal = (project: PortfolioItem) => {
    console.log("프로젝트 클릭됨:", project.id, project.title);
    setSelectedProject(project);
    setShowProjectModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowProjectModal(false);
      setSelectedProject(null);
      setIsClosingModal(false);
      document.body.style.overflow = 'auto';
    }, 400);
  };

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
      images: [
        SamsungOfflineImage,
        IntegratedOperationImage,
        TechSupportImage,
        OverseasEventImage,
      ],
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
      tools: ["BMPCC 6K", "브랜드 LUT", "Python", "FFmpeg", "DaVinci Resolve", "Premiere Pro", "After Effects"],
      images: [
        "/attached_assets/image_1752122592516.png",
        "/attached_assets/image_1752122595670.png",
        "/attached_assets/image_1752122598334.png",
        "/attached_assets/image_1752122607322.png",
      ],
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
      images: [
        SamsungEducationStudio,
        SamsungEducationFilming,
        SamsungEducationScreenLife,
        SamsungEducationMultiscreen,
      ],
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
      images: [
        JinairPromoImage,
        JinairSurfingDayImage,
        GalleryJinairPromotionImage,
        LikelionHackathonImage,
      ],
    },
  ];

  // Gallery items
  const galleryItems: PortfolioItem[] = [
    {
      id: "gallery-1",
      src: VRCulturalHeritageImage,
      alt: "종로구 문화유산 VR 콘텐츠",
      title: "종로구 문화유산 VR 콘텐츠 기획",
      subtitle: "문화유산의 VR 콘텐츠 제작",
      description:
        "종로구의 문화유산을 가상현실(VR) 기술로 체험할 수 있는 콘텐츠를 기획했습니다. 전통 문화의 디지털 보존과 체험형 콘텐츠를 통해 문화유산의 가치를 확산시키는 프로젝트입니다.",
      category: "VR Content",
      year: "2024",
      client: "종로구청",
      role: "VR 콘텐츠 기획, 제작",
      tools: ["VR Development", "Cultural Research", "3D Modeling"],
      images: [],
    },
    {
      id: "gallery-2",
      src: KoreyaHospitalImage,
      alt: "고려대학교구로병원 사내방송 콘텐츠",
      title: "사내방송 콘텐츠",
      subtitle: "의료진 대상 사내 소통 프로그램",
      description:
        "고려대학교구로병원의 의료진과 직원들을 대상으로 한 사내방송 콘텐츠를 기획하고 제작했습니다. 병원 내 소통과 정보 공유를 위한 전문적인 방송 콘텐츠입니다.",
      category: "Broadcasting Content",
      year: "2024",
      client: "고려대학교구로병원",
      role: "방송 콘텐츠 기획, 제작",
      tools: ["Broadcasting", "Medical Communication", "Video Production"],
      images: [],
    },
    {
      id: "gallery-3",
      src: PersonalPortfolioImage,
      alt: "AI 뷰티 제품 광고",
      title: "개인 포트폴리오",
      subtitle: "AI 뷰티 제품 광고",
      description:
        "ComfyUI, FLUX를 활용하여 제작한 실사형 AI 뷰티 제품 광고 이미지입니다. AI 기술을 통해 자연스러운 모델 표현과 제품 배치를 구현한 개인 포트폴리오 작업입니다.",
      category: "Personal Project",
      year: "2024",
      client: "개인 포트폴리오",
      role: "AI 이미지 생성, 프롬프트 엔지니어링",
      tools: ["ComfyUI", "FLUX", "AI Image Generation"],
      images: [],
    },

    {
      id: "gallery-4",
      src: GalleryInterviewImage,
      alt: "인터뷰 및 대담 현장 촬영",
      title: "인터뷰 프로그램 제작",
      subtitle: "진솔한 대화의 순간",
      description: "자연스러운 인터뷰 분위기를 담은 현장 스냅입니다.",
      category: "Interview Program",
      year: "2024",
      client: "현대 글로비스",
      role: "현장 촬영, 프로그램 제작",
      tools: ["Documentary Style", "Interview Setup"],
      images: [],
    },
    {
      id: "gallery-5",
      src: LikelionHackathonImage,
      alt: "멋쟁이사자처럼 해커톤 홍보영상",
      title: "해커톤 홍보영상 제작",
      subtitle: "개발자 커뮤니티 행사 홍보",
      description:
        "멋쟁이사자처럼 해커톤 행사를 위한 홍보영상을 기획하고 제작했습니다. 개발자 커뮤니티의 열정과 도전 정신을 담아 참가자들의 참여를 유도하는 영상 콘텐츠입니다.",
      category: "Event Promotion",
      year: "2024",
      client: "멋쟁이사자처럼",
      role: "홍보영상 기획, 제작",
      tools: ["Video Production", "Motion Graphics", "Event Marketing"],
      images: [],
    },
    {
      id: "gallery-6",
      src: GalleryMalePortraitImage,
      alt: "개인 포트폴리오",
      title: "개인 포트폴리오",
      subtitle: "",
      description:
        "ComfyUI, FLUX, Python을 활용하여 실사형 제품 광고 이미지를 제작했습니다. 자연스러운 인물 표현과 디테일한 후보정을 통해 실제 촬영과 구분이 어려운 수준의 결과물을 구현했습니다.",
      category: "AI Portrait",
      year: "2024",
      client: "개인 포트폴리오",
      role: "개인 포트폴리오",
      tools: ["ComfyUI", "Python", "Photoshop"],
      images: [],
    },
    {
      id: "gallery-7",
      src: JinairSurfingDayImage,
      alt: "진에어 서핑 데이 프로모션",
      title: "진에어 서핑 데이 프로모션",
      subtitle: "12월 겨울철 서핑 여행 프로모션",
      description: "진에어의 겨울 서핑 여행 프로모션 '서핑 데이'를 위한 영상 콘텐츠를 제작했습니다. 12월 겨울철에도 따뜻한 해변에서 서핑을 즐길 수 있다는 메시지를 전달하며, 항공사 브랜드의 젊고 활동적인 이미지를 강조했습니다.",
      category: "Travel Promotion",
      year: "2024",
      client: "JINAIR",
      role: "시각 콘텐츠 기획, 디자인",
      tools: ["Photoshop", "Illustrator", "Brand Design"],
      images: [],
    },


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
          const easedProgress =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          // Dynamic aspect ratio handling
          const viewportAspectRatio = window.innerWidth / window.innerHeight;

          // Apply square crop for portrait/square viewports
          if (viewportAspectRatio <= 1.0) {
            videoWrap.classList.add("square-crop");
          } else {
            videoWrap.classList.remove("square-crop");
          }

          // Calculate target scale to fit viewport
          const targetScale = Math.max(
            window.innerWidth / 140,
            window.innerHeight / 68,
          );

          const currentScale = 1 + (targetScale - 1) * easedProgress;

          // Add scaling class to remove clip-path
          if (progress > 0.05) {
            videoWrap.classList.add("scaling");
          } else {
            videoWrap.classList.remove("scaling");
          }

          // Apply transforms
          gsap.set(videoWrap, {
            x: x * easedProgress,
            y: y * easedProgress,
            scale: currentScale,
            transformOrigin: "50% 50%",
            zIndex: progress > 0.1 ? 9999 : 1,
            force3D: true,
          });

          // Update video fullscreen state for sound control
          setIsVideoFullscreen(progress >= 0.8);
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

  // 프로젝트 모달 닫기
  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingModal(false);
    }, 400);
  };

  // 갤러리 모달 닫기
  const closeGalleryModal = () => {
    setIsClosingGallery(true);
    setTimeout(() => {
      setSelectedGalleryItem(null);
      setIsClosingGallery(false);
      setCurrentGalleryIndex(0);
    }, 400);
  };

  // 갤러리 라이트박스 열기
  const openGalleryLightbox = (item: PortfolioItem) => {
    const index = galleryItems.findIndex(
      (galleryItem) => galleryItem.id === item.id,
    );
    if (index !== -1) {
      setCurrentGalleryIndex(index);
      setSelectedGalleryItem(item);
      setIsClosingGallery(false);
    }
  };

  // 갤러리 네비게이션
  const navigateGallery = (direction: "prev" | "next") => {
    if (galleryItems.length === 0) return;

    const newIndex =
      direction === "next"
        ? (currentGalleryIndex + 1) % galleryItems.length
        : (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;

    setCurrentGalleryIndex(newIndex);
    setSelectedGalleryItem(galleryItems[newIndex]);
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedGalleryItem) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            navigateGallery("prev");
            break;
          case "ArrowRight":
            e.preventDefault();
            navigateGallery("next");
            break;
          case "Escape":
            e.preventDefault();
            closeGalleryModal();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedGalleryItem, currentGalleryIndex, galleryItems]);

  // Navigation handler with smooth scroll to section
  const handleNavigation = (section: string) => {
    closeModal();
    setTimeout(() => {
      switch (section) {
        case "home":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "about":
          document
            .querySelector(".next")
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "work":
          document
            .querySelector('[data-section="work"]')
            ?.scrollIntoView({ behavior: "smooth" });
          break;
        case "contact":
          document
            .querySelector('[data-section="contact"]')
            ?.scrollIntoView({ behavior: "smooth" });
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
              onClick={() => handleNavigation("home")}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("work")}
              className={`${FONT_SIZES.small} text-gray-700 hover:text-black transition-colors cursor-pointer`}
            >
              Work
            </button>
            <button
              onClick={() => handleNavigation("contact")}
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
              <div className="block text-left" style={{ lineHeight: "1.1" }}>
                메세지를 넘어
              </div>
              <div
                className="block mt-[2px] mb-[2px] pt-[1px] pb-[1px]"
                style={{ lineHeight: "1.1" }}
              >
                {" "}
                시청자의 경험까지
              </div>
              <div
                className="block pt-[0px] pb-[0px] mt-[-4px] mb-[-4px]"
                style={{ lineHeight: "1.1" }}
              >
                설계하는
                <span
                  ref={videoWrapRef}
                  className="hero__videoWrap inline-block relative cursor-pointer"
                  style={{
                    width: "140px",
                    height: "68px",
                    verticalAlign: "baseline",
                    willChange: "transform",
                    marginLeft: "12px",
                    marginRight: "0px",
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
                      borderRadius: "0",
                    }}
                    className="mt-[10px] mb-[10px]"
                  />
                </span>
              </div>
              <div
                className="block pt-[3px] pb-[3px]"
                style={{ lineHeight: "1.1" }}
              >
                콘텐츠 제작자 이승훈 입니다
                <span className="text-pink-500">.</span>
              </div>
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
              className={`${FONT_SIZES.small} ${SPACING.smallGap} transition-colors duration-300 ${isVideoFullscreen ? "text-white" : "text-black/80"}`}
            >
              {isVideoFullscreen ? "Keep to explore" : "Scroll to explore"}
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className={`w-6 h-10 border-2 rounded-full flex justify-center ml-[39px] mr-[39px] transition-colors duration-300 ${isVideoFullscreen ? "border-white/40" : "border-black/30"}`}
            >
              <div
                className={`w-1 h-3 rounded-full mt-2 transition-colors duration-300 ${isVideoFullscreen ? "bg-white/60" : "bg-black/50"}`}
              ></div>
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
                  scale: showSoundControl ? 1 : 0.8,
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
      <section
        className="next bg-white text-black relative z-1 min-h-screen"
        data-section="about"
      >
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
                <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                  ABOUT Hun
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  01
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <motion.h2 
                    className="leading-tight mb-4 font-light text-[#ef4444]"
                    style={{
                      fontFamily: "'Noto Sans', sans-serif",
                      fontSize: "3.5rem",
                      fontWeight: "300",
                      letterSpacing: "0.02em",
                      lineHeight: "1.1",
                      color: "#ef4444",
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    &gt; ALL IN ONE CONTENT<br />CREATOR
                  </motion.h2>
                  <p className="text-gray-700 text-[14px] pt-[8px] pb-[8px] mt-[0px] mb-[0px]">



                  10년 이상의 영상제작 경력을 바탕으로 다수의 공모전, 영화제 출품 및 방송 제작에 참여하며 기획·연출·편집·색보정·사운드 등 제작 전반의 워크플로우를 체계적으로 수행해왔습니다. 다양한 프로젝트를 총괄하며 제작 전 과정에 대한 깊이 있는 이해를 바탕으로 하이앤드 퀄리티의 콘텐츠를 만들 수 있었습니다.</p>
                </div>

                {/* Right Column - Services */}
                <div className="lg:col-span-6">
                  <div className="space-y-6">
                    <div>
                      <h4
                        className={`${FONT_SIZES.body} font-medium text-gray-900 mb-1`}
                      >
                        콘텐츠 기획, 제작
                      </h4>
                      <p
                        className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}
                      >
                        시청자 데이터와 시청환경 분석을 바탕으로 한 전략적
                        기획력과 촬영·편집·조명·미술까지 아우르는 올라운드 제작
                        역량으로 고품질 콘텐츠를 구현하여 제작비 최적화와 브랜드
                        가치 향상을 견인합니다.
                      </p>
                    </div>

                    <div>
                      <h4
                        className={`${FONT_SIZES.body} font-medium text-gray-900 mb-1`}
                      >
                        프로젝트 매니지먼트
                      </h4>
                      <p
                        className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}
                      >
                        콘텐츠 제작 전문성과 IT 기술 활용 능력을 결합해 창작과
                        기술의 경계를 넘나들며, 혁신적인 제작 워크플로우 구축을
                        통해 프로젝트 성과를 극대화합니다.
                      </p>
                    </div>

                    <div>
                      <h4
                        className={`${FONT_SIZES.body} font-medium text-gray-900 mb-1`}
                      >
                        온, 오프라인 콘텐츠 운영
                      </h4>
                      <p
                        className={`text-gray-600 ${FONT_SIZES.small} leading-relaxed`}
                      >
                        라이브 콘텐츠를 직접 운영하며 출연자 관리와 제작 능력을
                        기반으로 한 기술적 이슈 대응을 통해 1년간 NPS 4.5 이상의
                        안정적인 성과를 달성합니다.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    전문 분야
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >콘텐츠 기획, 제작, 운영</p>
                </div>

                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    활동 지역
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >
                    대한민국
                  </p>
                </div>

                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    경력
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >
                    5+ years
                  </p>
                </div>

                <div>
                  <h5
                    className={`${FONT_SIZES.tiny} font-medium text-gray-500 mb-2`}
                  >
                    플랫폼
                  </h5>
                  <p
                    className={`text-gray-900 font-medium ${FONT_SIZES.small}`}
                  >온라인, 오프라인 </p>
                </div>
              </div>
            </div>

            {/* Education & Career Section */}
            <div className={SPACING.sectionGap}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                  Education & Experience
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  02
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education Section */}
                <div>
                  <h4
                    className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}
                  >
                    학력
                  </h4>
                  <div className="space-y-6">
                    <div className="border-l-2 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          상명대학교(서울) 대학원(석사)
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.07 - 휴학중
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        감성공학과
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          상명대학교(서울)
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.07 졸업
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        컴퓨터과학과
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          한국애니메이션고등학교
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2010.06 - 2013.03
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        주전공: 영상연출과 | 부전공: 컴퓨터게임제작과
                      </p>
                    </div>
                  </div>
                </div>

                {/* Career Section */}
                <div>
                  <h4
                    className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}
                  >
                    주요 경력
                  </h4>
                  <div className="space-y-6">
                    <div className="border-l-2 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          삼성 멀티캠퍼스
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.07 - 재직중
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        Professional
                      </p>
                      <div className="text-gray-500 mt-2 text-[14px]">
                        온, 오프라인 콘텐츠 기획 및 제작 총괄, 프로젝트 관리,
                        라이브 콘텐츠 운영, 클라이언트 협력사 관리
                      </div>
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          Snapask Korea
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2022.01 - 2022.07
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        Assistant Production Manager
                      </p>
                      <div className="text-gray-500 mt-2 text-[14px]">
                        홍콩 기반 에듀테크 기업, 콘텐츠 기획·제작, 현장 촬영
                        연출, 콘텐츠 편집·배포
                      </div>
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5
                          className={`${FONT_SIZES.body} font-medium text-gray-900`}
                        >
                          프리랜서
                        </h5>
                        <span className={`${FONT_SIZES.small} text-gray-500`}>
                          2019.01 - 2020.01
                        </span>
                      </div>
                      <p className={`text-gray-600 ${FONT_SIZES.small} mb-1`}>
                        영상 제작·PD/편집자·콘텐츠기획{" "}
                      </p>
                      <div className="text-gray-500 mt-2 text-[14px]">
                        B2B 클라이언트 대상 콘텐츠 기획·연출·제작,
                        촬영·조명·미술, 후반 제작 및 품질관리
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* 스킬/자격/언어 Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className={`${FONT_SIZES.heading} font-bold text-gray-900 mb-6`}>
                  스킬/자격/언어
                </h4>
                
                {/* All Skills Tags Grid */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">ComfyUI</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Asana</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Slack</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">DaVinci Resolve</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Python</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Premier Pro</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Unity</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Photoshop</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Illustrator</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">C#</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Java</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">After Effect</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">정보처리기사</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">정보처리산업기사</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">Adobe Creative Suite</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">기획</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">제작</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">PM</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">OA</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">한국어 (모국어)</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-[14px] font-medium">영어 (업무 수준)</span>
                </div>
              </div>
            </div>

            {/* Featured Work Section */}
            <div className={SPACING.sectionGap} data-section="work">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">
                  MAIN PROJECT
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  03
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Portfolio Grid - 2x2 Larger Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {portfolioItems.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openProjectModal(item)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* 프로젝트 이미지 카드 */}
                    <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[21/9]">
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
                          <span
                            className={`company block ${FONT_SIZES.small} opacity-90 font-medium drop-shadow-lg`}
                          >
                            {item.description.split("\n")[0]}
                          </span>
                          <span
                            className={`content block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}
                          >
                            {item.description.split("\n")[1]}
                          </span>
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
                <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                  VISUAL GALLERY
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  04
                </span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Gallery Grid - Masonry Layout (Pinterest style) */}
              <div className="columns-2 md:columns-4 gap-4 mb-8 space-y-4">
                {galleryItems.map((item, index) => {
                  // 다양한 높이 패턴 생성 (rem 단위 사용) - 높이 증가
                  const heightVariants = [
                    "h-[16rem]",
                    "h-[26rem]",
                    "h-[18rem]",
                    "h-[24rem]",
                    "h-[14rem]",
                    "h-[28rem]",
                    "h-[43rem]",
                  ];
                  const randomHeight =
                    heightVariants[index % heightVariants.length];

                  return (
                    <motion.div
                      key={`gallery-${item.id}`}
                      className={`group cursor-pointer break-inside-avoid mb-4 ${randomHeight}`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openGalleryLightbox(item)}
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
                            <span
                              className={`company block ${FONT_SIZES.small} opacity-90 font-medium drop-shadow-lg`}
                            >
                              {item.client}
                            </span>
                            <span
                              className={`content block ${FONT_SIZES.subheading} font-medium drop-shadow-lg`}
                            >
                              {item.title}
                            </span>
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
                <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">
                  Keep going with you
                </h3>
                <span
                  className={`${FONT_SIZES.small} font-medium text-gray-500`}
                >
                  05
                </span>
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
                      className="font-light mb-4"
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: "300",
                        fontSize: "3.5rem",
                        lineHeight: "1.1",
                        letterSpacing: "0.02em",
                        marginBottom: "4rem",
                        color: "#ef4444",
                      }}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      &gt; AWAYS THINK<br />MAKE BETTER
                    </motion.h3>

                    <div
                      className="text-gray-700 leading-relaxed mb-8"
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      <p className="text-[14px] mb-4 text-[#4b5563] font-normal">저는 제작 역량을 기반으로 기획부터 연출, 촬영, 편집, 사용자 경험까지 모든 과정에서 '무엇을, 어떻게' 보여줄지를 고민해왔습니다.</p>
                      <p className="text-[14px] mb-4 text-[#4b5563] font-normal">심리를 설계하고, 이탈 데이터를 분석해 UI 개선을 제안했으며, AI 툴을 활용해 제작 속도와 품질을 동시에 끌어올렸습니다. 감성과 전략, 창의성과 기술을 넘나들며 종합적인 콘텐츠 구조를 설계하는 콘텐츠 크리에이터로 성장해왔으며, 앞으로도 명확한 메시지를 중심에 둔 콘텐츠를 만들어가겠습니다.</p>
                    </div>

                    <a
                      href="mailto:buen136003@gmail.com"
                      className="inline-block text-gray-900 hover:text-gray-700 transition-colors underline text-[16px] font-light"
                      style={{
                        fontFamily: "'Noto Sans', sans-serif",
                        fontWeight: "400",
                      }}
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
      <footer className="pt-[35px] pb-[35px]">
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
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
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
      {/* Gallery Lightbox Modal */}
      {selectedGalleryItem && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-[999999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingGallery ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.modal }}
          onClick={closeGalleryModal}
        >
          {/* Close Button */}
          <button
            onClick={closeGalleryModal}
            className="absolute top-6 right-6 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("prev");
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            aria-label="Previous image"
            disabled={galleryItems.length <= 1}
          >
            ←
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("next");
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
            aria-label="Next image"
            disabled={galleryItems.length <= 1}
          >
            →
          </button>

          {/* Main Image Container */}
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: isClosingGallery ? 0.9 : 1,
              opacity: isClosingGallery ? 0 : 1,
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: ANIMATION_DURATIONS.modal }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {galleryItems[currentGalleryIndex] && (
              <>
                <img
                  src={galleryItems[currentGalleryIndex].src}
                  alt={galleryItems[currentGalleryIndex].alt}
                  className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                />

                {/* Image Info Overlay - Bottom Left */}
                <div className="absolute bottom-6 left-6 text-white max-w-sm">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-1">
                      {galleryItems[currentGalleryIndex].title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {galleryItems[currentGalleryIndex].client}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {galleryItems[currentGalleryIndex].description}
                    </p>
                  </div>
                </div>

                {/* Image Counter - Bottom Right */}
                <div className="absolute bottom-6 right-6 text-white">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">
                      {currentGalleryIndex + 1} of {galleryItems.length}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      {/* 프로젝트 모달 - 이전 코드 구조 적용 */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative tracking-tight leading-relaxed overflow-hidden">
            <div className="h-full overflow-y-scroll">
              <div className="px-8 lg:px-16 pb-2 pt-16">
                {/* Back 버튼 */}
                <div className="mb-8">
                  <button 
                    onClick={closeProjectModal}
                    className="text-sm text-[#58534e] hover:text-[#282623] transition-colors flex items-center gap-1"
                  >
                    ← Back To All Work
                  </button>
                </div>

                {/* 제목 및 기본 정보 */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                      <h1 className="text-4xl lg:text-5xl text-[#282623] leading-tight mb-0 font-semibold">
                        {selectedProject.title}
                      </h1>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Categories</h5>
                        <p className="text-sm text-[#282623]">콘텐츠 기획·제작</p>
                      </div>
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Client</h5>
                        <p className="text-sm text-[#282623]">{selectedProject.client}</p>
                      </div>
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Role</h5>
                        <p className="text-sm text-[#282623]">{selectedProject.role}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#282623] text-sm tracking-tight leading-relaxed">
                        {selectedProject.id === "1" && "삼성그룹의 다양한 온라인·오프라인 콘텐츠 기획 및 운영을 실행했습니다. 디지털 플랫폼과 오프라인 이벤트를 연계, 자동화 프로세스, AI 그래픽 리소스 고도화를 통해 임직원들 참여도 증대를 달성했으며 1년이 넘는 기간동안 NPS 4.5+ 을 달성하였습니다."}
                        {selectedProject.id === "2" && "Snapask의 프리미엄 교육 콘텐츠를 위한 영상 제작 프로젝트로, 학습 효과를 극대화하는 교육용 영상 콘텐츠를 기획하고 제작했습니다. 사용자 중심의 UX를 고려한 영상 구성과 인터랙티브 요소를 통해 학습 참여도를 높이고 교육 성과를 개선했습니다."}
                        {selectedProject.id === "3" && "삼성물산의 교육 콘텐츠 기획 및 브랜드 전략을 통해 효과적인 교육 메시지 전달을 위한 Screen Life 연출 기법을 활용하여 교육 콘텐츠를 제작하고, 사용자 행동 분석을 통한 맞춤형 교육 전략을 수립했습니다. 경쟁사 대비 30% 높은 단가임에도 불구하고 수주에 성공하여 상업적 가치를 입증했습니다."}
                        {selectedProject.id === "4" && "Jinair의 베트남 인플루언서 프로모션 콘텐츠 제작을 통해 현지 시장에 맞춤화된 마케팅 콘텐츠를 기획하고 제작했습니다. 문화적 특성을 고려한 크리에이티브 전략으로 브랜드 인지도를 높이고 현지 고객들의 관심을 성공적으로 유도했습니다."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 메인 콘텐츠 */}
              <div className="px-8 lg:px-16 pb-12">
                {/* 이미지 갤러리 */}
                <div className="mb-12">
                  <div className="mb-8">
                    {selectedProject.id === "2" ? (
                      <>
                        {/* Snapask 프로젝트 - 더 많은 이미지를 위한 특별 레이아웃 */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {selectedProject.images.slice(0, 4).map((image, index) => (
                            <div key={index} className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                              <img 
                                src={image} 
                                alt={`${selectedProject.title} 이미지 ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                        {/* 추가 이미지들 - 3열 레이아웃 */}
                        {selectedProject.images.length > 4 && (
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {selectedProject.images.slice(4).map((image, index) => (
                              <div key={index + 4} className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                                <img 
                                  src={image} 
                                  alt={`${selectedProject.title} 이미지 ${index + 5}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* 다른 프로젝트들 - 기본 2x2 레이아웃 */
                      (<div className="grid grid-cols-2 gap-4 mb-4">
                        {selectedProject.images.map((image, index) => (
                          <div key={index} className="aspect-[4/3] bg-[#b9b8b6] overflow-hidden rounded-lg">
                            <img 
                              src={image} 
                              alt={`${selectedProject.title} 이미지 ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>)
                    )}
                  </div>
                  <div className="text-center mb-8">
                    <p className="text-sm text-[#58534e] italic">프로젝트 진행 과정 및 결과물</p>
                  </div>
                </div>

                {/* 프로젝트 기간 */}
                <div className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">1</span>
                      프로젝트 기간
                    </h2>
                  </div>
                  <div className="space-y-5 mb-8">
                    <div>
                      <div className="text-sm text-[#282623] tracking-tight leading-relaxed">
                        {selectedProject.id === "1" && "전체 기간: 2023년 9월 ~ 2024년 11월 (14개월)"}
                        {selectedProject.id === "2" && "전체 기간: 2022년 1월 ~ 2022년 7월 (7개월)"}
                        {selectedProject.id === "3" && "전체 기간: 2023.02 ~ 2023.08 (7개월)"}
                        {selectedProject.id === "4" && "전체 기간: 2024.08 ~ 2024.11 (4개월)"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주요 성과 */}
                <div className="mb-12">
                  <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">2</span>
                      주요 성과
                    </h2>
                  </div>
                  <div className="space-y-5 mb-8">
                    {selectedProject.id === "1" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 메타버스 온라인 콘텐츠 성공적인 고객사 수주</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">NH농협, 삼성교육재단 등 5개 주요 고객사 수주 성공</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 혁신적 운영 시스템 구축</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">온오프라인 통합 자동화 시스템과 메타버스 기반 참여 환경 구축 완료</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• AI 기반 자동화 효과</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">Python/OpenCV 자동화를 통한 효율적 운영 체계 확립 및 브랜드 메시지 전달 최적화</p>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "2" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 제작 비용 40% 이상 단축</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">인하우스 제작 프로세스 전과정 직접 수행으로 획기적인 비용 효율성 달성</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 10만+ 조회수 및 홍콩 BP 인증 획득</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">프리미엄 교육 콘텐츠의 시장 반응 검증 및 글로벌 품질 표준 확립</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 프리미엄 교육 콘텐츠 시장 경쟁력 확보</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">시네마틱 품질과 효율성의 완벽한 결합으로 새로운 제작 표준 확립</p>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "3" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 경쟁사 대비 30% 높은 단가로 수주 성공</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">창의적 기법과 사용자 행동 분석의 효과적 결합으로 상업적 가치 입증</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 5초 이내 주의 집중 유도 시스템 구축</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">사용자 행동 분석을 바탕으로 몰입도 극대화 기법 개발</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• Screen Life 포맷 전문성 확립</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">Found Footage 기법과 결합한 차별화된 교육 콘텐츠 제작 방법론 정립</p>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "4" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 브랜드 인지도 52% 향상</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">현지 인플루언서를 통한 브랜드 노출 확대</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 현지 참여도 73% 증가</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">문화적 특성을 반영한 콘텐츠로 참여 증대</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• ROI 180% 달성</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">효과적인 현지화 전략으로 높은 투자 수익률</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 프로젝트 배경 및 전략 */}
                <div className="mb-12">
                  <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">3</span>
                      프로젝트 배경 및 전략
                    </h2>
                  </div>
                  <div className="space-y-5 mb-8">
                    {selectedProject.id === "1" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 프로젝트 시작점</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">온오프라인 분리 문제, 통합 경험 구축, 하이브리드 융합 모델</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 솔루션 설계</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">AI/OpenCV 자동화 시스템, Gather 메타버스 환경, 새로운 브랜드 경험 모델</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 시장 검증</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">NH농협 조합원 교육, 삼성교육재단 플랫폼 운영, 한국출판 하이브리드 행사, 5개 주요 고객사 연이은 의뢰</p>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "2" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 프로젝트 목표</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">외주 제작 한계 극복, 인하우스 제작 체계, 프리미엄 교육 콘텐츠 차별화</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 핵심 전략</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">시네마틱 품질, 제작 효율성, Python 자동화 시스템, 대규모 워크플로우</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 기술적 접근</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">BMPCC 6K 시네마틱 촬영, 브랜드 전용 LUT 설계, FFmpeg 최적화, 50분 5개 클래스 동시 제작</p>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "3" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 사용자 행동 분석 및 대응 전략</h3>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 space-y-4">
                            <p><strong>주요 사용자 행동 패턴:</strong></p>
                            
                            {/* 사용자 행동 패턴 도식 */}
                            <div className="bg-white border border-gray-200 p-8 rounded-lg">
                              <div className="text-center mb-6">
                                <h4 className="text-sm font-medium text-[#282623] mb-2">사용자 집중도 변화 패턴</h4>
                                <p className="text-xs text-[#58534e]">교육 콘텐츠 시청 시간에 따른 집중도 하락 분석</p>
                              </div>
                              
                              <svg width="100%" height="260" viewBox="0 0 700 260" className="overflow-visible">
                                {/* 격자 배경 */}
                                <defs>
                                  <pattern id="grid" width="70" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 70 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                                  </pattern>
                                </defs>
                                <rect width="560" height="160" x="80" y="40" fill="url(#grid)"/>
                                
                                {/* 축 및 레이블 */}
                                <line x1="80" y1="200" x2="640" y2="200" stroke="#374151" strokeWidth="2"/>
                                <line x1="80" y1="200" x2="80" y2="40" stroke="#374151" strokeWidth="2"/>
                                
                                {/* 시간 축 눈금 */}
                                <line x1="150" y1="200" x2="150" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="150" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">1분</text>
                                
                                <line x1="290" y1="200" x2="290" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="290" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">3분</text>
                                
                                <line x1="430" y1="200" x2="430" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="430" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">5분</text>
                                
                                <line x1="570" y1="200" x2="570" y2="205" stroke="#374151" strokeWidth="1"/>
                                <text x="570" y="220" textAnchor="middle" className="text-xs fill-[#6b7280]">7분</text>
                                
                                {/* 집중도 축 눈금 */}
                                <line x1="75" y1="60" x2="80" y2="60" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="65" textAnchor="end" className="text-xs fill-[#6b7280]">100%</text>
                                
                                <line x1="75" y1="100" x2="80" y2="100" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="105" textAnchor="end" className="text-xs fill-[#6b7280]">75%</text>
                                
                                <line x1="75" y1="140" x2="80" y2="140" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="145" textAnchor="end" className="text-xs fill-[#6b7280]">50%</text>
                                
                                <line x1="75" y1="180" x2="80" y2="180" stroke="#374151" strokeWidth="1"/>
                                <text x="70" y="185" textAnchor="end" className="text-xs fill-[#6b7280]">25%</text>
                                
                                {/* 축 레이블 */}
                                <text x="360" y="245" textAnchor="middle" className="text-sm fill-[#374151] font-medium">시간 (분)</text>
                                <text x="30" y="120" textAnchor="middle" className="text-sm fill-[#374151] font-medium" transform="rotate(-90 30 120)">집중도</text>
                                
                                {/* 곡선 - 집중도 하강 패턴 */}
                                <path 
                                  d="M 90 60 Q 140 73 200 90 Q 250 130 320 150 Q 400 170 500 175 Q 550 180 630 180" 
                                  stroke="#ef4444" 
                                  strokeWidth="3" 
                                  fill="none"
                                />
                                
                                {/* 채워진 영역 */}
                                <path 
                                  d="M 90 60 Q 140 73 200 90 Q 250 130 320 150 Q 400 170 500 175 Q 550 180 630 180 L 630 200 L 90 200 Z" 
                                  fill="#ef4444" 
                                  opacity="0.1"
                                />
                                
                                {/* 주요 포인트 도트 */}
                                <circle cx="140" cy="73" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                                <circle cx="200" cy="90" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                                <circle cx="320" cy="150" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                                <circle cx="500" cy="175" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                              </svg>
                            </div>
                            
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                              <h5 className="text-sm font-medium text-[#282623] mb-3">주요 분석 결과</h5>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">1.</span>
                                  <span className="text-[#58534e]">5초 이내 주의 집중 분산, 교육 효과 저하</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">2.</span>
                                  <span className="text-[#58534e]">창 최소화, 멀티태스킹, 학습 방해</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">3.</span>
                                  <span className="text-[#58534e]">참여도 급격 하락, 흥미 상실</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-[#ef4444] font-bold">4.</span>
                                  <span className="text-[#58534e]">반복 교육 회피, 저항 현상</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 맞춤형 교육 전략</h3>
                          <div className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4 space-y-4">
                            <p><strong>Screen Life 솔루션 구조:</strong></p>
                            
                            {/* 솔루션 도식 */}
                            <div className="bg-white border border-gray-200 p-4 rounded-lg">
                              <div className="text-center mb-3">
                                <h4 className="text-sm font-medium text-[#282623] mb-1">Screen Life 솔루션 구조</h4>
                                <p className="text-xs text-[#58534e]">집중도 향상을 위한 4가지 핵심 전략</p>
                              </div>
                              <svg width="100%" height="220" viewBox="0 0 500 220" className="overflow-visible">
                                {/* 중앙 Screen Life 원 */}
                                <circle cx="250" cy="110" r="40" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="2"/>
                                <text x="250" y="107" textAnchor="middle" className="text-sm fill-[#374151] font-medium">Screen</text>
                                <text x="250" y="120" textAnchor="middle" className="text-sm fill-[#374151] font-medium">Life</text>
                                
                                {/* 4개 해결책 박스 */}
                                {/* 몰입도 향상 */}
                                <rect x="50" y="40" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="105" y="58" textAnchor="middle" className="text-xs fill-[#374151] font-medium">몰입도 향상</text>
                                <text x="105" y="72" textAnchor="middle" className="text-xs fill-[#6b7280]">실제 화면 활용</text>
                                <line x1="160" y1="62" x2="210" y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead1)"/>
                                
                                {/* 주의 집중 유도 */}
                                <rect x="340" y="40" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="395" y="58" textAnchor="middle" className="text-xs fill-[#374151] font-medium">주의 집중 유도</text>
                                <text x="395" y="72" textAnchor="middle" className="text-xs fill-[#6b7280]">자동 시스템</text>
                                <line x1="340" y1="62" x2="290" y2="85" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                                
                                {/* 메시지 단순화 */}
                                <rect x="50" y="135" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="105" y="153" textAnchor="middle" className="text-xs fill-[#374151] font-medium">메시지 단순화</text>
                                <text x="105" y="167" textAnchor="middle" className="text-xs fill-[#6b7280]">시각화 처리</text>
                                <line x1="160" y1="157" x2="210" y2="135" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                                
                                {/* 상호작용 증대 */}
                                <rect x="340" y="135" width="110" height="45" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="395" y="153" textAnchor="middle" className="text-xs fill-[#374151] font-medium">상호작용 증대</text>
                                <text x="395" y="167" textAnchor="middle" className="text-xs fill-[#6b7280]">참여도 향상</text>
                                <line x1="340" y1="157" x2="290" y2="135" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
                                
                                {/* 화살표 마커 정의 */}
                                <defs>
                                  <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                  <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                  </marker>
                                </defs>
                                
                                {/* 결과 표시 */}
                                <rect x="200" y="190" width="100" height="25" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1" rx="6"/>
                                <text x="250" y="205" textAnchor="middle" className="text-xs fill-[#374151] font-medium">집중도 개선</text>
                                <line x1="250" y1="150" x2="250" y2="190" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead5)"/>
                                
                                <marker id="arrowhead5" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#374151"/>
                                </marker>
                              </svg>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p className="text-[#282623] font-medium">핵심 전략:</p>
                              <p>- Screen Life 포맷, 몰입도 향상</p>
                              <p>- 자동 주의 집중 유도 시스템</p>
                              <p>- 메시지 단순화, 시각화</p>
                              <p>- 상호작용 요소, 참여도 증대</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 브랜드 메시지 최적화</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">자연스러운 브랜드 통합, 사용자 경험 보호, 교육 효과와 브랜드 인지도 동시 달성, 타겟별 맞춤형 메시지</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 온라인 콘텐츠 운영 (Samsung 프로젝트만) */}
                {selectedProject.id === "1" && (
                  <div className="mb-12">
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">4</span>
                        온라인 콘텐츠 운영
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 온라인 참여자 경험의 혁신</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">능동적 참여 생태계 구축, AI 기반 자동 화질/음성 최적화, 실시간 채팅 모니터링, 멀티 플랫폼 동시 송출</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 지능형 콘텐츠 분석 시스템</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">OpenCV 기반 실시간 영상 분석, 참석자 행동 패턴 파악, 자동 하이라이트 클립 생성, 품질 이슈 사전 감지</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 몰입감 있는 메타버스 공간</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">Gather 플랫폼 브랜드 아이덴티티 반영, 게임형 인터랙션 환경, 자연스러운 탐험과 상호작용</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 오프라인 콘텐츠 운영 (Samsung 프로젝트만) */}
                {selectedProject.id === "1" && (
                  <div className="mb-12">
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">5</span>
                        오프라인 콘텐츠 운영
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 현장과 기술의 완벽한 융합</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">휴먼-테크 조화 환경, 실시간 소통 시스템, 자동화된 장비 모니터링, 비상 상황 대응 체계</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 예측 가능한 성공을 위한 데이터 과학</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">실시간 참여자 행동 데이터 분석, Snowflake 기반 통합 모니터링 대시보드, 자동 알림 및 사전 대응 시스템</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 위기를 기회로 바꾸는 대응 체계</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">탄력적 운영 체계, 실시간 솔루션 제공, 사후 분석 기반 지속적 개선, 학습 중심 프로세스</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 크리에이티브 디렉팅 */}
                <div className="mb-12">
                  <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">{selectedProject.id === "1" ? "6" : "4"}</span>
                      크리에이티브 디렉팅
                    </h2>
                  </div>
                  <div className="space-y-5 mb-8">
                    {selectedProject.id === "1" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 업계 패러다임의 전환점</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">업계 전체 새로운 기준점 설정, 온오프라인 통합 자동화 시스템 구축, 메타버스 B2B 융합 경험 혁신</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 지속 가능한 혁신 모델의 구축</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">확장 가능한 플랫폼 아키텍처 설계, 데이터 기반 실시간 의사결정, 지속 발전 혁신 생태계, 디지털 트랜스포메이션 표준 설정</p>
                        </div>
                      </>
                    )}
                    {selectedProject.id === "2" && (
                      <>

                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 성과 검증</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">10만+ 조회수, 시장 반응 검증, 홍콩 BP 인증, 글로벌 품질 표준</p>
                        </div>


                      </>
                    )}
                    {selectedProject.id === "3" && (
                      <>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• Screen Life 포맷</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">실제 화면 활용 영상 기법, 실제 업무 환경 표현, 사용자 인터페이스 교육, 화면 분할 멀티태스킹 재현, 직관적 몰입 학습</p>
                        </div>
                        <div>
                          <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 시각청각 메시지 전달</h3>
                          <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">화면 애니메이션, 동적 학습 경험, 사운드 효과 활용, 최소 요소 최대 효과, 효율적 커뮤니케이션</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 활용 기술 */}
                <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">{selectedProject.id === "1" ? "7" : "5"}</span>
                    활용 기술
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
                  {selectedProject.id === "1" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">핵심 기술</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Python, OpenCV, AI 기술</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">데이터 인프라</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Snowflake 기반 데이터 웨어하우스<br/>실시간 데이터 파이프라인</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">메타버스 플랫폼</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Gather 기반 게임형 환경<br/>인터랙티브 콘텐츠 시스템</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">스트리밍 기술</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">실시간 스트리밍<br/>멀티 플랫폼 송출</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">자동화 시스템</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Python 기반 워크플로우<br/>모니터링 및 알림 시스템</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">데이터 분석</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">머신러닝 모델 운영<br/>비즈니스 인텔리전스 도구</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "2" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">BMPCC 6K</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">시네마틱 품질 촬영 장비</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">브랜드 LUT</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">전용 컬러 그레이딩 시스템</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Python</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">대규모 편집 워크플로우 자동화</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">FFmpeg</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">오픈소스 비디오 처리 엔진</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">DaVinci Resolve</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">전문 색상 보정 도구</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Premiere Pro</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">영상 편집 및 구성</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">After Effects</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">모션 그래픽 및 합성</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "3" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Found Footage</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Screen Life 기법의 핵심 도구<br/>실제 화면 녹화 및 편집</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Photoshop</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">이미지 편집 및 합성</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">After Effects</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">모션 그래픽 및 애니메이션</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">Premiere Pro</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">영상 편집 및 사운드</div>
                      </div>
                    </>
                  )}
                  {selectedProject.id === "4" && (
                    <>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">영상 제작</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Premiere Pro, Final Cut Pro</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">소셜미디어</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Facebook Creator Studio</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">분석 도구</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Google Analytics</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#282623] tracking-tight leading-relaxed mb-2">디자인 도구</div>
                        <div className="text-sm text-[#58534e] tracking-tight leading-relaxed">Photoshop, Canva</div>
                      </div>
                    </>
                  )}
                </div>

                {/* PM & 성과 (삼성 프로젝트만) */}
                {selectedProject.id === "3" && (
                  <div className="mb-12">
                    <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                      <h2 className="text-base text-[#282623] font-medium mb-4 tracking-tight leading-relaxed">
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-[#282623] text-white text-xs font-bold rounded-full mr-2">6</span>
                        PM & 성과
                      </h2>
                    </div>
                    <div className="space-y-5 mb-8">
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed font-medium">경쟁사 대비 30% 높은 단가임에도 불구하고 수주 성공</h3>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 프로젝트 관리 성과</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">실제 업무 환경을 반영한 효과적인 교육 콘텐츠 제작, 사용자 행동 분석 및 데이터 기반 의사결정, 프로젝트 일정 및 품질 관리 최적화</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 창의적 특성 확립</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">교육 콘텐츠 분야의 차별화된 접근 방식 개발, Screen Life 장르의 전문적 활용 능력 구축, 현실감 있는 교육 환경 구성 노하우 축적, 사용자 경험 중심의 콘텐츠 제작 프로세스 정립</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#282623] mb-2 tracking-tight leading-relaxed">• 주요 경쟁 우위 요소</h3>
                        <p className="text-sm text-[#58534e] tracking-tight leading-relaxed ml-4">사용자 친화적 분석 및 맞춤형 솔루션 제공, 창의적 기법과 사용자 행동 분석의 효과적 결합, 교육 효과와 브랜드 메시지 전달의 균형있는 통합, 지속 가능한 교육 콘텐츠 제작 방법론 구축</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pb-8"></div>
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button 
              onClick={closeProjectModal}
              className="absolute top-6 right-6 w-10 h-10 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
