import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import bgImage2 from "@assets/image_1751735925346.png";
import bgImage3 from "@assets/image_1751735969830.png";

export default function LandingUpdated() {
  const { scrollY } = useScroll();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [activeService, setActiveService] = useState("design");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Latest works images with card flip data
  const latestWorks = [
    {
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-blue-100 to-blue-200",
      span: "",
      title: "Digital Design",
      description: "Modern UI/UX solutions",
      isTransparent: false
    },
    {
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-gray-100 to-gray-200",
      span: "",
      title: "Creative Direction",
      description: "Brand identity & strategy",
      isTransparent: true
    },
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1600",
      bg: "from-orange-100 to-orange-200",
      span: "row-span-2",
      title: "Development",
      description: "Full-stack solutions",
      isTransparent: false
    },
    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-green-100 to-green-200",
      span: "",
      title: "Motion Graphics",
      description: "Animated experiences",
      isTransparent: true
    },
    {
      image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-pink-100 to-pink-200",
      span: "",
      title: "Photography",
      description: "Visual storytelling",
      isTransparent: true
    },
    {
      image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      bg: "from-yellow-100 to-yellow-200",
      span: "",
      title: "Branding",
      description: "Identity design",
      isTransparent: false
    }
  ];

  const services = [
    {
      id: "design",
      title: "3D Design",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "direction",
      title: "Art Direction",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "motion",
      title: "Motion",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const videoTransform = useTransform(scrollY, [0, 90, 180, 270], [
    "scale(1)",
    "scale(2)",
    "scale(6)",
    "scale(12)"
  ]);

  const videoPosition = useTransform(scrollY, [270, 360], ["static", "fixed"]);
  const videoOpacity = useTransform(scrollY, [350, 450], [1, 0]);

  return (
    <div className="relative min-h-screen bg-white font-sans">
      {/* McCann Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-light leading-tight mb-8">
              <div className="mb-4">Nous donnons vie</div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span>aux idées</span>
                
                {/* Video Container */}
                <motion.div
                  className="relative inline-block"
                  style={{
                    width: "230px",
                    height: "87px"
                  }}
                >
                  <motion.div 
                    className="home__hero__video"
                    style={{
                      transform: videoTransform,
                      position: videoPosition,
                      opacity: videoOpacity,
                      zIndex: useTransform(scrollY, [270, 271], [1, 9999]),
                      top: useTransform(scrollY, [270, 271], ["auto", "50%"]),
                      left: useTransform(scrollY, [270, 271], ["auto", "50%"]),
                      transformOrigin: "center"
                    }}
                  >
                    <video
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      loop
                      playsInline
                      muted
                      autoPlay
                      className="w-full h-full object-cover border-2 border-white/80"
                    />
                  </motion.div>
                </motion.div>
                
                <span>qui</span>
              </div>
              <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
              <div>la vie des gens<span className="text-red-500">.</span></div>
            </h1>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              opacity: useTransform(scrollY, [0, 200], [1, 0])
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-sm text-white/80 mb-2 bg-black/50 px-3 py-1 rounded"
            >
              Scroll to explore
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
              className="w-6 h-10 border-2 border-white/40 rounded-full mx-auto relative"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/40 rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Full-screen Video Section */}
      <section className="h-[50vh] relative bg-black"></section>

      {/* Ross Mason Section */}
      <motion.div 
        className="bg-white text-black relative z-20"
        style={{
          transform: useTransform(scrollY, [450, 500], ["translateY(20vh)", "translateY(0vh)"])
        }}
      >
        {/* About Section with Background Image */}
        <motion.div 
          className="py-16 bg-white relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Image positioned on top */}
          <div className="absolute inset-0 z-0">
            <img 
              src={bgImage2} 
              alt="Background" 
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Header with section number */}
            <div className="flex justify-between items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-medium text-gray-500 tracking-wide mb-4">ABOUT BRIAN MILLER</h2>
                <div className="w-16 h-px bg-gray-300"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl font-light text-gray-400">01</span>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Main Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Digital product designer focused on development.
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Currently improving users experience and interface design as lead designer 
                  director at crafto theme agency.
                </p>
              </motion.div>

              {/* Right Column - Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-12">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Discover</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Working at the sweet spot between minimalism and sustainability to 
                      develop visual solutions that inform and persuade.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prototyping</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We spend enough time to uncover business goals and client needs by 
                      understanding market trends and unlocking opportunities.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Creation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Development is heart of our business. Our skilled designers and 
                      developers make sure to deliver tried-tested efficient, scalable.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Section with Interactive Image Switching */}
        <motion.div 
          className="py-24 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Service Image */}
              <motion.div
                className="relative h-96 overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.img
                  key={activeService}
                  src={services.find(s => s.id === activeService)?.image}
                  alt={services.find(s => s.id === activeService)?.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Video Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Service Selection */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    className={`cursor-pointer p-6 rounded-lg transition-all duration-300 ${
                      activeService === service.id 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveService(service.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                    <p className={`${activeService === service.id ? 'text-gray-300' : 'text-gray-600'}`}>
                      Specialized expertise in {service.title.toLowerCase()}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Latest Works Section with Card Flip Animation */}
        <motion.div 
          className="py-24 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Latest Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our recent projects and creative solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {latestWorks.map((work, index) => (
                <motion.div
                  key={index}
                  className={`group relative h-64 ${work.span}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {work.isTransparent ? (
                    // Card flip for transparent items
                    <div className="flip-card h-full">
                      <div className="flip-card-inner h-full">
                        <div className="flip-card-front">
                          <div className="relative w-full h-full">
                            <div className={`absolute inset-0 bg-gradient-to-br ${work.bg} opacity-80`}></div>
                            <div className="glass-effect w-full h-full flex items-center justify-center">
                              <div className="text-center text-white">
                                <Heart className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="text-lg font-semibold">{work.title}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flip-card-back">
                          <div className="relative w-full h-full">
                            <img
                              src={work.image}
                              alt={work.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <div className="text-center text-white">
                                <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
                                <p className="text-sm">{work.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular image for non-transparent items
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
                          <p className="text-sm">{work.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* User's Valentine Section */}
        <motion.div 
          className="py-24 bg-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img 
                  src={bgImage3} 
                  alt="User's Valentine" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                  User's Valentine
                </h2>
                <div className="flex items-center mb-6">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  <p className="text-lg text-gray-600">
                    I make users happy and your KPIs happier. Great design isn't just pretty—it gets results
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">User-centered design approach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Data-driven design decisions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Conversion optimization</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}