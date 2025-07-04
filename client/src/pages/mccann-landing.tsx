import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { useLocation } from "wouter";

export default function McCannLanding() {
  const [currentTime, setCurrentTime] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { scrollYProgress } = useScroll({ target: heroRef });
  
  const videoScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.5]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.9]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleContinueClick = () => {
    navigate("/ross-mason");
  };

  return (
    <div className="min-h-screen bg-white font-['Noto_Sans']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center justify-center py-4 px-8">
          <div className="flex items-center space-x-12">
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Agency
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Creations
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              SEUNGHUN
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Team
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <div className="z-10 space-y-8">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold leading-tight tracking-tight"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    Say hello
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    to ideas that
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    actually work
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    in people's lives.
                  </motion.div>
                </div>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="flex items-center space-x-4"
              >
                <button
                  onClick={handleContinueClick}
                  className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue to Ross Mason
                </button>
                <div className="text-sm text-gray-400 font-mono">
                  {currentTime}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Video */}
            <motion.div 
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
              style={{ 
                scale: videoScale,
                opacity: videoOpacity 
              }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              >
                <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9bc3f8a&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              </video>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transition Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-8 text-center">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-black mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Meet Ross Mason
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ross Mason is a digital artist specializing in 3D art direction and motion design. 
              Through his educational platform, he shares advanced techniques and creative workflows.
            </motion.p>
            <motion.button
              onClick={handleContinueClick}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Enter Ross Mason's Studio →
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
}