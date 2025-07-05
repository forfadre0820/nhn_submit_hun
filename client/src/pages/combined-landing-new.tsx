import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CombinedLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // 비디오 스케일 애니메이션 (웹페이지 100% 크기까지만, 더 빠른 확대)
  const videoScale = useTransform(scrollY, [0, 200, 400, 600], [1, 2, 4, 6]);
  
  // 비디오 중앙 정렬을 위한 변환 (더 극적으로 왼쪽 이동)
  const videoTransformX = useTransform(scrollY, [0, 150, 300, 450, 600], ["0%", "-15%", "-35%", "-45%", "-50%"]);
  const videoTransformY = useTransform(scrollY, [0, 150, 300, 450, 600], ["0%", "-10%", "-25%", "-40%", "-50%"]);
  
  // 비디오 포지션 (더 빠른 고정)
  const videoPosition = useTransform(scrollY, [400, 500], ["static", "fixed"]);
  const videoTop = useTransform(scrollY, [400, 500], ["auto", "50%"]);
  const videoLeft = useTransform(scrollY, [400, 500], ["auto", "50%"]);
  const videoZIndex = useTransform(scrollY, [400, 500], [1, 9999]);
  
  // 비디오 투명도 및 종료 애니메이션
  const videoOpacity = useTransform(scrollY, [0, 800, 1000], [1, 1, 0]);
  
  // Ross Mason 섹션 진입 애니메이션
  const rossSectionY = useTransform(scrollY, [1200, 1600], ["100vh", "0vh"]);
  
  // 스크롤 표시기  
  const scrollIndicatorOpacity = useTransform(scrollY, [400, 500, 800, 900], [0, 1, 1, 0]);
  const scrollIndicatorY = useTransform(scrollY, [400, 900], [0, -50]);

  return (
    <div className="bg-white text-black" ref={containerRef}>
      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-3 shadow-lg">
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Agence</a>
              <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Creations</a>
            </nav>
            
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Equipe</a>
              <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* McCann Section with Video */}
      <section className="h-screen relative bg-white">
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="text-sm uppercase tracking-[0.5em] mb-4 opacity-75">Nous donnons vie</div>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 text-black relative">
                <div className="mb-4 relative flex items-baseline">
                  <span className="relative z-10">aux idées</span>
                  <motion.span
                    className="inline-block ml-4"
                    style={{
                      position: videoPosition,
                      top: videoTop,
                      left: videoLeft,
                      opacity: videoOpacity,
                      transformOrigin: "center",
                      zIndex: videoZIndex,
                      x: videoTransformX,
                      y: videoTransformY,
                      scale: videoScale,
                      verticalAlign: "baseline"
                    }}
                  >
                    <video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      loop
                      playsInline
                      muted
                      autoPlay
                      crossOrigin="anonymous"
                      className="w-[230px] h-[87px] object-cover block"
                    />
                  </motion.span>
                </div>
                <div className="mb-4 relative z-10">transforment <sup className="text-sm">(vraiment)</sup></div>
                <div className="relative z-10">la vie des gens<span className="text-red-500">.</span></div>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Section */}
      <section className="h-[200vh] bg-black relative">
        {/* 스크롤 표시기 */}
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-50"
          style={{
            opacity: scrollIndicatorOpacity,
            y: scrollIndicatorY
          }}
        >
          <div className="text-sm mb-2 opacity-75">스크롤 계속</div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-12 bg-white opacity-50 mb-2"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Ross Mason Section */}
      <motion.div 
        className="bg-white text-black relative z-20 min-h-screen"
        style={{
          y: rossSectionY
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight">
              SELF <em>INTRODUCTION</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Personal Story</h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  I'm a passionate 3D artist and educator dedicated to sharing the magic of digital creation. 
                  Through detailed tutorials and creative projects, I help aspiring artists master the tools 
                  and techniques needed to bring their visions to life.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Services</h3>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    3D Design & Modeling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Motion Graphics
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Art Direction
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Educational Content
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Master of Fine Arts</h4>
                    <p className="text-gray-600">Digital Media Arts, 2018</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bachelor of Arts</h4>
                    <p className="text-gray-600">Graphic Design, 2015</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Senior 3D Artist</h4>
                    <p className="text-gray-600">Creative Studio, 2020-Present</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Motion Graphics Designer</h4>
                    <p className="text-gray-600">Digital Agency, 2018-2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}