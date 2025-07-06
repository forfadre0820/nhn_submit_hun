import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CombinedLanding() {
  const { scrollY } = useScroll();
  const [animationStarted, setAnimationStarted] = useState(false);

  // 스크롤 구성 설정
  const SCROLL_CONFIG = {
    VIDEO_START: 0,
    VIDEO_SCALE_END: 400,
    VIDEO_FIXED_START: 300,
    VIDEO_FIXED_END: 600,
    VIDEO_EXIT_START: 600,
    VIDEO_EXIT_END: 800,
    ROSS_SECTION_START: 400,
    SCROLL_INDICATOR_FADE: 100
  };

  // 비디오 변환 애니메이션
  const videoTransform = useTransform(
    scrollY,
    [0, 150, 300, 400, 500, 600],
    [
      "translate(-50%, -50%) scale(1)",
      "translate(-50%, -50%) scale(2)",
      "translate(-50%, -50%) scale(4)",
      "translate(-50%, -50%) scale(6)",
      "translate(-50%, -50%) scale(8)",
      "translate(-50%, -50%) scale(10)"
    ]
  );

  const videoPosition = useTransform(
    scrollY,
    [0, 300, 600, 800],
    ["static", "fixed", "fixed", "absolute"]
  );

  const videoZIndex = useTransform(
    scrollY,
    [0, 300, 600, 800],
    [1, 9999, 9999, 1]
  );

  const videoTop = useTransform(
    scrollY,
    [0, 300, 600, 800],
    ["auto", "50%", "50%", "-100vh"]
  );

  const videoLeft = useTransform(
    scrollY,
    [0, 300, 600, 800],
    ["auto", "50%", "50%", "50%"]
  );

  const videoOpacity = useTransform(
    scrollY,
    [0, 300, 700, 800],
    [1, 1, 1, 0]
  );

  // 스크롤 인디케이터 애니메이션
  const scrollIndicatorOpacity = useTransform(
    scrollY,
    [0, SCROLL_CONFIG.SCROLL_INDICATOR_FADE],
    [1, 0]
  );

  // Ross Mason 섹션 애니메이션
  const rossSectionY = useTransform(
    scrollY,
    [SCROLL_CONFIG.ROSS_SECTION_START, 600, 800],
    ["100vh", "0vh", "0vh"]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white text-black">
      {/* McCann Section */}
      <section className="relative" style={{ height: "200vh" }}>
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

        {/* Hero Section with Video */}
        <div className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12">
                <div className="mb-4">Dites bonjour</div>
                <div className="mb-4 flex items-center justify-center flex-wrap">
                  <span>aux idées&nbsp;</span>
                  
                  {/* 비디오 컨테이너 - 수정된 부분 */}
                  <motion.div
                    className="inline-block relative"
                    style={{
                      width: "230px",
                      height: "87px",
                      position: videoPosition,
                      zIndex: videoZIndex,
                      top: videoTop,
                      left: videoLeft,
                      transform: videoTransform,
                      transformOrigin: "center center"
                    }}
                  >
                    <motion.video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      loop
                      playsInline
                      muted
                      autoPlay
                      crossOrigin="anonymous"
                      style={{
                        width: "230px",
                        height: "87px",
                        objectFit: "cover",
                        opacity: videoOpacity,
                        border: "2px solid rgba(255, 255, 255, 0.8)",
                        borderRadius: "0"
                      }}
                    />
                  </motion.div>
                  
                  <span>&nbsp;qui</span>
                </div>
                <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                <div>la vie des gens<span className="text-red-500">.</span></div>
              </h1>
            </motion.div>
          </div>
        </div>
        
        {/* 스크롤 인디케이터 - 수정된 부분 */}
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-sm text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm mb-2"
          >
            Scroll to explore
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
            className="w-6 h-10 border-2 border-white bg-black/30 rounded-full mx-auto relative backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Ross Mason Section */}
      <motion.section
        className="relative z-10 bg-white"
        style={{
          transform: useTransform(scrollY, [400, 600, 800], ["translateY(100vh)", "translateY(0vh)", "translateY(0vh)"])
        }}
      >
        <motion.div 
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            {/* Main Title */}
            <div className="mb-16">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold uppercase leading-tight"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                3D ARTIST
              </motion.h2>
              <motion.h2 
                className="text-4xl md:text-6xl font-light italic leading-tight"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                passionate
              </motion.h2>
            </div>

            {/* About Teaching Section - Compact Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                    alt="Ross Mason"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight mb-6">
                  ABOUT<br />TEACHING
                </h3>
              </motion.div>

              <motion.div 
                className="lg:col-span-9"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold uppercase mb-4">
                      FROM STUDYING GRAPHIC DESIGN TO <em className="italic font-light">becoming</em> A SELF <em className="italic font-light">taught</em> 3D ARTIST
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-3">[PERSONAL STORY]</h5>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        I remember first opening Cinema 4D back in 2011(-ish) when I was just a little teen. Who would've thought over 10 years later it would've turned into a career? Along the way, I studied Graphic Design, worked as a Motion Designer, a 3D Visualiser, and eventually, turned to the life of a Freelance 3D Artist.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-3">Forever learning.</h5>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Over the years, I've had the pleasure to work with some great agencies and clients, learning from some of the greats and slowly but surely honing my craft. Over recent years, I decided to give back to the very community I learnt from - making short tutorials on YouTube, before shifting to Patreon for the more premium and longer-form content.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm mt-3">
                        I now like to strike a balance between working with great people whilst passing on my knowledge to those just getting into the industry.
                      </p>
                    </div>
                  </div>
                  
                  {/* Compact Professional Resume Information */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">[CONTACT INFO]</h5>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700 font-medium">Ross Mason</p>
                          <p className="text-gray-600">3D Artist & Motion Designer</p>
                          <p className="text-gray-600">London, UK</p>
                          <p className="text-gray-600">ross@example.com</p>
                          <p className="text-gray-600">+44 7xxx xxx xxx</p>
                        </div>
                      </div>
                      
                      {/* Education */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">[EDUCATION]</h5>
                        <div className="space-y-3 text-sm">
                          <div>
                            <h6 className="font-medium text-gray-900">BA Graphic Design</h6>
                            <p className="text-xs text-gray-600">University of Arts London</p>
                            <p className="text-xs text-gray-500">2010 - 2014</p>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-900">Self-taught 3D Artist</h6>
                            <p className="text-xs text-gray-600">Cinema 4D, Blender, Maya</p>
                            <p className="text-xs text-gray-500">2011 - Present</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Languages */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">[LANGUAGES]</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700">English</span>
                            <span className="text-xs text-gray-500">Native</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">French</span>
                            <span className="text-xs text-gray-500">Fluent</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Spanish</span>
                            <span className="text-xs text-gray-500">Basic</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Professional Experience, Skills & Awards */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Experience & Skills */}
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-xs font-medium text-gray-500 mb-4 uppercase tracking-wide">[PROFESSIONAL EXPERIENCE]</h5>
                          <div className="space-y-4 text-sm">
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <h6 className="font-medium text-gray-900">Senior 3D Artist & Content Creator</h6>
                                <span className="text-xs text-gray-500">2020 - Present</span>
                              </div>
                              <p className="text-xs text-gray-600">Freelance / Patreon</p>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <h6 className="font-medium text-gray-900">3D Visualiser</h6>
                                <span className="text-xs text-gray-500">2018 - 2020</span>
                              </div>
                              <p className="text-xs text-gray-600">Creative Agency London</p>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <h6 className="font-medium text-gray-900">Motion Designer</h6>
                                <span className="text-xs text-gray-500">2015 - 2018</span>
                              </div>
                              <p className="text-xs text-gray-600">Digital Studio UK</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Technical Skills - Compact */}
                        <div>
                          <h5 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">[TECHNICAL SKILLS]</h5>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">3D Software</h6>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Cinema 4D</span>
                                  <span className="text-gray-500">Expert</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Blender</span>
                                  <span className="text-gray-500">Advanced</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Maya</span>
                                  <span className="text-gray-500">Intermediate</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">Rendering & Post</h6>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Octane Render</span>
                                  <span className="text-gray-500">Expert</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Redshift</span>
                                  <span className="text-gray-500">Advanced</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-700">After Effects</span>
                                  <span className="text-gray-500">Expert</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Awards */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 mb-4 uppercase tracking-wide">[AWARDS & RECOGNITION]</h5>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h6 className="font-medium text-gray-900">Best Motion Graphics</h6>
                              <p className="text-xs text-gray-600">Creative Awards London</p>
                            </div>
                            <span className="text-xs text-gray-500">2019</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h6 className="font-medium text-gray-900">Featured Artist</h6>
                              <p className="text-xs text-gray-600">3D Artist Magazine</p>
                            </div>
                            <span className="text-xs text-gray-500">2020</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h6 className="font-medium text-gray-900">Top Creator</h6>
                              <p className="text-xs text-gray-600">Patreon Platform</p>
                            </div>
                            <span className="text-xs text-gray-500">2021</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Services Section - Compact */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="lg:col-span-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xs uppercase tracking-wide text-gray-600 mb-6">[Services list]</h4>
                
                <div className="space-y-3">
                  <motion.div 
                    className="group cursor-pointer opacity-75 hover:opacity-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <h3 className="text-xl md:text-2xl font-bold uppercase transition-opacity">
                        3D DESIGN
                      </h3>
                      <span className="ml-3 text-xs text-gray-500">01.</span>
                    </div>
                    <div className="h-px bg-gray-200 transition-colors duration-300 mt-1"></div>
                  </motion.div>

                  <motion.div 
                    className="group cursor-pointer opacity-75 hover:opacity-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <h3 className="text-xl md:text-2xl font-bold uppercase transition-opacity">
                        ART DIRECTION
                      </h3>
                      <span className="ml-3 text-xs text-gray-500">02.</span>
                    </div>
                    <div className="h-px bg-gray-200 transition-colors duration-300 mt-1"></div>
                  </motion.div>

                  <motion.div 
                    className="group cursor-pointer opacity-75 hover:opacity-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <h3 className="text-xl md:text-2xl font-bold uppercase transition-opacity">
                        ANIMATION
                      </h3>
                      <span className="ml-3 text-xs text-gray-500">03.</span>
                    </div>
                    <div className="h-px bg-gray-200 transition-colors duration-300 mt-1"></div>
                  </motion.div>
                  
                  <motion.div 
                    className="group cursor-pointer opacity-75 hover:opacity-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <h3 className="text-xl md:text-2xl font-bold uppercase transition-opacity">
                        ANIMATION
                      </h3>
                      <span className="ml-3 text-xs text-gray-500">04.</span>
                    </div>
                    <div className="h-px bg-gray-200 transition-colors duration-300 mt-1"></div>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-base font-medium mb-3">Bring your ideas to life</p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Pushing beyond reality and creating visuals beyond physicality, 3D allows us to explore and create without boundaries. Whether it's product visualization, architectural renders, or abstract art, I help bring your vision to reality that would be impossible in the real world.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div 
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-lg h-full min-h-[350px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="3D Design work example"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}