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

gsap.registerPlugin(ScrollTrigger);

// 통합 프로젝트 데이터 구조
interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  client: string;
  role: string;
  thumbnailImage: string;
  images: string[];
  summary: string;
  sections: ProjectSection[];
}

interface ProjectSection {
  title: string;
  content: React.ReactNode;
}

// 프로젝트 데이터 정의
const projectsData: ProjectData[] = [
  {
    id: "1",
    title: "Samsung 온·오프라인 콘텐츠 기획",
    subtitle: "통합 교육 프로그램 운영",
    description: "SAMSUNG\n온 오프라인 콘텐츠 기획. 운영",
    category: "Event Planning",
    year: "2023-2024",
    client: "삼성 그룹",
    role: "기획, 운영, 제작",
    thumbnailImage: SamsungOfflineImage,
    images: [SamsungOfflineImage, IntegratedOperationImage, TechSupportImage, OverseasEventImage],
    summary: "삼성 멀티캠퍼스의 교육 콘텐츠 기획 및 제작을 담당하여 학습자 중심의 교육 설계와 실제 수업 촬영을 기반으로 한 교육 콘텐츠를 개발했습니다. 효과적인 학습 경험 설계를 통해 교육 만족도를 높이고, 양질의 교육 콘텐츠를 제공했습니다.",
    sections: [
      {
        title: "프로젝트 기간",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-[#282623]">프로젝트 기간: 2023.05 ~ 2024.03 (10개월)</p>
          </div>
        )
      },
      {
        title: "프로젝트 배경",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-[#58534e]">
              삼성 멀티캠퍼스의 교육 콘텐츠 기획 및 제작을 담당하여 학습자 중심의 교육 설계와 
              실제 수업 촬영을 기반으로 한 교육 콘텐츠를 개발했습니다. 
              효과적인 학습 경험 설계를 통해 교육 만족도를 높이고, 양질의 교육 콘텐츠를 제공했습니다.
            </p>
          </div>
        )
      }
    ]
  },
  {
    id: "2", 
    title: "Snapask 프리미엄 콘텐츠 영상 제작",
    subtitle: "교육 콘텐츠 기획 및 제작",
    description: "SNAPASK KOREA\n프리미엄 콘텐츠 영상 제작",
    category: "Content Production",
    year: "2022-2023",
    client: "Snapask Korea",
    role: "콘텐츠 기획, 영상 제작",
    thumbnailImage: SnapaskContentImage,
    images: [SnapaskContentImage, PersonalPortfolioImage, VRCulturalHeritageImage, KoreyaHospitalImage],
    summary: "Snapask Korea의 프리미엄 교육 콘텐츠 제작을 담당하여 학생들의 학습 효과를 극대화하는 고품질 영상 콘텐츠를 개발했습니다. 개인 맞춤형 학습 경험을 제공하여 학습자의 이해도와 참여도를 높이는 것을 목표로 했습니다.",
    sections: [
      {
        title: "프로젝트 기간",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-[#282623]">프로젝트 기간: 2022.03 ~ 2023.02 (12개월)</p>
          </div>
        )
      }
    ]
  },
  {
    id: "3",
    title: "Samsung 교육 콘텐츠 기획 제작",
    subtitle: "기업 교육 프로그램 개발",
    description: "SAMSUNG\n교육형 영상 콘텐츠 기획, 제작",
    category: "Educational Content",
    year: "2023",
    client: "삼성교육재단",
    role: "교육 콘텐츠 기획",
    thumbnailImage: SamsungEducationImage,
    images: [SamsungEducationImage, GalleryInterviewImage, GalleryBeautyImage, GalleryMalePortraitImage],
    summary: "삼성물산의 효과적인 교육 메시지 전달을 위한 Screen Life 연출 기법을 통해 교육 콘텐츠를 제작하고, 사용자 행동 분석을 통한 맞춤형 교육 전략을 수립하였습니다. 5초 이내 주의 집중 분산 등의 사용자 행동 패턴을 분석하여 Screen Life 포맷을 활용한 몰입도 향상 시스템을 구축했습니다.",
    sections: [
      {
        title: "프로젝트 기간",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-[#282623]">프로젝트 기간: 2023년 2월 - 2023년 8월 (6개월)</p>
          </div>
        )
      },
      {
        title: "프로젝트 배경",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-[#58534e]">
              삼성물산의 교육 콘텐츠 기획 및 브랜드 전략을 통해 효과적인 교육 메시지 전달을 위한 
              Screen Life 연출 기법을 통해 교육 콘텐츠를 제작하고, 사용자 행동 분석을 통한 
              맞춤형 교육 전략을 수립하였습니다.
            </p>
          </div>
        )
      },
      {
        title: "주요 역할 및 기술적 성과",
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[#282623] mb-3">사용자 행동 분석 및 대응 전략</h3>
              <div className="border-l-2 border-gray-200 pl-4 py-2 mb-4">
                <p className="text-sm text-[#58534e] font-medium mb-2">주요 사용자 행동 패턴:</p>
                <ul className="text-sm text-[#58534e] ml-4 space-y-1">
                  <li>• 재생 중 창 최소화 및 다른 업무 처리</li>
                  <li>• 교육 콘텐츠에 대한 낮은 참여도</li>
                  <li>• 단순 반복 교육에 대한 회피 현상</li>
                  <li>• 5초 이내 주의 집중 분산</li>
                </ul>
              </div>
              <div className="border-l-2 border-blue-200 pl-4 py-2">
                <p className="text-sm text-[#58534e] font-medium mb-2">맞춤형 교육 전략:</p>
                <ul className="text-sm text-[#58534e] ml-4 space-y-1">
                  <li>• Screen Life 포맷을 활용한 몰입도 향상</li>
                  <li>• 자동 주의 집중 유도 시스템 구축</li>
                  <li>• 복잡한 메시지의 단순화 및 시각화</li>
                  <li>• 상호작용 요소를 통한 참여도 증대</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#282623] mb-3">브랜드 메시지 전달 최적화</h3>
              <div className="border-l-2 border-green-200 pl-4 py-2">
                <ul className="text-sm text-[#58534e] space-y-1">
                  <li>• 교육 콘텐츠 내 자연스러운 브랜드 메시지 통합</li>
                  <li>• 사용자 경험을 해치지 않는 브랜드 노출 전략</li>
                  <li>• 교육 효과와 브랜드 인지도 동시 달성</li>
                  <li>• 타겟 오디언스별 맞춤형 메시지 개발</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#282623] mb-3">크리에이티브 디렉팅 - Screen Life 포맷 활용</h3>
              <div className="border-l-2 border-purple-200 pl-4 py-2">
                <ul className="text-sm text-[#58534e] space-y-1">
                  <li>• 실제 컴퓨터 화면을 활용한 현실감 있는 교육 환경 구성</li>
                  <li>• 사용자 친화적인 인터페이스 설계</li>
                  <li>• 직관적인 학습 경로 제시</li>
                  <li>• 실무 환경과 유사한 교육 시나리오 구현</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#282623] mb-3">시각적 & 청각적 메시지 전달</h3>
              <div className="border-l-2 border-orange-200 pl-4 py-2">
                <ul className="text-sm text-[#58534e] space-y-1">
                  <li>• 화면 애니메이션을 통한 동적 학습 경험 제공</li>
                  <li>• 상황별 적절한 사운드 효과 활용</li>
                  <li>• 최소한의 시각적 요소로 최대 효과 달성</li>
                  <li>• 효율적인 커뮤니케이션 구조 설계</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "핵심 성과",
        content: (
          <div className="space-y-5">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm text-[#282623] mb-2 font-medium">
                🏆 경쟁사 대비 30% 높은 단가임에도 불구하고 수주 성공
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-[#282623] mb-2">프로젝트 관리 성과:</h4>
                <ul className="text-sm text-[#58534e] ml-4 space-y-1">
                  <li>• 실제 업무 환경을 반영한 효과적인 교육 콘텐츠 제작</li>
                  <li>• 사용자 행동 분석 및 데이터 기반 의사결정</li>
                  <li>• 프로젝트 일정 및 품질 관리 최적화</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-[#282623] mb-2">창의적 특성 확립:</h4>
                <ul className="text-sm text-[#58534e] ml-4 space-y-1">
                  <li>• 교육 콘텐츠 분야의 차별화된 접근 방식 개발</li>
                  <li>• Screen Life 장르의 전문적 활용 능력 구축</li>
                  <li>• 현실감 있는 교육 환경 구성 노하우 축적</li>
                  <li>• 사용자 경험 중심의 콘텐츠 제작 프로세스 정립</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#282623] mb-2">주요 경쟁 우위 요소</h4>
              <ul className="text-sm text-[#58534e] space-y-1">
                <li>• 사용자 친화적 분석 및 맞춤형 솔루션 제공</li>
                <li>• 창의적 기법과 사용자 행동 분석의 효과적 결합</li>
                <li>• 교육 효과와 브랜드 메시지 전달의 균형있는 통합</li>
                <li>• 지속 가능한 교육 콘텐츠 제작 방법론 구축</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "기술 스택 및 도구",
        content: (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Found Footage</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Screen Life</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Photoshop</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">After Effects</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Premiere Pro</span>
            </div>
            <p className="text-sm text-[#58534e]">
              Screen Life 포맷과 Found Footage 기법을 결합하여 사용자 몰입도를 극대화하고 
              복잡한 메시지를 효과적으로 전달하였습니다. 체계적인 사용자 행동 분석을 바탕으로 
              5초 이내 주의 집중 유도 기법을 개발하여 교육 효과를 극대화하였습니다.
            </p>
          </div>
        )
      }
    ]
  },
  {
    id: "4",
    title: "Jinair 베트남 인플루언서 프로모션 콘텐츠 제작",
    subtitle: "해외 마케팅 콘텐츠 기획",
    description: "JINAIR\n베트남 인플루언서 홍보 콘텐츠 제작",
    category: "Marketing Content",
    year: "2023",
    client: "Jinair",
    role: "마케팅 콘텐츠 기획",
    thumbnailImage: JinairPromoImage,
    images: [JinairPromoImage, JinairSurfingDayImage, GalleryJinairPromotionImage, LikelionHackathonImage],
    summary: "진에어의 베트남 시장 진출을 위한 인플루언서 마케팅 콘텐츠를 기획하고 제작했습니다. 현지 문화와 트렌드를 반영한 브랜드 메시지 전달을 통해 베트남 소비자들의 진에어 브랜드 인지도 향상과 항공편 이용률 증대를 목표로 했습니다.",
    sections: [
      {
        title: "프로젝트 기간",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-[#282623]">프로젝트 기간: 2023.09 ~ 2023.12 (4개월)</p>
          </div>
        )
      }
    ]
  }
];

// 갤러리 아이템 정의 (기존 유지)
interface GalleryItem {
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
  images: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    src: VRCulturalHeritageImage,
    alt: "종로구 문화유산 VR 콘텐츠",
    title: "종로구 문화유산 VR 콘텐츠 기획",
    subtitle: "문화유산의 VR 콘텐츠 제작",
    description: "종로구의 문화유산을 가상현실(VR) 기술로 체험할 수 있는 콘텐츠를 기획했습니다. 전통 문화의 디지털 보존과 체험형 콘텐츠를 통해 문화유산의 가치를 확산시키는 프로젝트입니다.",
    category: "VR Content",
    year: "2024",
    client: "종로구청",
    role: "VR 콘텐츠 기획, 제작",
    images: [],
  },
  {
    id: "gallery-2",
    src: KoreyaHospitalImage,
    alt: "고려대학교구로병원 사내방송 콘텐츠",
    title: "사내방송 콘텐츠",
    subtitle: "의료진 대상 사내 소통 프로그램",
    description: "고려대학교구로병원의 의료진과 직원들을 대상으로 한 사내방송 콘텐츠를 기획하고 제작했습니다. 병원 내 소통과 정보 공유를 위한 전문적인 방송 콘텐츠입니다.",
    category: "Broadcasting Content",
    year: "2024",
    client: "고려대학교구로병원",
    role: "방송 콘텐츠 기획, 제작",
    images: [],
  },
  {
    id: "gallery-3",
    src: PersonalPortfolioImage,
    alt: "AI 뷰티 제품 광고",
    title: "개인 포트폴리오",
    subtitle: "AI 뷰티 제품 광고",
    description: "AI 기술을 활용한 뷰티 제품 광고 콘텐츠를 제작했습니다. 혁신적인 기술과 아름다운 비주얼을 결합하여 제품의 매력을 효과적으로 전달하는 광고 콘텐츠입니다.",
    category: "Advertisement",
    year: "2024",
    client: "개인 프로젝트",
    role: "광고 콘텐츠 기획, 제작",
    images: [],
  },
  {
    id: "gallery-4",
    src: GalleryInterviewImage,
    alt: "인터뷰 콘텐츠",
    title: "인터뷰 콘텐츠",
    subtitle: "전문가 인터뷰 시리즈",
    description: "다양한 분야의 전문가들을 대상으로 한 인터뷰 콘텐츠를 기획하고 제작했습니다. 전문가의 통찰과 경험을 효과적으로 전달하는 인터뷰 콘텐츠입니다.",
    category: "Interview Content",
    year: "2024",
    client: "미디어 플랫폼",
    role: "인터뷰 콘텐츠 기획, 제작",
    images: [],
  },
  {
    id: "gallery-5",
    src: LikelionHackathonImage,
    alt: "멋쟁이사자처럼 해커톤",
    title: "멋쟁이사자처럼 해커톤",
    subtitle: "기술 해커톤 콘텐츠",
    description: "멋쟁이사자처럼 해커톤 행사의 콘텐츠를 기획하고 제작했습니다. 참가자들의 열정과 창의적인 아이디어를 담은 해커톤 기록 콘텐츠입니다.",
    category: "Event Content",
    year: "2024",
    client: "멋쟁이사자처럼",
    role: "이벤트 콘텐츠 기획, 제작",
    images: [],
  },
  {
    id: "gallery-6",
    src: GalleryBeautyImage,
    alt: "뷰티 포트레이트",
    title: "뷰티 포트레이트",
    subtitle: "전문 뷰티 촬영",
    description: "전문적인 뷰티 포트레이트 촬영을 진행했습니다. 자연스러운 아름다움과 전문적인 기술을 결합하여 고품질의 뷰티 콘텐츠를 제작했습니다.",
    category: "Beauty Content",
    year: "2024",
    client: "뷰티 브랜드",
    role: "뷰티 콘텐츠 기획, 촬영",
    images: [],
  },
  {
    id: "gallery-7",
    src: GalleryMalePortraitImage,
    alt: "남성 포트레이트",
    title: "남성 포트레이트",
    subtitle: "전문 인물 촬영",
    description: "남성 대상의 전문 포트레이트 촬영을 진행했습니다. 개성과 매력을 살린 자연스러운 인물 촬영으로 고품질의 포트레이트 콘텐츠를 제작했습니다.",
    category: "Portrait Content",
    year: "2024",
    client: "개인 클라이언트",
    role: "포트레이트 촬영, 편집",
    images: [],
  },
  {
    id: "gallery-8",
    src: GalleryJinairPromotionImage,
    alt: "진에어 프로모션",
    title: "진에어 프로모션",
    subtitle: "항공사 마케팅 콘텐츠",
    description: "진에어의 프로모션 콘텐츠를 기획하고 제작했습니다. 항공사의 브랜드 이미지와 서비스 품질을 효과적으로 전달하는 마케팅 콘텐츠입니다.",
    category: "Marketing Content",
    year: "2024",
    client: "진에어",
    role: "마케팅 콘텐츠 기획, 제작",
    images: [],
  }
];

export default function CombinedLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showSoundControl, setShowSoundControl] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

  // 상태 관리 (단순화)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [isClosingGallery, setIsClosingGallery] = useState(false);

  // 모달 관리 함수들
  const openProjectModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsClosingModal(false);
  };

  const closeProjectModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingModal(false);
    }, 400);
  };

  const openGalleryModal = (item: GalleryItem) => {
    const index = galleryItems.findIndex(g => g.id === item.id);
    setCurrentGalleryIndex(index);
    setSelectedGalleryItem(item);
    setIsClosingGallery(false);
  };

  const closeGalleryModal = () => {
    setIsClosingGallery(true);
    setTimeout(() => {
      setSelectedGalleryItem(null);
      setIsClosingGallery(false);
    }, 400);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length
      : (currentGalleryIndex + 1) % galleryItems.length;
    setCurrentGalleryIndex(newIndex);
    setSelectedGalleryItem(galleryItems[newIndex]);
  };

  const handleNavigation = (target: string) => {
    if (selectedProject) {
      closeProjectModal();
      setTimeout(() => {
        const element = document.querySelector(`[data-section="${target}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      const element = document.querySelector(`[data-section="${target}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 비디오 관련 함수들
  const toggleVideoSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleVideoClick = () => {
    if (isVideoFullscreen) {
      toggleVideoSound();
    }
  };

  // GSAP 애니메이션 설정
  useEffect(() => {
    const video = videoRef.current;
    const videoWrap = videoWrapRef.current;
    
    if (!video || !videoWrap) return;

    // 비디오 스케일링 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1200vh",
        scrub: 12,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress <= 0.83) {
            // 스케일링 단계 (0 ~ 83%)
            const scaleProgress = progress / 0.83;
            const easeProgress = 1 - Math.pow(1 - scaleProgress, 3);
            
            const videoRect = video.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            const scaleX = Math.max(viewportWidth / videoRect.width, viewportHeight / videoRect.height);
            const scale = 1 + (scaleX - 1) * easeProgress;
            
            const containerRect = videoWrap.getBoundingClientRect();
            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;
            const currentCenterX = containerRect.left + containerRect.width / 2;
            const currentCenterY = containerRect.top + containerRect.height / 2;
            
            const translateX = (centerX - currentCenterX) * easeProgress;
            const translateY = (centerY - currentCenterY) * easeProgress;
            
            gsap.set(video, {
              scale: scale,
              x: translateX,
              y: translateY,
              zIndex: 9999,
              clipPath: `inset(${8 * (1 - easeProgress)}% 0%)`,
            });
            
            setIsVideoFullscreen(easeProgress > 0.5);
            setShowSoundControl(easeProgress > 0.5);
          } else if (progress <= 0.95) {
            // 고정 단계 (83% ~ 95%)
            setIsVideoFullscreen(true);
            setShowSoundControl(true);
          } else {
            // 종료 단계 (95% ~ 100%)
            const exitProgress = (progress - 0.95) / 0.05;
            const cubicEaseProgress = Math.pow(exitProgress, 3);
            
            gsap.set(video, {
              y: -100 * cubicEaseProgress + "vh",
              zIndex: 9999,
            });
            
            setIsVideoFullscreen(false);
            setShowSoundControl(false);
          }
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
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

      {/* 히어로 섹션 */}
      <section ref={heroRef} className="relative h-screen overflow-hidden" data-section="home">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="text-[62px] font-light leading-[1.1] text-black">
              <div>메세지를 넘어</div>
              <div className="flex items-center justify-center gap-4">
                <span>시청자의 경험까지</span>
                <span ref={videoWrapRef} className="inline-block relative">
                  <video
                    ref={videoRef}
                    className="w-[140px] h-[68px] object-cover"
                    style={{ clipPath: 'inset(8% 0%)', verticalAlign: 'middle' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={handleVideoClick}
                  >
                    <source src="/attached_assets/ShowReels_2025_public_1752082844140.mp4" type="video/mp4" />
                  </video>
                </span>
                <span>설계하는</span>
              </div>
              <div>콘텐츠 제작자 이승훈 입니다.</div>
            </div>
          </div>
        </div>

        {/* 사운드 컨트롤 */}
        {showSoundControl && (
          <div className="fixed inset-0 z-[99999] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={toggleVideoSound}
                className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
              >
                {isVideoMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
              </button>
            </div>
          </div>
        )}

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[99999]">
          <div className="flex flex-col items-center text-center">
            <div className="text-sm text-gray-600 mb-2">Keep to explore</div>
            <div className="w-px h-8 bg-gray-400"></div>
          </div>
        </div>

        {/* 전체 화면 비디오 섹션 */}
        <div className="absolute inset-0 pointer-events-none" style={{ height: '150vh' }}>
          <div className="h-full"></div>
        </div>
      </section>

      {/* About 섹션 */}
      <section className="py-20 bg-white" data-section="about">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                EDUCATION & CAREER
              </h3>
              <span className="text-sm font-medium text-gray-500">02</span>
            </div>

            <div className="separator-wrap mb-8">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">교육</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-900">상명대학교 컴퓨터과학과</h5>
                      <p className="text-sm text-gray-600">학사 졸업 (2022.07)</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">상명대학교 대학원 감성공학과</h5>
                      <p className="text-sm text-gray-600">휴학 중</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">한국애니메이션고등학교</h5>
                      <p className="text-sm text-gray-600">영상연출과 (주전공) / 컴퓨터게임제작과 (복수전공)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">경력</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900">삼성 멀티캠퍼스</h5>
                      <p className="text-sm text-gray-600">현재 근무</p>
                      <p className="text-sm text-gray-500">교육 콘텐츠 기획 및 제작</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Snapask Korea</h5>
                      <p className="text-sm text-gray-600">2022 - 2023</p>
                      <p className="text-sm text-gray-500">프리미엄 교육 콘텐츠 제작</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">프리랜서</h5>
                      <p className="text-sm text-gray-600">2021 - 현재</p>
                      <p className="text-sm text-gray-500">영상 제작 및 콘텐츠 기획</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">핵심 역량</h4>
                  <div className="flex flex-wrap gap-3">
                    {['ComfyUI', 'Asana', 'Slack', 'DaVinci Resolve', 'Python', 'Premier Pro', 'Unity', 'Photoshop', 'Illustrator', 'C#', 'Java', 'After Effect', '정보처리기사', '정보처리산업기사', 'Adobe Creative Suite', '기획', '제작', 'PM', 'OA'].map(skill => (
                      <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">언어</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">한국어 (모국어)</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">영어 (업무 수준)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work 섹션 */}
      <section className="py-20 bg-white" data-section="work">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-medium text-red-500 uppercase tracking-wide text-[16px]">
                MAIN PROJECT
              </h3>
              <span className="text-sm font-medium text-gray-500">03</span>
            </div>

            <div className="separator-wrap mb-8">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openProjectModal(project)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[21/9]">
                    <img
                      src={project.thumbnailImage}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="company block text-sm opacity-90 font-medium drop-shadow-lg">
                          {project.description.split("\n")[0]}
                        </span>
                        <span className="content block text-lg font-medium drop-shadow-lg">
                          {project.description.split("\n")[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery 섹션 */}
      <section className="py-20 bg-white" data-section="gallery">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                VISUAL GALLERY
              </h3>
              <span className="text-sm font-medium text-gray-500">04</span>
            </div>

            <div className="separator-wrap mb-8">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openGalleryModal(item)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[4/3]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="company block text-sm opacity-90 font-medium drop-shadow-lg">
                          {item.client}
                        </span>
                        <span className="content block text-sm font-medium drop-shadow-lg">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section className="py-20 bg-white" data-section="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-red-500 uppercase tracking-wide text-[16px] font-semibold">
                COLLABORATION
              </h3>
              <span className="text-sm font-medium text-gray-500">05</span>
            </div>

            <div className="separator-wrap mb-8">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src={ContactWorkspaceImage}
                  alt="Professional workspace"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <motion.h2
                  className="text-4xl lg:text-5xl font-normal text-gray-900 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", lineHeight: "0.9", letterSpacing: "-0.02em" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  I Keep Challenging Myself to Make Good and Meaningful Content
                </motion.h2>
                <p className="text-gray-700 leading-relaxed">
                  콘텐츠 제작자로서 항상 새로운 도전을 통해 의미 있는 콘텐츠를 만들어가고 있습니다. 
                  창의적인 아이디어와 전문적인 기술을 바탕으로 클라이언트의 메시지를 효과적으로 전달하는 것이 저의 목표입니다.
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:buen136003@gmail.com"
                    className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Contact With Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="separator-wrap mb-4">
              <div className="separator-line h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-3 gap-8 items-center text-center">
              <div className="text-left">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-sm"
                >
                  Back to top ↑
                </button>
              </div>
              <div>
                <p className="text-gray-500 text-sm">© LEESEUNGHUN 2025</p>
              </div>
              <div className="text-right">
                <a
                  href="mailto:buen136003@gmail.com"
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  buen136003@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 갤러리 모달 */}
      {selectedGalleryItem && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-[999999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingGallery ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeGalleryModal}
        >
          <button
            onClick={closeGalleryModal}
            className="absolute top-6 right-6 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
          >
            ×
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("prev");
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
          >
            ←
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateGallery("next");
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-[9999999] text-white hover:text-gray-300 transition-all duration-200 text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
          >
            →
          </button>

          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isClosingGallery ? 0.9 : 1, opacity: isClosingGallery ? 0 : 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[currentGalleryIndex].src}
              alt={galleryItems[currentGalleryIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
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
          </motion.div>
        </motion.div>
      )}

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosingModal ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeProjectModal}
        >
          <motion.div
            className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: isClosingModal ? 0.95 : 1, opacity: isClosingModal ? 0 : 1, y: isClosingModal ? -30 : 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full overflow-y-auto">
              <div className="px-8 lg:px-16 pb-2 pt-16">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={closeProjectModal}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                  >
                    ← Back To All Work
                  </button>
                </motion.div>

                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                      <h1 className="text-4xl lg:text-5xl text-gray-900 leading-tight mb-0 font-semibold">
                        {selectedProject.title}
                      </h1>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Categories</h5>
                        <p className="text-sm text-gray-900">{selectedProject.category}</p>
                      </div>
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Client</h5>
                        <p className="text-sm text-gray-900">{selectedProject.client}</p>
                      </div>
                      <div>
                        <h5 className="opacity-50 text-base font-normal mb-2">Role</h5>
                        <p className="text-sm text-gray-900">{selectedProject.role}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {selectedProject.summary}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="px-8 lg:px-16 pb-12">
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg">
                        <img
                          src={selectedProject.images[0]}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg">
                        <img
                          src={selectedProject.images[1]}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg">
                        <img
                          src={selectedProject.images[2]}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-[4/3] bg-gray-200 overflow-hidden rounded-lg">
                        <img
                          src={selectedProject.images[3]}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <p className="text-sm text-gray-600 italic">{selectedProject.subtitle}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {selectedProject.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <div className="mb-6 mt-8 pt-8 border-t border-gray-200">
                        <h2 className="text-base text-gray-900 font-medium mb-4">
                          <span className="inline-flex items-center justify-center w-4 h-4 bg-gray-900 text-white text-xs font-bold rounded-full mr-2">
                            {index + 1}
                          </span>
                          {section.title}
                        </h2>
                      </div>
                      <div className="space-y-5 mb-8">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="px-8 lg:px-16 pb-8">
                <div className="separator-wrap mb-4">
                  <div className="separator-line h-px bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-3 gap-8 items-center text-center">
                  <div className="text-left">
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-sm"
                    >
                      Back to top ↑
                    </button>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">© LEESEUNGHUN 2025</p>
                  </div>
                  <div className="text-right">
                    <a
                      href="mailto:buen136003@gmail.com"
                      className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                      buen136003@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}