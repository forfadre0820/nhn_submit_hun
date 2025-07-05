import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CombinedLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // 3단계 분기 시스템
  // 1단계: 영상이 중앙으로 이동하면서 커지기 (0-800px)
  const videoScale = useTransform(scrollY, [0, 800], [1, 12]);
  const videoX = useTransform(scrollY, [0, 800], [0, -50]); // 중앙으로 이동
  const videoY = useTransform(scrollY, [0, 800], [0, -50]); // 중앙으로 이동
  const videoPosition = useTransform(scrollY, [700, 800], ["static", "fixed"]);
  const videoZIndex = useTransform(scrollY, [700, 800], [1, 9999]);
  
  // 2단계: 전체화면 고정 (800-1600px)
  const fullScreenOpacity = useTransform(scrollY, [800, 900, 1500, 1600], [0, 1, 1, 0]);
  
  // 3단계: 화면과 함께 올라가기 (1600px~)
  const rossSectionY = useTransform(scrollY, [1600, 2000], ["100vh", "0vh"]);

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

      {/* 1단계: McCann Section with Video */}
      <section className="h-screen relative bg-white">
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="text-sm uppercase tracking-[0.5em] mb-4 opacity-75">Nous donnons vie</div>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 text-black">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div>aux idées</div>
                  
                  {/* 16:9 Independent Video Container - 텍스트 사이에 배치 */}
                  <motion.div 
                    className="inline-block relative"
                    style={{
                      scale: videoScale,
                      x: videoX + "%",
                      y: videoY + "%",
                      position: videoPosition,
                      zIndex: videoZIndex,
                      top: "50%",
                      left: "50%",
                      transformOrigin: "center"
                    }}
                  >
                    <div className="w-[200px] h-[113px] relative overflow-hidden rounded-lg bg-black shadow-lg">
                      <video
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        loop
                        playsInline
                        muted
                        autoPlay
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  
                  <div>qui</div>
                </div>
                <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                <div>la vie des gens<span className="text-red-500">.</span></div>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2단계: Video Full Screen Section - 전체화면 고정 */}
      <section className="h-[800px] bg-black relative"></section>

      {/* 2단계: Full Screen Video Fixed Overlay */}
      <motion.div 
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          opacity: fullScreenOpacity
        }}
      >
        <video
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          loop
          playsInline
          muted
          autoPlay
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 3단계: Ross Mason Section - 화면과 함께 올라가기 */}
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