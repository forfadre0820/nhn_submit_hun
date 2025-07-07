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
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  ABOUT 이승훈
                </h3>
                <span className="text-sm font-medium text-gray-500">01</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    콘텐츠 제작자이자 크리에이터를 위한 교육자
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed">
                    시청자의 경험을 최우선으로 생각하며, 메시지 전달을 넘어 
                    깊이 있는 인상을 남기는 콘텐츠를 설계합니다. 
                    창작자들에게 실질적인 도움을 주는 교육 콘텐츠를 제작하고 있습니다.
                  </p>
                </div>

                {/* Right Column - Services */}
                <div className="lg:col-span-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-1">콘텐츠 기획</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        시청자의 니즈를 파악하고 메시지를 효과적으로 전달하는 
                        콘텐츠 구조와 스토리텔링을 설계합니다.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-1">영상 제작</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        기획부터 촬영, 편집까지 일관된 비전으로 완성도 높은 
                        영상 콘텐츠를 제작합니다.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-1">교육 & 멘토링</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        창작자들이 성장할 수 있도록 실무 경험을 바탕으로 한 
                        체계적인 교육과 개별 멘토링을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-2">전문 분야</h5>
                  <p className="text-gray-900 font-medium text-sm">콘텐츠 제작 & 교육</p>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-2">활동 지역</h5>
                  <p className="text-gray-900 font-medium text-sm">대한민국</p>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-2">경력</h5>
                  <p className="text-gray-900 font-medium text-sm">5+ years</p>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-500 mb-2">플랫폼</h5>
                  <p className="text-gray-900 font-medium text-sm">YouTube & 온라인</p>
                </div>
              </div>
            </div>

            {/* Education & Career Section */}
            <div className="mb-16">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  학력 & 경력
                </h3>
                <span className="text-sm font-medium text-gray-500">02</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education Section */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6">학력</h4>
                  <div className="space-y-6">
                    <div className="border-l-2 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base font-medium text-gray-900">디지털미디어학과</h5>
                        <span className="text-sm text-gray-500">2018-2022</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">서울디지털대학교</p>
                      <p className="text-gray-500 text-xs">콘텐츠 제작 및 미디어 기획 전공</p>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base font-medium text-gray-900">영상제작 전문과정</h5>
                        <span className="text-sm text-gray-500">2017</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">한국방송통신대학교 평생교육원</p>
                      <p className="text-gray-500 text-xs">영상 편집 및 후반작업 집중 교육</p>
                    </div>
                  </div>
                </div>

                {/* Career Section */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6">주요 경력</h4>
                  <div className="space-y-6">
                    <div className="border-l-2 border-red-500 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base font-medium text-gray-900">콘텐츠 크리에이터</h5>
                        <span className="text-sm text-gray-500">2020-현재</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">개인 YouTube 채널 운영</p>
                      <p className="text-gray-500 text-xs">교육 콘텐츠 제작 및 창작자 멘토링</p>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base font-medium text-gray-900">프리랜서 영상 제작자</h5>
                        <span className="text-sm text-gray-500">2019-2020</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">다양한 기업 및 개인 프로젝트</p>
                      <p className="text-gray-500 text-xs">브랜드 영상, 교육 콘텐츠, 광고 제작</p>
                    </div>
                    
                    <div className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-base font-medium text-gray-900">영상 편집자</h5>
                        <span className="text-sm text-gray-500">2018-2019</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">미디어 제작사 ㈜크리에이티브스튜디오</p>
                      <p className="text-gray-500 text-xs">TV 프로그램 및 온라인 콘텐츠 후반작업</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications & Skills */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <h5 className="text-base font-medium text-gray-900 mb-3">보유 자격증</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 컴퓨터그래픽스운용기능사</li>
                      <li>• 멀티미디어콘텐츠제작전문가</li>
                      <li>• Adobe Certified Expert (Premiere Pro)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-base font-medium text-gray-900 mb-3">전문 기술</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Adobe Creative Suite (전문가)</li>
                      <li>• Final Cut Pro (고급)</li>
                      <li>• DaVinci Resolve (중급)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-base font-medium text-gray-900 mb-3">언어 능력</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 한국어 (모국어)</li>
                      <li>• 영어 (업무 수준)</li>
                      <li>• 일본어 (기초 회화)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Work Section */}
            <div className="mb-16">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  주요 작업
                </h3>
                <span className="text-sm font-medium text-gray-500">03</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-8">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Portfolio Grid - Flexible Masonry Layout */}
              <div className="portfolio-container relative">
                <div className="grid grid-cols-4 gap-4">
                  {/* Project 1 - Wide horizontal */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer col-span-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">콘텐츠 기획</span>
                        <span className="subtitle block text-sm opacity-80">Strategy & Planning</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 2 - Square */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-green-500 to-teal-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">교육 콘텐츠</span>
                        <span className="subtitle block text-sm opacity-80">Education</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 3 - Tall vertical */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer row-span-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '416px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-orange-500 to-red-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">영상 제작</span>
                        <span className="subtitle block text-sm opacity-80">Video Production</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 4 - Square */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-purple-500 to-pink-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">YouTube 채널</span>
                        <span className="subtitle block text-sm opacity-80">Channel Management</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 5 - Square */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-indigo-500 to-blue-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">브랜드 컨설팅</span>
                        <span className="subtitle block text-sm opacity-80">Brand Strategy</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 6 - Square */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-yellow-500 to-orange-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">워크샵 운영</span>
                        <span className="subtitle block text-sm opacity-80">Workshop</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Row 3: Bottom row */}
                  {/* Project 7 - Wide horizontal */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer col-span-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-red-500 to-pink-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">라이브 스트리밍</span>
                        <span className="subtitle block text-sm opacity-80">Live Content</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project 8 - Square */}
                  <motion.div 
                    className="portfolio-item group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="portfolio-box relative overflow-hidden bg-gray-100 rounded-lg" style={{ height: '200px' }}>
                      <div className="portfolio-image w-full h-full bg-gradient-to-br from-teal-500 to-cyan-600"></div>
                      <div className="portfolio-caption absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="title block text-lg font-medium">디지털 마케팅</span>
                        <span className="subtitle block text-sm opacity-80">Digital Marketing</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  연락하기
                </h3>
                <span className="text-sm font-medium text-gray-500">04</span>
              </div>

              {/* Separator Line */}
              <div className="separator-wrap mb-6">
                <div className="separator-line h-px bg-gray-200"></div>
              </div>

              {/* Image-Text Layout (Flipped) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column - Image */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-400"></div>
                    {/* Placeholder for portrait image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 lg:mt-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    결국, <em className="italic">무엇을</em>, <em className="italic">어떻게</em> 보여줄 것인가
                  </h2>
                  
                  <div className="text-gray-700 text-base leading-relaxed mb-8 space-y-4">
                    <p>
                      기획·연출·촬영·편집·UX까지 모든 공정을 설계해 온 콘텐츠 PD입니다. 
                      라이브 콘텐츠에선 출연자의 긴장을 풀어주는 사전 커뮤니케이션과 키 메시지 카드로 
                      자연스러운 퍼포먼스를 이끌어냈습니다.
                    </p>
                    
                    <p>
                      완성 후에는 시청 패턴과 이탈 지점을 데이터로 분석해 UI·UX 개선안을 제안하며 
                      사용자의 몰입도를 높였습니다. 각 역량을 유기적으로 연결해 사람을 위한 콘텐츠를 제작하겠습니다.
                    </p>
                  </div>
                  
                  <motion.button 
                    className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-base border-b-2 border-transparent hover:border-gray-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    함께 작업하기
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-white py-20 mt-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            {/* Contact Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-4 h-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
              </div>
              <a href="mailto:buen136003@gmail.com" className="text-gray-900 hover:text-gray-600 transition-colors">
                buen136003@gmail.com
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button 
                type="button" 
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ 맨 위로
              </button>
              
              <div className="text-center">
                <p className="text-gray-600 text-sm">Copyright © LEESEUNGHUN 2025</p>
              </div>
              
              <div className="text-gray-600 text-sm">
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
    </div>
  );
}