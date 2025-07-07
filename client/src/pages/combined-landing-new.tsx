import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CombinedLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Viewport calculations for video scaling
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate scale needed to fill viewport
  const baseWidth = 230;
  const baseHeight = 87;
  const scaleX = viewportDimensions.width / baseWidth;
  const scaleY = viewportDimensions.height / baseHeight;
  const viewportScale = Math.max(scaleX, scaleY, 1);

  // Position calculations for centering
  const finalPosition = {
    x: ((viewportDimensions.width - baseWidth) / 2 - baseWidth / 2) / baseWidth * 100,
    y: ((viewportDimensions.height - baseHeight) / 2 - baseHeight / 2) / baseHeight * 100
  };

  // Scroll-based transforms
  const videoTransform = useTransform(scrollY, 
    [0, 200, 400, 600, 800, 1000, 1200, 1400], 
    [
      "translate(0px, 0px) scale(1)",
      "translate(0px, 0px) scale(1.5)", 
      "translate(0px, 0px) scale(2.5)",
      "translate(0px, 0px) scale(4)",
      `translate(0px, 0px) scale(${Math.min(6, viewportScale)})`,
      `translate(-50%, -50%) scale(${viewportScale})`,
      `translate(${finalPosition.x}%, ${finalPosition.y * 0.5}%) scale(${viewportScale})`,
      `translate(${finalPosition.x}%, ${finalPosition.y}%) scale(${viewportScale})`
    ]
  );

  const videoPosition = useTransform(scrollY, [999, 1000], ["static", "fixed"]);
  const videoZIndex = useTransform(scrollY, [999, 1000], [1, 9999]);
  const videoTop = useTransform(scrollY, [999, 1000], ["auto", "50%"]);
  const videoLeft = useTransform(scrollY, [999, 1000], ["auto", "50%"]);
  const videoOpacity = useTransform(scrollY, [1400, 1600], [1, 0]);

  const scrollIndicatorOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const rossMasonTransform = useTransform(scrollY, 
    [1200, 1300, 1400, 1500, 1600, 1700], 
    ["translateY(100vh)", "translateY(80vh)", "translateY(60vh)", "translateY(30vh)", "translateY(10vh)", "translateY(0vh)"]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* McCann Hero Section */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          {/* Navigation */}
          <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-8 py-4">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">Work</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">About</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">Contact</a>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col justify-center items-center min-h-screen text-center">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="block">메세지를 넘어</span>
              <span className="block flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                <span className="whitespace-nowrap">시청자의 경험까지</span>
                {/* Video Element */}
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
                      border: "2px solid rgba(255, 255, 255, 0.8)",
                      borderRadius: "0"
                    }}
                  />
                </motion.div>
                <span className="whitespace-nowrap">설계하는</span>
              </span>
              <span className="block">콘텐츠 제작자 이승훈 입니다.</span>
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
                className="text-white/80 text-sm mb-4"
              >
                Scroll to explore
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Screen Video Section */}
      <section className="h-[300vh] relative">
        {/* This creates space for the video scaling animation */}
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