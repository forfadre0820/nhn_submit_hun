import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function CombinedLanding() {
  const { scrollY } = useScroll();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [viewportScale, setViewportScale] = useState(10);
  const [finalPosition, setFinalPosition] = useState({ x: -50, y: -200 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    // Calculate viewport scale and final position for fullscreen video
    const calculateScaleAndPosition = () => {
      const videoWidth = 230;
      const videoHeight = 87;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate scale to fit viewport
      const scaleX = viewportWidth / videoWidth;
      const scaleY = viewportHeight / videoHeight;
      
      // Use scaleX (width-based) as the primary scale
      const finalScale = scaleX;
      setViewportScale(Math.max(finalScale, Math.min(8, scaleX)));
      
      // Calculate final position based on viewport size
      // 최종 목표 포지션을 뷰포트 크기에 맞춰 계산
      const finalYPosition = -200 - (finalScale * 2); // 스케일이 클수록 더 위로
      setFinalPosition({ x: -50, y: finalYPosition });
    };

    calculateScaleAndPosition();
    
    const handleResize = () => {
      calculateScaleAndPosition();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  // Latest works images data
  const latestWorks = [
    {
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-blue-100 to-blue-200",
      span: ""
    },
    {
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-gray-100 to-gray-200",
      span: ""
    },
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1600",
      bg: "from-orange-100 to-orange-200",
      span: "row-span-2"
    },
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-green-100 to-green-200",
      span: ""
    },
    {
      image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-pink-100 to-pink-200",
      span: ""
    },
    {
      image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-yellow-100 to-yellow-200",
      span: ""
    },
    {
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-blue-100 to-blue-200",
      span: ""
    }
  ];

  return (
    <div className="bg-white text-black scroll-smooth">
      {/* McCann Section */}
      <section className="min-h-[100vh] relative">
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
        <div className="relative home__video" style={{ height: "50vh" }}>
          <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="sentence relative">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12">
                    <div className="mb-4">Dites bonjour</div>
                    <div className="mb-4 home__hero__line">
                      <div className="sentence">
                        aux idées&nbsp;
                        <motion.div 
                          className="pin-spacer"
                          style={{
                            order: 0,
                            placeSelf: "auto",
                            gridArea: "auto",
                            zIndex: 1,
                            float: "none",
                            flexShrink: 1,
                            display: "inline-block",
                            margin: "0px",
                            inset: "auto",
                            position: "relative",
                            flexBasis: "auto",
                            overflow: "visible",
                            boxSizing: "border-box",
                            width: "230px",
                            height: "87px",
                            padding: "0px"
                          }}
                        >
                          <motion.div 
                            className="home__hero__video"
                            data-cursor="sound on"
                            data-cursor-click="sound off"
                            style={{
                              translate: "none",
                              rotate: "none",
                              inset: "0px auto auto 0px",
                              margin: "0px",
                              maxWidth: "230px",
                              width: "230px",
                              maxHeight: "87px",
                              height: "87px",
                              padding: "0px",
                              transform: useTransform(scrollY, 
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
                              ),
                              position: useTransform(scrollY, [999, 1000], ["static", "fixed"]),
                              zIndex: useTransform(scrollY, [999, 1000], [1, 9999]),
                              top: useTransform(scrollY, [999, 1000], ["auto", "50%"]),
                              left: useTransform(scrollY, [999, 1000], ["auto", "50%"]),
                              opacity: useTransform(scrollY, [1400, 1600], [1, 0]),
                              transformOrigin: "center"
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
                                top: "0px",
                                left: "0px",
                                height: "87px",
                                width: "230px",
                                objectFit: "cover",
                                objectPosition: "center",
                                opacity: useTransform(scrollY, [1400, 1600], [1, 0]),
                                border: "2px solid rgba(255, 255, 255, 0.8)",
                                borderRadius: "0"
                              }}
                            />
                          </motion.div>
                        </motion.div>
                        &nbsp;qui
                      </div>
                    </div>
                    <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                    <div>la vie des gens<span className="text-red-500">.</span></div>
                  </h1>
                </div>
              </motion.div>
              
              {/* Scroll Indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{
                  opacity: useTransform(scrollY, [0, 400], [1, 0])
                }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-sm text-gray-600 mb-2"
                >
                  Scroll to explore
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
                  className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative"
                >
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-1 h-3 bg-gray-400 rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ross Mason Section */}
      <motion.div 
        className="bg-white text-black relative z-20"
        style={{
          transform: useTransform(scrollY, [1200, 1300, 1400, 1500, 1600, 1700], ["translateY(100vh)", "translateY(80vh)", "translateY(60vh)", "translateY(30vh)", "translateY(10vh)", "translateY(0vh)"])
        }}
      >
        {/* About Section - Ross Mason Style */}
        <motion.div 
          className="py-4 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6 md:px-8">
            {/* Main Title - Proper Template Sizing */}
            <div className="mb-16 md:mb-20">
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold uppercase leading-[0.85] mb-6 tracking-tight"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                3D ARTIST
              </motion.h1>
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light italic leading-[0.9] tracking-wide"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                passionate
              </motion.h2>
            </div>

            {/* About Teaching Section - Template Style */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
              <motion.div 
                className="lg:col-span-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-8">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                    alt="Ross Mason"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.9] mb-10 tracking-wide">
                  ABOUT<br />TEACHING
                </h3>
              </motion.div>

              <motion.div 
                className="lg:col-span-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  <div>
                    <h4 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase mb-8 tracking-wide leading-[0.95]">
                      FROM STUDYING GRAPHIC DESIGN TO <em className="italic font-light">becoming</em> A SELF <em className="italic font-light">taught</em> 3D ARTIST
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                      <h5 className="text-base md:text-lg font-medium text-gray-500 mb-6 uppercase tracking-widest">[PERSONAL STORY]</h5>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">
                        I remember first opening Cinema 4D back in 2011(-ish) when I was just a little teen. Who would've thought over 10 years later it would've turned into a career? Along the way, I studied Graphic Design, worked as a Motion Designer, a 3D Visualiser, and eventually, turned to the life of a Freelance 3D Artist.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-base md:text-lg font-medium text-gray-500 mb-6 uppercase tracking-widest">Forever learning.</h5>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl">
                        Over the years, I've had the pleasure to work with some great agencies and clients, learning from some of the greats and slowly but surely honing my craft. Over recent years, I decided to give back to the very community I learnt from - making short tutorials on YouTube, before shifting to Patreon for the more premium and longer-form content.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl lg:text-2xl mt-6">
                        I now like to strike a balance between working with great people whilst passing on my knowledge to those just getting into the industry.
                      </p>
                    </div>
                  </div>
                  
                  {/* Clean Resume Information - Like Template */}
                  <div className="mt-16 pt-8 border-t border-gray-200">
                    {/* Header Section */}
                    <div className="mb-12">
                      <div className="flex justify-between items-start mb-8">
                        <h3 className="text-sm font-medium text-red-500 uppercase tracking-widest">ABOUT ROSS MASON</h3>
                        <span className="text-sm font-medium text-gray-500">01</span>
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                      {/* Left Column - Main Description */}
                      <div className="lg:col-span-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                          Digital product designer focused on development.
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          Currently improving users experience and interface design as lead designer director at crafto theme agency.
                        </p>
                      </div>

                      {/* Right Column - Services */}
                      <div className="lg:col-span-6">
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Discover</h4>
                            <p className="text-gray-600 leading-relaxed">
                              Working at the sweet spot between minimalism and sustainability to develop visual solutions that inform and persuade.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Prototyping</h4>
                            <p className="text-gray-600 leading-relaxed">
                              We spend enough time to uncover business goals and client needs by understanding market trends and unlocking opportunities.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Creation</h4>
                            <p className="text-gray-600 leading-relaxed">
                              Development is heart of our business. Our skilled designers and developers make sure to deliver tried-tested efficient, scalable.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-100">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-4">Expertise</h5>
                        <p className="text-gray-900 font-medium">Designing and web</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-4">Born in</h5>
                        <p className="text-gray-900 font-medium">London, UK</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-4">Date of birth</h5>
                        <p className="text-gray-900 font-medium">26 December 1984</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-4">Education</h5>
                        <p className="text-gray-900 font-medium">Master of design</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Services Section - Template Style */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg md:text-xl uppercase tracking-widest text-gray-600 mb-10">[Services list]</h4>
                
                <div className="space-y-6">
                  <motion.div 
                    className="group cursor-pointer opacity-75 hover:opacity-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase transition-opacity tracking-wide">
                        3D DESIGN
                      </h3>
                      <span className="ml-6 text-lg text-gray-500">01.</span>
                    </div>
                    <div className="h-px bg-gray-200 transition-colors duration-300 mt-3"></div>
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
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase transition-opacity tracking-wide">
                        ART DIRECTION
                      </h3>
                      <span className="ml-4 text-sm text-gray-500">02.</span>
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
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase transition-opacity tracking-wide">
                        ANIMATION
                      </h3>
                      <span className="ml-4 text-sm text-gray-500">03.</span>
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
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase transition-opacity tracking-wide">
                        MOTION DESIGN
                      </h3>
                      <span className="ml-4 text-sm text-gray-500">04.</span>
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
                  <p className="text-xl md:text-2xl font-medium mb-4">Bring your ideas to life</p>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
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

        {/* Latest Works Section */}
        <motion.div 
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-medium text-gray-500 tracking-wide mb-4">LATEST WORKS</h2>
                <div className="w-16 h-px bg-gray-300"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl font-light text-gray-400">02</span>
              </motion.div>
            </div>

            {/* Works Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {latestWorks.map((work, index) => (
                <motion.div
                  key={index}
                  className={`group cursor-pointer ${work.span}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className={`bg-gradient-to-br ${work.bg} ${work.span === 'row-span-2' ? 'aspect-[1/2]' : 'aspect-square'} rounded-lg overflow-hidden mb-4`}>
                    <img
                      src={work.image}
                      alt={`Work ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ross Mason</h3>
                <p className="text-gray-400 mb-4 text-base">
                  3D Artist & Educator specializing in Cinema 4D and Redshift rendering techniques.
                </p>
              </div>
              <div className="flex flex-col md:items-end">
                <div className="flex space-x-6 mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                    Patreon
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                    Instagram
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-base">
                    Twitter
                  </a>
                </div>
                <p className="text-gray-500 text-sm">
                  © 2024 Ross Mason. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}