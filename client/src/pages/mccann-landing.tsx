import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { useLocation } from "wouter";

export default function McCannLanding() {
  const [currentTime, setCurrentTime] = useState("");
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { scrollYProgress } = useScroll({ target: heroRef });
  
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.8]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sound effect for scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollYProgress.get() > 0.1 && !isMuted) {
        // Play scroll sound (you would implement actual sound here)
        console.log('Scroll sound effect');
      }
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollYProgress, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const projects = [
    {
      client: "Chivas",
      title: "Chivas XV x Dolly Cohen",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Nespresso",
      title: "GC x OL",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Chandon",
      title: "Garden Spritz",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Prada",
      title: "Les Infusions",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    },
    {
      client: "Moncler",
      title: "Summer of lightness",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000"
    }
  ];

  const handleContinueClick = () => {
    navigate("/ross-mason");
  };

  return (
    <div className="mccann-landing bg-white text-black min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Agence</a>
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Creations</a>
            </nav>
            
            <div className="flex-1 flex justify-center">
              <svg viewBox="0 0 107 20" className="h-5 fill-current">
                <path d="M0 0.321777H3.4102L9.8294 12.5552L16.2486 0.321777H19.4983V19.7182H16.4091V5.8751L10.7522 16.5391H8.70604L3.08924 5.8751V19.7182H0V0.321777Z"/>
                <path d="M21.5444 12.8771C21.5444 8.53105 24.1522 5.75439 28.084 5.75439C31.2133 5.75439 33.7008 7.44454 34.2625 10.6236H31.1732C30.6517 9.09443 29.6086 8.37009 28.084 8.37009C25.9175 8.37009 24.5534 9.93951 24.5534 12.8771C24.5534 15.8148 25.8774 17.3842 28.084 17.3842C29.6487 17.3842 30.7319 16.6598 31.2134 14.9294H34.3026C33.7008 18.1085 31.2936 19.9999 28.084 19.9999C24.1121 20.0401 21.5444 17.2232 21.5444 12.8771Z"/>
                <path d="M35.7469 9.97988C35.7469 4.10463 39.438 0 44.8943 0C49.2273 0 52.477 2.53521 53.3997 6.72032H50.15C49.3877 4.10463 47.5021 2.85714 44.8943 2.85714C41.2033 2.85714 38.9164 5.6338 38.9164 10.0201C38.9164 14.4064 41.2033 17.1831 44.8943 17.1831C47.5021 17.1831 49.4279 15.8551 50.1901 13.1187H53.3997C52.477 17.4245 49.2674 20.0402 44.8943 20.0402C39.3979 20 35.7469 16.0161 35.7469 9.97988Z"/>
                <path d="M60.541 0.321777H63.7105L70.9321 19.7182H67.6423L65.877 14.7685H58.2943L56.529 19.7182H53.2793L60.541 0.321777ZM64.874 11.9918L62.0656 4.06423L59.2572 11.9918H64.874Z"/>
                <path d="M72.4567 0.321777H75.3453L85.0543 14.4063V0.321777H87.9831V19.7182H85.1346L75.3854 5.63365V19.7182H72.4567V0.321777Z"/>
                <path d="M91.4735 0.321777H94.3621L104.071 14.4063V0.321777H107V19.7182H104.151L94.4023 5.63365V19.7182H91.4735V0.321777Z"/>
              </svg>
            </div>
            
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Equipe</a>
              <a href="#" className="text-sm uppercase tracking-wide hover:opacity-75">Contact</a>
              <div className="flex items-center space-x-2">
                <span className="text-sm">FR</span>
                <span className="text-sm opacity-50">|</span>
                <span className="text-sm opacity-50">EN</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="text-left max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Dites bonjour
                </motion.div>
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  aux idées qui
                </motion.div>
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  transforment <sup className="text-sm">(vraiment)</sup>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  la vie des gens<span className="text-red-500">.</span>
                </motion.div>
              </h1>
            </motion.div>

            {/* Video Content */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-xl shadow-2xl"
                style={{
                  scale: videoScale,
                  opacity: videoOpacity,
                }}
              >
                <video 
                  ref={videoRef}
                  className="w-80 h-60 object-cover cursor-pointer"
                  autoPlay 
                  loop 
                  muted={isMuted}
                  playsInline
                  onClick={() => setIsVideoExpanded(!isVideoExpanded)}
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
                
                {/* Video Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={toggleMute}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Location and Time */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>N 48° 53' 34.915"</div>
              <div className="font-mono">{currentTime}</div>
              <div>E 02° 15' 52.038"</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Work Marquee */}
      <section className="bg-black text-white py-4">
        <div className="marquee-container overflow-hidden">
          <motion.div
            className="flex items-center space-x-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-8">
                <span className="text-lg uppercase tracking-wide">Latest work</span>
                <span className="text-lg">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex justify-between items-start text-sm">
                  <span className="font-semibold uppercase">{project.client}</span>
                  <span className="text-right">{project.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ross Mason Introduction Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-8 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet Ross Mason
            </motion.h2>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-left">
                <motion.p 
                  className="text-xl text-gray-700 mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Ross Mason is a digital artist specializing in 3D art direction and motion design. 
                  With years of experience in the industry, he creates stunning visual experiences 
                  that push the boundaries of digital creativity.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-gray-600 mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Through his educational platform, Ross shares advanced techniques, 
                  industry insights, and creative workflows that have helped thousands 
                  of artists elevate their 3D skills.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  {["3D Modeling", "Motion Graphics", "Art Direction", "Visual Effects"].map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl p-8 shadow-2xl">
                  <div className="w-full h-full bg-black/20 rounded-xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl font-bold mb-4">3D</div>
                      <div className="text-xl">Artist & Educator</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Continue Button */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to explore Ross Mason's 3D world?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Dive into advanced 3D tutorials, behind-the-scenes content, and professional workflows 
              that will transform your creative process.
            </p>
            <motion.button
              onClick={handleContinueClick}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center space-x-3 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Enter Ross Mason's Studio</span>
              <ChevronDown className="w-5 h-5 transform rotate-[-90deg]" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">McCann Paris x Ross Mason</h3>
              <p className="text-gray-400 mb-4 text-sm">
                A collaboration between creative excellence and 3D mastery. 
                Pushing the boundaries of digital art and motion design.
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="flex space-x-4 mb-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
              <p className="text-gray-500 text-xs">
                © 2024 Creative Collaboration. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}