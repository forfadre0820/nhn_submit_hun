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
              className={`text-sm mb-4 transition-colors duration-300 ${isVideoFullscreen ? 'text-white' : 'text-black/80'}`}
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
      {/* Footer */}
      <footer className="relative bg-white pt-[0px] pb-[0px] mt-[21px] mb-[21px]">
        <div className="max-w-6xl mx-auto md:pb-50 pt-[0px] pb-[0px]">
          <div className="flex gap-y-5 md:gap-y-0 flex-col md:flex-row items-center md:justify-center text-center md:text-left px-4 pt-[0px] pb-[0px] mt-[11px] mb-[11px]">
            {/* Back to top button */}
            <button 
              type="button" 
              className="text-black md:mr-auto opacity-100 hover:opacity-70 transition-opacity"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ Back to top
            </button>
            
            {/* Time display */}
            <div className="md:ml-auto md:order-last">
              Seoul, KR {new Date().toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </div>
            
            {/* Copyright */}
            <p className="md:order-2 mt-[5px] mb-[5px]">Copyright © 이승훈 2025</p>
          </div>
          
          {/* Logo SVG */}
          <svg 
            viewBox="0 0 160 20" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-auto pointer-events-none"
          >
            <path 
              d="M13.97 5.475c0-3.176-2.339-5.12-6.043-5.12H0v19.053h2.404v-8.295h5.003c2.34 0 3.77.583 3.77 3.435v4.86h2.403v-5.184c0-2.139-.91-3.694-2.534-4.342 1.495-.648 2.924-2.139 2.924-4.407ZM7.537 8.91H2.404V2.429h5.133c2.535 0 3.964 1.102 3.964 3.175 0 2.074-1.494 3.306-3.964 3.306ZM23.701 0c-5.194 0-8.895 4.133-8.895 9.882 0 5.748 3.766 9.881 8.895 9.881 5.13 0 8.896-4.133 8.896-9.881S28.831 0 23.701 0Zm0 17.632c-3.83 0-6.428-3.1-6.428-7.75s2.598-7.75 6.428-7.75c3.831 0 6.429 3.1 6.429 7.75s-2.598 7.75-6.429 7.75ZM43.17 8.953l-3.501-.837c-2.27-.516-3.308-1.417-3.308-2.963 0-1.804 1.816-3.027 4.41-3.027 2.594 0 4.475 1.48 4.604 3.606v.323h2.4v-.323C47.58 2.32 44.727 0 40.77 0c-3.956 0-6.874 2.19-6.874 5.282 0 2.576 1.816 4.38 5.123 5.152l3.243.709c2.464.58 3.566 1.481 3.566 2.963 0 2.125-1.88 3.478-4.863 3.478-3.048 0-5.123-1.74-5.253-4.38v-.322h-2.4v.322c.13 3.929 3.113 6.441 7.717 6.441 4.28 0 7.328-2.319 7.328-5.668-.065-2.512-1.88-4.316-5.188-5.024ZM59.225 8.953l-3.502-.837c-2.27-.516-3.307-1.417-3.307-2.963 0-1.804 1.816-3.027 4.41-3.027 2.593 0 4.474 1.48 4.604 3.606v.323h2.4v-.323C63.634 2.32 60.845 0 56.89 0c-3.955 0-6.874 2.19-6.874 5.282 0 2.576 1.816 4.38 5.124 5.152l3.242.709c2.464.58 3.566 1.481 3.566 2.963 0 2.125-1.88 3.478-4.863 3.478-3.048 0-5.123-1.74-5.253-4.38v-.322h-2.4v.322c.13 3.929 3.114 6.441 7.718 6.441 4.28 0 7.328-2.319 7.328-5.668-.13-2.512-1.946-4.316-5.253-5.024ZM92.755 7.246c.781-2.782.781-4.852 0-6.082C92.235.388 91.388 0 90.346 0 85.854 0 82.6 7.246 80.19 12.55l1.497-5.304c.781-2.847.846-4.852 0-6.082C81.167.388 80.32 0 79.278 0c-4.492 0-7.747 7.181-10.156 12.486L72.572.388 72.117 0l-.065.065c-1.302.905-2.8 1.488-4.427 1.94l-.13.065-.261.906h.26c.912.13 1.498.194 1.693.582.13.259.13.647-.065 1.23l-4.167 14.62h2.084l.65-1.423C70.62 11.257 74.657 2.07 78.238 2.07c.586 0 .976.194 1.236.582.586.906.521 2.847-.325 5.694l-3.19 10.998h2.148l.586-1.23c2.93-6.792 7.032-16.108 10.612-16.108.586 0 .977.194 1.237.582.586.905.521 2.911-.325 5.693l-2.344 8.216c-.325 1.1-.26 1.94.065 2.458.195.324.521.453.912.453 1.237 0 2.93-1.617 5.468-5.24l.13-.194h-1.236l-.196.259c-1.888 2.523-2.8 3.3-3.125 3.364-.065 0-.13-.388.196-1.488l2.669-8.863ZM107.997 17.742c-.065-.065-.13-.452.13-1.613l4.35-15.677-.324-.452-.065.065-.78.58c-.324.258-.714.516-1.103.839-1.04-.968-2.143-1.42-3.507-1.42-5.325 0-10.91 6.517-11.494 13.42C94.879 17.419 96.568 20 99.49 20c2.338 0 4.935-2.129 7.273-6.065l-.585 2c-.454 1.613-.454 2.775-.13 3.29a.928.928 0 0 0 .78.388c1.169 0 2.857-1.677 5.26-5.226l.26-.387h-1.17c-1.558 2.323-2.857 3.613-3.181 3.742Zm-7.533.258c-1.948 0-2.987-2-2.727-5.097.519-5.742 4.61-11.42 8.247-11.42 2.078 0 3.117 1.807 3.312 3.356l-1.43 4.967c-2.791 5.549-5.194 8.194-7.402 8.194ZM127.642 2.253l-.13-.129C126.209.708 124.58 0 122.757 0c-3.321 0-6.643 2.64-6.904 5.536-.195 2.253 1.629 3.477 3.387 4.7 1.824 1.287 3.517 2.446 3.322 4.57-.196 2.318-2.02 3.734-4.69 3.734-2.214 0-3.647-.837-3.842-5.021v-.258l-.912.194-1.237 4.12.065.064c.977 1.352 2.93 2.124 5.21 2.124 3.843 0 7.23-2.768 7.49-6.115.26-2.704-1.954-4.185-3.908-5.472-1.628-1.095-3.191-2.125-3.061-3.734.13-1.803 2.02-3.348 3.973-3.348 1.563 0 2.735 1.352 3.191 3.605l.065.194.977-.194 1.759-2.446ZM137.064 0c-5.156 0-10.77 6.003-11.292 12.136-.392 4.454 2.089 7.746 5.679 7.746 5.287 0 11.031-6.133 11.553-12.33.392-4.389-2.089-7.552-5.94-7.552Zm3.46 7.81c-.522 5.617-4.439 10.716-8.29 10.716-2.741 0-4.373-2.582-4.047-6.455.522-5.616 4.373-10.586 8.29-10.586 2.741 0 4.373 2.517 4.047 6.326ZM158.245 7.222c.78-2.837.78-4.836 0-6.061C157.726.387 156.882 0 155.842 0c-4.419 0-7.733 7.157-10.072 12.445L149.214.387l-.52-.387-.065.064c-1.3.903-2.794 1.484-4.418 1.935l-.13.064-.26.903.26.065c.845.128 1.494.193 1.69.58.13.258.13.645 0 1.225l-4.16 14.572h2.145l.455-1.031c2.989-6.835 7.082-16.185 10.591-16.185.585 0 .975.194 1.3.645.584.903.52 2.902-.325 5.674l-2.34 7.996c-.324 1.096-.26 1.934.065 2.45.196.322.52.451.91.451 1.234 0 2.924-1.612 5.459-5.223l.129-.193h-1.234c-1.755 2.386-2.924 3.546-3.25 3.546-.064 0-.129-.387.196-1.483l2.533-8.833Z" 
              className="fill-current"
            />
          </svg>
        </div>
      </footer>
    </div>
  );
}