import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CombinedLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // 더 단순한 스크롤 기반 트랜스폼
  const videoScale = useTransform(scrollY, [0, 400, 800], [1, 8, 15]);
  const videoOpacity = useTransform(scrollY, [0, 700, 900], [1, 1, 0]);
  const videoPosition = useTransform(scrollY, [390, 400], ["static", "fixed"]);
  const videoTop = useTransform(scrollY, [390, 400], ["auto", "50%"]);
  const videoLeft = useTransform(scrollY, [390, 400], ["auto", "50%"]);
  const videoTransform = useTransform(scrollY, [390, 400], ["none", "translate(-50%, -50%)"]);
  const rossSectionY = useTransform(scrollY, [700, 1000], ["100vh", "0vh"]);

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
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 text-black">
                <div className="flex flex-wrap items-baseline justify-center gap-3">
                  <div className="mb-4">aux idées</div>
                  
                  {/* Inline Video */}
                  <motion.div 
                    className="inline-block"
                    style={{
                      scale: videoScale,
                      opacity: videoOpacity,
                      position: videoPosition,
                      top: videoTop,
                      left: videoLeft,
                      transform: videoTransform,
                      transformOrigin: "center",
                      zIndex: 9999
                    }}
                  >
                    <video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      loop
                      playsInline
                      muted
                      autoPlay
                      crossOrigin="anonymous"
                      className="w-[230px] h-[87px] object-cover rounded-lg"
                    />
                  </motion.div>
                  
                  &nbsp;qui
                </div>
                <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                <div>la vie des gens<span className="text-red-500">.</span></div>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer Section */}
      <section className="h-screen bg-black"></section>

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