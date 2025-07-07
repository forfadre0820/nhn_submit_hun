import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CombinedLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showSoundControl, setShowSoundControl] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

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
          

          
          // Show scroll indicator when near fullscreen
          const indicator = document.getElementById('video-scroll-indicator');
          if (indicator) {
            gsap.set(indicator, { opacity: progress >= 0.9 ? 1 : 0 });
          }
          
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
            <a href="#work" className="text-sm text-gray-700 hover:text-black transition-colors">Work</a>
            <a href="#about" className="text-sm text-gray-700 hover:text-black transition-colors">About</a>
            <a href="#contact" className="text-sm text-gray-700 hover:text-black transition-colors">Contact</a>
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
            className="hero__heading font-bold leading-[1.1] mb-8"
            style={{
              fontSize: "62px",
              lineHeight: "1.1"
            }}
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
                  className="hero__videoWrap inline-block relative"
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-[99999]"
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
              className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center ml-[39px] mr-[39px]"
            >
              <div className="w-1 h-3 bg-black/50 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>



          {/* Video Scroll Indicator */}
          <motion.div 
            id="video-scroll-indicator"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[99999] opacity-0"
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white text-2xl font-light tracking-wider"
            >
              Keep
            </motion.div>
          </motion.div>

          {/* Sound Control Overlay */}
          {isVideoFullscreen && (
            <motion.div 
              className="fixed inset-0 z-[99999] pointer-events-none"
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
              style={{ pointerEvents: 'auto' }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-4 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showSoundControl ? 1 : 0,
                  scale: showSoundControl ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
                onClick={toggleSound}
                style={{ pointerEvents: 'auto' }}
              >
                {isVideoMuted ? (
                  <div className="flex flex-col items-center">
                    <svg 
                      className="w-8 h-8 text-white mb-2" 
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
                    <span className="text-white text-sm">SOUND ON</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg 
                      className="w-8 h-8 text-white mb-2" 
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
                    <span className="text-white text-sm">SOUND OFF</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Next Section - Portfolio */}
      <section className="next bg-white text-black relative z-1 min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main About Section */}
            <div className="mb-12">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  ABOUT 이승훈
                </h3>
                <span className="text-sm font-medium text-gray-500">01</span>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8 pt-6 border-t border-gray-100">
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
            <div className="mb-12">
              <div className="flex justify-between items-start mb-8">
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
            <div className="pt-8 border-t border-gray-200">
              <div className="flex justify-between items-start mb-8">
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