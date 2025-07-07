import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CombinedLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Viewport calculations for video scaling
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const [scrollMultiplier, setScrollMultiplier] = useState(1);
  
  useEffect(() => {
    const updateDimensions = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      setViewportDimensions({
        width: newWidth,
        height: newHeight
      });
      
      // Adjust scroll multiplier based on viewport size for consistency
      const baseViewport = { width: 1920, height: 1080 };
      const widthRatio = newWidth / baseViewport.width;
      const heightRatio = newHeight / baseViewport.height;
      const avgRatio = (widthRatio + heightRatio) / 2;
      setScrollMultiplier(Math.max(0.5, Math.min(2, avgRatio)));
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate scale needed to fill viewport with better aspect ratio handling
  const baseWidth = 230;
  const baseHeight = 87;
  const aspectRatio = baseWidth / baseHeight;
  const viewportAspectRatio = viewportDimensions.width / viewportDimensions.height;
  
  // Use proper scaling for viewport coverage
  let finalScale;
  if (viewportAspectRatio > aspectRatio) {
    // Viewport is wider than video, scale to fill width
    finalScale = viewportDimensions.width / baseWidth;
  } else {
    // Viewport is taller than video, scale to fill height
    finalScale = viewportDimensions.height / baseHeight;
  }
  
  const viewportScale = Math.max(finalScale, 1);

  // Position calculations for perfect centering
  const finalPosition = {
    x: -50, // Center horizontally
    y: -50  // Center vertically
  };

  // Calculate scroll points based on viewport multiplier for consistency
  const getScrollPoint = (basePoint: number) => basePoint * scrollMultiplier;
  
  // Dynamic scroll animation with variable speed and viewport-responsive scaling
  const finalViewportScale = viewportScale * 0.97; // 97% of viewport size
  
  const videoTransform = useTransform(scrollY, 
    [
      0,     // 시작
      100,   // 빠른 시작
      300,   // 조금 더 빠르게
      600,   // 속도 증가
      1000,  // 중간 속도
      1200,  // 느려지기 시작
      1400,  // 더 느리게
      1600,  // 매우 느리게
      1800,  // 거의 정지
      2000,  // 중심으로 이동 시작
      2200,  // 빠르게 확대
      2400,  // 풀스크린 도달
      2600,  // 풀스크린 유지
      2800,  // 위로 이동 시작
      3000,  // 사라짐
      3200   // 완전히 사라짐
    ], 
    [
      "translate(0px, 0px) scale(1)",
      "translate(0px, 0px) scale(1.2)", 
      "translate(0px, 0px) scale(1.5)",
      "translate(0px, 0px) scale(2.0)",
      "translate(0px, 0px) scale(2.8)",
      "translate(0px, 0px) scale(3.5)",
      "translate(0px, 0px) scale(4.2)",
      "translate(0px, 0px) scale(5.0)",
      `translate(-10%, -10%) scale(6.0)`,
      `translate(-30%, -30%) scale(${finalViewportScale * 0.6})`,
      `translate(-45%, -45%) scale(${finalViewportScale * 0.8})`,
      `translate(-50%, -50%) scale(${finalViewportScale})`,
      `translate(-50%, -50%) scale(${finalViewportScale})`,
      `translate(-50%, -80%) scale(${finalViewportScale})`,
      `translate(-50%, -120%) scale(${finalViewportScale})`,
      `translate(-50%, -150%) scale(${finalViewportScale})`
    ]
  );

  const videoPosition = useTransform(scrollY, [1999, 2000], ["static", "fixed"]);
  const videoZIndex = useTransform(scrollY, [1999, 2000], [1, 9999]);
  const videoTop = useTransform(scrollY, [1999, 2000], ["auto", "50%"]);
  const videoLeft = useTransform(scrollY, [1999, 2000], ["auto", "50%"]);
  const videoOpacity = useTransform(scrollY, [3000, 3100, 3200], [1, 0.5, 0]);

  const scrollIndicatorOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.3, 0]);
  
  const rossMasonTransform = useTransform(scrollY, 
    [2800, 2900, 3000, 3100, 3200, 3300, 3400], 
    ["translateY(100vh)", "translateY(80vh)", "translateY(60vh)", "translateY(40vh)", "translateY(20vh)", "translateY(5vh)", "translateY(0vh)"]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* McCann Hero Section */}
      <section className="min-h-screen bg-white text-black relative overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          {/* Navigation */}
          <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/10 backdrop-blur-md rounded-full px-8 py-4">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-black hover:text-gray-600 transition-colors font-medium">Work</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors font-medium">About</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors font-medium">Contact</a>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col justify-center items-center min-h-screen text-center mt-[-91px] mb-[-91px] pl-[0px] pr-[0px]">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <div className="block text-[62px] text-left">메세지를 넘어</div>
                <div className="block text-left text-[62px]">시청자의 경험까지</div>
                {/* Video Element positioned between text lines */}
                <div className="flex justify-center my-4">
                  <motion.div
                    className="inline-block relative"
                    style={{
                      width: "230px",
                      maxHeight: "87px",
                      height: "87px",
                      padding: "0px",
                      transform: videoTransform,
                      position: videoPosition,
                      zIndex: videoZIndex,
                      top: videoTop,
                      left: videoLeft,
                      willChange: "transform, position",
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                      filter: "blur(0px)", // 애니메이션 중 blur 방지
                      isolation: "isolate" // 레이어 분리로 튀는 현상 방지
                    }}
                  >
                    <motion.video
                      src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        height: "87px",
                        width: "230px",
                        objectFit: "cover",
                        objectPosition: "center",
                        opacity: videoOpacity,
                        borderRadius: "4px",
                        willChange: "opacity, transform",
                        backfaceVisibility: "hidden",
                        transformOrigin: "center center",
                        WebkitTransform: "translateZ(0)", // GPU 가속 강제
                        transform: "translateZ(0)", // GPU 가속 강제
                        contain: "layout style paint" // 렌더링 최적화
                      }}
                      className="mt-[-4px] mb-[-4px] ml-[-105px] mr-[-105px]" />
                  </motion.div>
                </div>
                <div className="block text-left text-[62px]">설계하는</div>
                <div className="block text-[62px]">콘텐츠 제작자 이승훈 입니다<span className="text-pink-500">.</span></div>
              </div>
            </motion.h1>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              style={{
                opacity: scrollIndicatorOpacity
              }}
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
        </div>
      </section>
      {/* Full Screen Video Section */}
      <section className="h-[500vh] relative">
        {/* This creates space for the video scaling animation - 동적 스크롤 속도에 맞춘 공간 */}
      </section>
      {/* Ross Mason Portfolio Section */}
      <motion.section 
        className="bg-white text-black relative z-20 min-h-screen"
        style={{
          transform: rossMasonTransform
        }}
      >
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
                  ABOUT ROSS MASON
                </h3>
                <span className="text-sm font-medium text-gray-500">01</span>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Column - Main Description */}
                <div className="lg:col-span-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                    3D artist & educator focused on creative development.
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Currently creating premium 3D tutorials and educational content, 
                    helping artists master modern 3D workflows and techniques through 
                    comprehensive online courses.
                  </p>
                </div>

                {/* Right Column - Services */}
                <div className="lg:col-span-6">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">3D Design</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Creating stunning 3D visuals and animations using industry-standard 
                        software like Cinema 4D, Blender, and advanced rendering engines.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Education</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Teaching modern 3D techniques through detailed tutorials, courses, 
                        and mentorship programs for artists at all skill levels.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Motion Graphics</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Specializing in dynamic motion design and visual effects that 
                        bring stories to life through compelling animation and design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-100">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">Expertise</h5>
                  <p className="text-gray-900 font-medium">3D Art & Education</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">Based in</h5>
                  <p className="text-gray-900 font-medium">London, UK</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">Experience</h5>
                  <p className="text-gray-900 font-medium">10+ years</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-4">Platform</h5>
                  <p className="text-gray-900 font-medium">Patreon Creator</p>
                </div>
              </div>
            </div>

            {/* Featured Work Section */}
            <div className="mb-20">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  FEATURED WORK
                </h3>
                <span className="text-sm font-medium text-gray-500">02</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Tutorial Cards */}
                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium">3D Modeling Tutorial</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Advanced Cinema 4D</h4>
                  <p className="text-gray-600 text-sm">Master professional 3D modeling techniques</p>
                </motion.div>

                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium">Rendering Tutorial</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Octane Rendering</h4>
                  <p className="text-gray-600 text-sm">Create photorealistic renders with Octane</p>
                </motion.div>

                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <span className="text-white font-medium">Animation Tutorial</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Motion Design</h4>
                  <p className="text-gray-600 text-sm">Dynamic animations and motion graphics</p>
                </motion.div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="pt-16 border-t border-gray-200">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">
                  GET IN TOUCH
                </h3>
                <span className="text-sm font-medium text-gray-500">03</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Ready to learn 3D mastery?
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Join thousands of artists who have transformed their 3D skills 
                    through comprehensive tutorials and personalized guidance.
                  </p>
                  <motion.button 
                    className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Learning
                  </motion.button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Patreon</h4>
                    <p className="text-gray-600">
                      Access exclusive tutorials, project files, and community support
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">YouTube</h4>
                    <p className="text-gray-600">
                      Free tutorials and behind-the-scenes content
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Instagram</h4>
                    <p className="text-gray-600">
                      Daily inspiration and work-in-progress updates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}