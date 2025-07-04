import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function RossMason() {
  const [currentTime, setCurrentTime] = useState("");
  const [animationStarted, setAnimationStarted] = useState(false);
  const [, navigate] = useLocation();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const slideVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };

  const tutorials = [
    {
      title: "Simple Studio Setup",
      duration: "00:28:43",
      tags: ["C4D", "Redshift"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Bottle Scene Lighting",
      duration: "00:43:55",
      tags: ["C4D", "Redshift"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Designer Lamp",
      duration: "01:00:14",
      tags: ["C4D", "Redshift"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Cocktail Scene",
      duration: "03:03:52",
      tags: ["C4D", "Redshift"],
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const patrons = [
    { name: "Alexander Chen", role: "Motion Designer" },
    { name: "Maria Santos", role: "Art Director" },
    { name: "David Kim", role: "3D Artist" },
    { name: "Sarah Johnson", role: "Creative Director" },
    { name: "Michael Brown", role: "VFX Artist" },
    { name: "Lisa Wong", role: "UI/UX Designer" },
    { name: "James Wilson", role: "Animator" },
    { name: "Emma Davis", role: "Concept Artist" }
  ];

  return (
    <div className="min-h-screen bg-white font-['Noto_Sans'] text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-bold text-lg">RM</span>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">Ross Mason</h1>
                <p className="text-sm text-gray-600">3D Artist & Educator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-black transition-colors">Tutorials</a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">Resources</a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">Community</a>
              </nav>
              
              <div className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full">
                {currentTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-wide text-gray-500 mb-4"
            >
              LEARN 3D
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="font-light">3D</span>
              <br />
              <span className="italic font-light">wizardry</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center space-x-4 text-lg"
            >
              <span className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium">
                Cinema 4D
              </span>
              <span className="text-2xl font-bold">C4D &</span>
              <span className="text-2xl font-bold">REDSHIFT</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="relative aspect-video rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
              alt="3D rendered modern interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            LEVEL UP YOUR 3D SKILLS AND DO{" "}
            <em className="italic">the work</em> YOU'VE{" "}
            <em className="italic">always</em> WANTED TO DO.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Advanced Techniques</h3>
              <p className="text-gray-300">Learn cutting-edge 3D modeling and rendering techniques used by industry professionals.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Professional Workflows</h3>
              <p className="text-gray-300">Discover efficient workflows that will dramatically improve your creative process.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Industry Insights</h3>
              <p className="text-gray-300">Get exclusive insights from years of experience in 3D art direction and motion design.</p>
            </div>
          </motion.div>
          
          <motion.button
            className="bg-white text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join Patreon Community
          </motion.button>
        </div>
      </section>

      {/* Recent Tutorials */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            RECENT <em className="italic">tutorials</em>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {tutorial.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{tutorial.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Sample */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">DOWNLOAD</h2>
              <p className="text-xl mb-2">Free SAMPLE</p>
              <p className="text-lg mb-8">TUTORIAL</p>
              <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                Download Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Made by Patrons */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            MADE BY <em className="italic">patrons</em>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {patrons.map((patron, index) => (
              <div key={index} className="space-y-1">
                <p className="font-semibold text-sm">{patron.name}</p>
                <p className="text-xs text-gray-500">{patron.role}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* A-Grade Tutorials */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                A-GRADE
                <br />
                <em className="italic">tutorials</em>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                DIRECT <em className="italic">messaging</em>
              </motion.p>
              <motion.p 
                className="text-gray-400 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Get access to premium tutorials, exclusive content, and direct communication with Ross Mason. 
                Join a community of passionate 3D artists and take your skills to the next level.
              </motion.p>
              <motion.button
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Start Learning Today
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <p className="text-sm text-gray-400 mb-4">Get a message from Ross when you sign up:</p>
              <div className="bg-gray-800 rounded-lg p-6 text-left">
                <p className="text-sm text-gray-300">
                  "Welcome to the community! I'm excited to help you master 3D design. 
                  Let's create something amazing together."
                </p>
                <p className="text-xs text-gray-500 mt-4">- Ross Mason</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}