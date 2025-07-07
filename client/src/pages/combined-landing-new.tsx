import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CombinedLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!heroRef.current || !videoWrapRef.current || !videoRef.current) return;

    const hero = heroRef.current;
    const videoWrap = videoWrapRef.current;
    const video = videoRef.current;

    // Calculate scale and position for fullscreen video
    const calculateTransform = () => {
      const box = videoWrap.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      const scaleX = vw / box.width;
      const scaleY = vh / box.height;
      const scale = Math.max(scaleX, scaleY);
      
      // Calculate translation to center the video
      const translateX = (vw / 2) - (box.left + box.width / 2);
      const translateY = (vh / 2) - (box.top + box.height / 2);
      
      return { scale, translateX, translateY };
    };

    // Create ScrollTrigger animation
    ScrollTrigger.create({
      trigger: hero,
      start: "top center",
      end: "+=300%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const { scale, translateX, translateY } = calculateTransform();
        
        // Interpolate scale and position based on scroll progress
        const currentScale = 1 + (scale - 1) * progress;
        const currentX = translateX * progress;
        const currentY = translateY * progress;
        
        gsap.set(videoWrap, {
          scale: currentScale,
          x: currentX,
          y: currentY,
          transformOrigin: "center center",
          force3D: true
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white text-black overflow-x-hidden">
      {/* Hero Section with Text Masking */}
      <section 
        ref={heroRef}
        className="hero min-h-screen flex items-center justify-center relative bg-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="hero__heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: "1.1"
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-2">
              <div className="block">메세지를 넘어</div>
              <div className="block">시청자의 경험까지</div>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="whitespace-nowrap">설계하는</span>
                {/* Video Element with Text Masking */}
                <span 
                  ref={videoWrapRef}
                  className="hero__videoWrap inline-block relative"
                  style={{
                    width: "230px",
                    height: "87px",
                    verticalAlign: "middle",
                    willChange: "transform"
                  }}
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
                  />
                </span>
              </div>
              <div className="block">콘텐츠 제작자 이승훈 입니다<span className="text-pink-500">.</span></div>
            </div>
          </motion.h1>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-black/80 text-sm mb-4"
            >
              Scroll to explore
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-black/50 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Next Section - Ross Mason Portfolio */}
      <section className="next bg-white text-black relative z-20 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          {/* About Header */}
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main About Section */}
            <div className="mb-20">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  ABOUT 이승훈
                </h3>
                <span className="text-sm font-medium text-gray-500">01</span>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                    콘텐츠 제작자이자 크리에이터를 위한 교육자
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    시청자의 경험을 최우선으로 생각하며, 메시지 전달을 넘어 
                    깊이 있는 인상을 남기는 콘텐츠를 설계합니다. 
                    창작자들에게 실질적인 도움을 주는 교육 콘텐츠를 제작하고 있습니다.
                  </p>
                </div>

                {/* Right Column - Services */}
                <div className="lg:col-span-6">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">콘텐츠 기획</h4>
                      <p className="text-gray-600 leading-relaxed">
                        시청자의 니즈를 파악하고 메시지를 효과적으로 전달하는 
                        콘텐츠 구조와 스토리텔링을 설계합니다.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">영상 제작</h4>
                      <p className="text-gray-600 leading-relaxed">
                        기획부터 촬영, 편집까지 일관된 비전으로 완성도 높은 
                        영상 콘텐츠를 제작합니다.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">교육 & 멘토링</h4>
                      <p className="text-gray-600 leading-relaxed">
                        창작자들이 성장할 수 있도록 실무 경험을 바탕으로 한 
                        체계적인 교육과 개별 멘토링을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-100">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">전문 분야</h5>
                  <p className="text-gray-900 font-medium">콘텐츠 제작 & 교육</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">활동 지역</h5>
                  <p className="text-gray-900 font-medium">대한민국</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">경력</h5>
                  <p className="text-gray-900 font-medium">5+ years</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">플랫폼</h5>
                  <p className="text-gray-900 font-medium">YouTube & 온라인</p>
                </div>
              </div>
            </div>

            {/* Featured Work Section */}
            <div className="mb-20">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  주요 작업
                </h3>
                <span className="text-sm font-medium text-gray-500">02</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Content Cards */}
                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium">콘텐츠 기획</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">체계적인 콘텐츠 설계</h4>
                  <p className="text-gray-600 text-sm">시청자 중심의 콘텐츠 기획과 구조 설계</p>
                </motion.div>

                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium">교육 콘텐츠</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">창작자 교육</h4>
                  <p className="text-gray-600 text-sm">실무 중심의 체계적인 교육 프로그램</p>
                </motion.div>

                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <span className="text-white font-medium">영상 제작</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">영상 콘텐츠</h4>
                  <p className="text-gray-600 text-sm">고품질 영상 제작과 편집</p>
                </motion.div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="pt-16 border-t border-gray-200">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  연락하기
                </h3>
                <span className="text-sm font-medium text-gray-500">03</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    함께 만들어가는 콘텐츠
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    시청자에게 의미 있는 경험을 전달하는 콘텐츠를 함께 만들어보세요. 
                    기획부터 제작까지 전 과정을 지원합니다.
                  </p>
                  <motion.button 
                    className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    협업 문의하기
                  </motion.button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">YouTube</h4>
                    <p className="text-gray-600">
                      교육 콘텐츠와 창작 과정을 공유하는 메인 채널
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">이메일</h4>
                    <p className="text-gray-600">
                      협업 문의와 개별 상담을 위한 연락처
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">SNS</h4>
                    <p className="text-gray-600">
                      일상과 작업 과정을 공유하는 소통 창구
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}