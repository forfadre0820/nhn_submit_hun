import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import learnImage from "@assets/image_1751652728317.png";
import latestTutorialImage from "@assets/image_1751652758213.png";

export default function CombinedLanding() {
  const [currentTime, setCurrentTime] = useState("");
  const { scrollY } = useScroll();
  const [animationStarted, setAnimationStarted] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const slideVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: i * 0.2
      }
    })
  };

  const tutorialData = [
    {
      title: "Simple Studio Setup",
      tags: ["C4D", "Redshift"],
      duration: "00:28:43",
      month: "January",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D studio setup tutorial"
    },
    {
      title: "Bottle Scene Lighting",
      tags: ["C4D", "Redshift"],
      duration: "00:43:55",
      month: "December",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D bottle scene tutorial"
    },
    {
      title: "Designer Lamp Part 2",
      tags: ["C4D", "Redshift"],
      duration: "01:00:14",
      month: "November",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D lamp design tutorial"
    },
    {
      title: "Designer Lamp Part 1",
      tags: ["C4D", "Redshift"],
      duration: "01:16:19",
      month: "November",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D interior design tutorial"
    },
    {
      title: "Cocktail Scene",
      tags: ["C4D", "Redshift"],
      duration: "03:03:52",
      month: "October",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D cocktail scene tutorial"
    },
    {
      title: "X-Ray Effects",
      tags: ["C4D", "Redshift"],
      duration: "00:53:56",
      month: "September",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
      alt: "3D abstract forms tutorial"
    }
  ];

  const benefits = [
    {
      number: "01.",
      title: "In-depth tutorials",
      description: "Step-by-step breakdowns of complex 3D scenes using Cinema 4D and Redshift rendering."
    },
    {
      number: "02.",
      title: "Project files included",
      description: "Download and explore the complete project files for every tutorial to accelerate your learning."
    },
    {
      number: "03.",
      title: "Monthly new content",
      description: "Fresh tutorials and techniques released monthly to keep your skills sharp and current."
    }
  ];

  return (
    <div className="bg-white text-black scroll-smooth">
      {/* McCann Section */}
      <section className="min-h-screen relative">
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

        {/* Hero Section */}
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
                <div className="mb-4">
                  aux idées 
                  <span className="relative inline-block mx-4">
                    <video 
                      className="w-32 h-20 object-cover rounded-lg"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    >
                      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    </video>
                  </span>
                  qui
                </div>
                <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                <div>la vie des gens<span className="text-red-500">.</span></div>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ross Mason Section */}
      <section className="bg-white text-black">
        {/* Learn 3D Mastery Section */}
        <motion.div 
          className="py-16 bg-gray-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  LEARN 3D<br />
                  MASTERY
                </motion.h2>
                <motion.button
                  className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get a free patreon tutorial sample
                </motion.button>
              </div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img
                  src={learnImage}
                  alt="3D Interior Design Mastery"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Latest Tutorial Section */}
        <motion.div 
          className="py-8 bg-black text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
              <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-8">
                <div className="text-base uppercase tracking-wide mb-2 md:mb-0">Latest tutorial</div>
                <div className="text-2xl font-medium">
                  Creating Interiors
                  <div className="text-base opacity-75">[C4D & REDSHIFT]</div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-base hidden md:inline">02:12:58</span>
                <a href="#" className="text-white hover:opacity-75 transition-opacity border-b-2 border-white text-base">
                  Visit Patreon
                </a>
              </div>
            </div>
            <div className="mt-8">
              <img
                src={latestTutorialImage}
                alt="Latest Tutorial - Creating Interiors"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Career Section */}
        <motion.div 
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold uppercase mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                ROSS MASON
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 uppercase"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                3D ARTIST & EDUCATOR
              </motion.p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base uppercase tracking-wide text-gray-600">[PERSONAL INFO]</h3>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Date of Birth</span>
                      <p className="text-lg">March 15, 1995</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Location</span>
                      <p className="text-lg">London, UK</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Nationality</span>
                      <p className="text-lg">British</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Email</span>
                      <p className="text-lg">ross@masonstudio.com</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Website</span>
                      <p className="text-lg">masonstudio.com</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wide">Languages</span>
                      <p className="text-lg">English (Native)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base uppercase tracking-wide text-gray-600">[EDUCATION]</h3>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  <div className="border-l-4 border-black pl-6">
                    <h4 className="text-xl font-bold mb-2">Bachelor of Arts in Graphic Design</h4>
                    <p className="text-gray-600 mb-2">University of the Arts London</p>
                    <p className="text-sm text-gray-500">2013 - 2016</p>
                    <p className="text-gray-700 mt-3">
                      Graduated with First Class Honours. Specialized in digital design, typography, and visual communication. 
                      Final project focused on 3D visualization for branding applications.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-6">
                    <h4 className="text-xl font-bold mb-2">A-Levels</h4>
                    <p className="text-gray-600 mb-2">Sixth Form College</p>
                    <p className="text-sm text-gray-500">2011 - 2013</p>
                    <p className="text-gray-700 mt-3">
                      Art & Design (A*), Mathematics (A), Physics (B). Strong foundation in creative and technical subjects.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Professional Experience */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base uppercase tracking-wide text-gray-600">[EXPERIENCE]</h3>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  <div className="border-l-4 border-black pl-6">
                    <h4 className="text-xl font-bold mb-2">Senior 3D Artist & Educator</h4>
                    <p className="text-gray-600 mb-2">Freelance / Patreon Creator</p>
                    <p className="text-sm text-gray-500 mb-4">2020 - Present</p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Created premium educational content for 2,500+ subscribers on Patreon</li>
                      <li>• Developed comprehensive Cinema 4D and Redshift tutorials</li>
                      <li>• Consulted for major brands including Glossier, Louis Poulsen, and Logitech</li>
                      <li>• Generated $150K+ annual revenue through educational content</li>
                      <li>• Built strong community of 3D artists and learners</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-6">
                    <h4 className="text-xl font-bold mb-2">Senior 3D Visualizer</h4>
                    <p className="text-gray-600 mb-2">ManvsMachine Studio</p>
                    <p className="text-sm text-gray-500 mb-4">2018 - 2020</p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Lead 3D artist on high-profile commercial projects</li>
                      <li>• Collaborated with international brands on product launches</li>
                      <li>• Mentored junior artists in advanced rendering techniques</li>
                      <li>• Specialized in product visualization and architectural renders</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-6">
                    <h4 className="text-xl font-bold mb-2">3D Motion Designer</h4>
                    <p className="text-gray-600 mb-2">Frame Studio</p>
                    <p className="text-sm text-gray-500 mb-4">2016 - 2018</p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Created motion graphics for advertising campaigns</li>
                      <li>• Worked on projects for tech startups and established brands</li>
                      <li>• Developed expertise in Cinema 4D and After Effects integration</li>
                      <li>• Contributed to award-winning commercial projects</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base uppercase tracking-wide text-gray-600">[SKILLS]</h3>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">3D Software</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Cinema 4D</span>
                        <span className="text-sm text-gray-500">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Blender</span>
                        <span className="text-sm text-gray-500">Advanced</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Maya</span>
                        <span className="text-sm text-gray-500">Intermediate</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">Rendering</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Redshift</span>
                        <span className="text-sm text-gray-500">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Octane</span>
                        <span className="text-sm text-gray-500">Advanced</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Arnold</span>
                        <span className="text-sm text-gray-500">Intermediate</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">Post-Production</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>After Effects</span>
                        <span className="text-sm text-gray-500">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Photoshop</span>
                        <span className="text-sm text-gray-500">Advanced</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Premiere Pro</span>
                        <span className="text-sm text-gray-500">Advanced</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">Other</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Project Management</span>
                        <span className="text-sm text-gray-500">Advanced</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Client Relations</span>
                        <span className="text-sm text-gray-500">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Teaching</span>
                        <span className="text-sm text-gray-500">Expert</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Awards & Recognition */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base uppercase tracking-wide text-gray-600">[AWARDS]</h3>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <div className="border-l-4 border-black pl-6">
                    <h4 className="text-lg font-bold mb-2">Top Creator Award</h4>
                    <p className="text-gray-600 mb-2">Patreon</p>
                    <p className="text-sm text-gray-500">2023</p>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-6">
                    <h4 className="text-lg font-bold mb-2">Motion Graphics Excellence</h4>
                    <p className="text-gray-600 mb-2">Creative Pool Annual</p>
                    <p className="text-sm text-gray-500">2019</p>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-6">
                    <h4 className="text-lg font-bold mb-2">Best Student Portfolio</h4>
                    <p className="text-gray-600 mb-2">University of the Arts London</p>
                    <p className="text-sm text-gray-500">2016</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Clients */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <motion.div 
                className="md:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base uppercase tracking-wide text-gray-600">[CLIENTS]</h3>
              </motion.div>

              <motion.div 
                className="md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Selected Clients</h4>
                    <div className="space-y-3">
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Glossier</span>
                      </motion.div>
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Louis Poulsen</span>
                      </motion.div>
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Logitech</span>
                      </motion.div>
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">OneFineStay</span>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">Studio Partners</h4>
                    <div className="space-y-3">
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">ManvsMachine</span>
                      </motion.div>
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Frame</span>
                      </motion.div>
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Steelworks</span>
                      </motion.div>
                      <motion.div 
                        className="group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-3 group-hover:opacity-75 transition-opacity">→</span>
                        <span className="group-hover:opacity-75 transition-opacity">Builders Club</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Why Join Section */}
        <motion.div 
          className="py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3 mb-6 md:mb-0">
                <h3 className="text-base uppercase tracking-wide">[Why join?]</h3>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                  LEVEL UP YOUR 3D SKILLS AND DO <em className="italic">the work</em> YOU'VE <em className="italic">always</em> WANTED TO DO.
                </h2>
                <a href="#" className="text-lg hover:opacity-75 transition-opacity border-b border-black">
                  Unlock your 3D capabilities - Patreon
                </a>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm opacity-50 mb-3">{benefit.number}</span>
                      <h4 className="text-lg font-semibold mb-3">{benefit.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-base">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>



        {/* CTA Section */}
        <motion.div 
          className="py-16 bg-black text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to elevate your 3D skills?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join hundreds of 3D artists who are already mastering Cinema 4D and Redshift with our comprehensive tutorials.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning on Patreon
              </motion.a>
              <motion.a
                href="#"
                className="border border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Free Samples
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ross Mason</h3>
                <p className="text-gray-400 mb-6 text-base">
                  3D Artist & Educator specializing in Cinema 4D and Redshift rendering techniques.
                </p>
              </div>
              <div className="flex flex-col md:items-end">
                <div className="flex space-x-6 mb-4">
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
      </section>
    </div>
  );
}