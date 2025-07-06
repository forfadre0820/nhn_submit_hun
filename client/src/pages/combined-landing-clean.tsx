import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card3D } from "../components/Card3D";

export default function CombinedLanding() {
  const { scrollY } = useScroll();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [viewportScale, setViewportScale] = useState(10);
  const [finalPosition, setFinalPosition] = useState({ x: -50, y: -200 });

  useEffect(() => {
    const calculateViewportScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const videoWidth = 195;
      const videoHeight = 74;
      
      const scaleX = viewportWidth / videoWidth;
      const scaleY = viewportHeight / videoHeight;
      const scale = Math.min(scaleX, scaleY) * 0.9;
      
      setViewportScale(scale);
      
      const scaledWidth = videoWidth * scale;
      const scaledHeight = videoHeight * scale;
      
      const centerX = (viewportWidth - scaledWidth) / 2;
      const centerY = (viewportHeight - scaledHeight) / 2;
      
      const translateX = ((centerX - 50) / viewportWidth) * 100;
      const translateY = ((centerY - 50) / viewportHeight) * 100;
      
      setFinalPosition({ x: translateX, y: translateY });
    };

    calculateViewportScale();
    window.addEventListener('resize', calculateViewportScale);
    return () => window.removeEventListener('resize', calculateViewportScale);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (!animationStarted && latest >= 80) {
        setAnimationStarted(true);
      } else if (animationStarted && latest < 80) {
        setAnimationStarted(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY, animationStarted]);

  return (
    <div className="min-h-screen bg-black">
      {/* McCann Section */}
      <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
        <div className="container mx-auto px-8 py-16 text-center">
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center lg:gap-4 text-4xl md:text-6xl lg:text-8xl font-light leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="mb-2 lg:mb-0">Nous donnons vie</span>
            <span className="mb-2 lg:mb-0">aux idées</span>
            
            <motion.div 
              className="relative inline-block"
              style={{
                width: useTransform(scrollY, [80, 160, 240, 320, 400, 480], ["3.1rem", "6rem", "12rem", "24rem", "48rem", "80vw"]),
                height: useTransform(scrollY, [80, 160, 240, 320, 400, 480], ["8.3rem", "16rem", "32rem", "64rem", "100rem", "60vh"]),
                position: useTransform(scrollY, [400, 480], ["relative", "fixed"]),
                top: useTransform(scrollY, [480, 560], ["50%", "-100%"]),
                left: useTransform(scrollY, [400, 480], ["auto", "50%"]),
                transform: useTransform(scrollY, [400, 480, 560], ["none", "translate(-50%, -50%)", "translate(-50%, -100%)"]),
                zIndex: useTransform(scrollY, [400, 480], [1, 9999]),
                opacity: useTransform(scrollY, [560, 580], [1, 0.8]),
              }}
            >
              <video
                className="w-full h-full object-cover bg-white border-2 border-white"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>
            </motion.div>
            
            <span>qui</span>
          </motion.div>

          <motion.div
            className="mt-8 text-xl md:text-2xl font-light text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            transforment nos clients
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-white/80 bg-black/50 px-3 py-1 rounded-full">
              Scroll to explore
            </span>
            <div className="mouse-icon"></div>
          </div>
        </motion.div>

        {/* Video Full-screen Section */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ height: "50vh" }}
        >
          <div className="h-full w-full flex items-center justify-center">
            {/* Video container is handled by the motion.div above */}
          </div>
        </div>
      </section>

      {/* Learn 3D Wizardry Section */}
      <motion.div 
        className="relative z-20"
        style={{
          transform: useTransform(scrollY, [480, 500, 520, 540, 560, 580], ["translateY(100vh)", "translateY(80vh)", "translateY(60vh)", "translateY(30vh)", "translateY(10vh)", "translateY(0vh)"])
        }}
      >
        {/* Hero Section with Background Image and Text Overlay */}
        <div className="relative min-h-screen">
          {/* Background Image */}
          <div className="relative h-96 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
              alt="3D Animation Scene" 
              className="w-full h-full object-cover"
            />
            
            {/* Title Overlay with Blending */}
            <div 
              className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16"
              style={{ mixBlendMode: 'difference' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <h1 className="text-6xl md:text-8xl font-bold leading-tight text-white">
                  <span className="block">LEARN 3D</span>
                  <span className="block italic font-light">wizardry</span>
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Content Section with White Background */}
          <div className="bg-white">
            <div className="container mx-auto px-8 py-16">
              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                {/* Left Column - About Teaching */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed text-black">
                      I will be covering a whole range of content from<br/>
                      Lighting and Shading Techniques to Animation<br/>
                      and everything in-between.
                    </p>
                    <div className="pt-4">
                      <a 
                        href="#" 
                        className="text-lg text-black underline hover:no-underline decoration-2 underline-offset-4"
                      >
                        Get a free patreon tutorial sample
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - C4D & Redshift */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-100 p-6 rounded-lg mb-8">
                      <img 
                        src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                        alt="C4D Render" 
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    
                    <h2 className="text-5xl md:text-6xl font-bold leading-tight text-center text-black">
                      <span className="block">C4D &</span>
                      <span className="block">REDSHIFT</span>
                    </h2>
                  </div>
                </motion.div>
              </div>

              {/* From Studying Section */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold uppercase mb-8 tracking-wide text-black">
                  FROM STUDYING GRAPHIC DESIGN TO <em className="italic font-light">BECOMING</em> A SELF <em className="italic font-light">TAUGHT</em> 3D ARTIST
                </h3>
              </motion.div>

              {/* 3D Cards Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card3D 
                  title="DARK CSS (3D UI)"
                  description="Get all Html, CSS And JavaScript projects"
                />
                <Card3D 
                  title="DARK CSS (3D UI)"
                  description="Get all Html, CSS And JavaScript projects"
                />
                <Card3D 
                  title="DARK CSS (3D UI)"
                  description="Get all Html, CSS And JavaScript projects"
                />
                <Card3D 
                  title="DARK CSS (3D UI)"
                  description="Get all Html, CSS And JavaScript projects"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}