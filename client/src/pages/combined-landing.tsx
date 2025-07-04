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
              
              <div className="flex justify-center">
                <svg viewBox="0 0 107 20" className="h-6 fill-current">
                  <path d="M0 0.321777H3.4102L9.8294 12.5552L16.2486 0.321777H19.4983V19.7182H16.4091V5.8751L10.7522 16.5391H8.70604L3.08924 5.8751V19.7182H0V0.321777Z"/>
                  <path d="M21.5444 12.8771C21.5444 8.53105 24.1522 5.75439 28.084 5.75439C31.2133 5.75439 33.7008 7.44454 34.2625 10.6236H31.1732C30.6517 9.09443 29.6086 8.37009 28.084 8.37009C25.9175 8.37009 24.5534 9.93951 24.5534 12.8771C24.5534 15.8148 25.8774 17.3842 28.084 17.3842C29.6487 17.3842 30.7319 16.6598 31.2134 14.9294H34.3026C33.7008 18.1085 31.2936 19.9999 28.084 19.9999C24.1121 20.0401 21.5444 17.2232 21.5444 12.8771Z"/>
                  <path d="M35.7469 9.97988C35.7469 4.10463 39.438 0 44.8943 0C49.2273 0 52.477 2.53521 53.3997 6.72032H50.15C49.3877 4.10463 47.5021 2.85714 44.8943 2.85714C41.2033 2.85714 38.9164 5.6338 38.9164 10.0201C38.9164 14.4064 41.2033 17.1831 44.8943 17.1831C47.5021 17.1831 49.4279 15.8551 50.1901 13.1187H53.3997C52.477 17.4245 49.2674 20.0402 44.8943 20.0402C39.3979 20 35.7469 16.0161 35.7469 9.97988Z"/>
                  <path d="M60.541 0.321777H63.7105L70.9321 19.7182H67.6423L65.877 14.7685H58.2943L56.529 19.7182H53.2793L60.541 0.321777ZM64.874 11.9918L62.0656 4.06423L59.2572 11.9918H64.874Z"/>
                  <path d="M72.4567 0.321777H75.3453L85.0543 14.4063V0.321777H87.9831V19.7182H85.1346L75.3854 5.63365V19.7182H72.4567V0.321777Z"/>
                  <path d="M91.4735 0.321777H94.3621L104.071 14.4063V0.321777H107V19.7182H104.151L94.4023 5.63365V19.7182H91.4735V0.321777Z"/>
                </svg>
              </div>
              
              <nav className="flex items-center space-x-6">
                <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Equipe</a>
                <a href="#" className="text-base uppercase tracking-wide hover:opacity-75">Contact</a>
                <div className="flex items-center space-x-2">
                  <span className="text-base">FR</span>
                  <span className="text-base opacity-50">|</span>
                  <span className="text-base opacity-50">EN</span>
                </div>
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
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <div className="sticky top-20">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=600"
                    alt="Ross Mason Portrait"
                    className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-3">Ross Mason</h3>
                  <p className="text-gray-600 mb-4 text-base">3D Artist & Educator</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Location:</span> Los Angeles, CA
                    </div>
                    <div>
                      <span className="font-medium">Experience:</span> 8+ Years
                    </div>
                    <div>
                      <span className="font-medium">Specialization:</span> Cinema 4D, Redshift
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-8">
                <div className="space-y-6">
                  {/* About */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">About</h4>
                    <p className="text-gray-600 leading-relaxed text-base">
                      Passionate 3D artist with over 8 years of experience in creating stunning visual content for brands, 
                      agencies, and independent projects. Specialized in Cinema 4D and Redshift rendering, with a focus on 
                      architectural visualization, product design, and motion graphics. Currently teaching and sharing knowledge 
                      through comprehensive tutorials on Patreon.
                    </p>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Born:</span>
                          <span className="font-medium">March 15, 1990</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nationality:</span>
                          <span className="font-medium">American</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Languages:</span>
                          <span className="font-medium">English, French</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">ross@masonstudio.com</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Website:</span>
                          <span className="font-medium">masonstudio.com</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Education</h4>
                    <div className="space-y-4">
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h5 className="font-medium text-base">Bachelor of Fine Arts in 3D Animation</h5>
                        <p className="text-gray-600 text-sm">Art Center College of Design, Pasadena</p>
                        <p className="text-sm text-gray-500">2008 - 2012</p>
                      </div>
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h5 className="font-medium text-base">Certificate in Motion Graphics</h5>
                        <p className="text-gray-600 text-sm">School of Visual Arts, New York</p>
                        <p className="text-sm text-gray-500">2013</p>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Professional Experience</h4>
                    <div className="space-y-6">
                      <div className="border-l-2 border-black pl-4">
                        <h5 className="font-medium text-base">Senior 3D Artist & Educator</h5>
                        <p className="text-gray-600 text-sm">Freelance / Patreon Creator</p>
                        <p className="text-sm text-gray-500 mb-2">2020 - Present</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Creating educational content for 1000+ subscribers on Patreon</li>
                          <li>• Developing comprehensive Cinema 4D and Redshift tutorials</li>
                          <li>• Consulting for major brands on 3D visualization projects</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h5 className="font-medium text-base">3D Visualization Artist</h5>
                        <p className="text-gray-600 text-sm">Digital Dimension Studios</p>
                        <p className="text-sm text-gray-500 mb-2">2017 - 2020</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Lead artist on architectural visualization projects</li>
                          <li>• Collaborated with architects and real estate developers</li>
                          <li>• Mentored junior artists in advanced rendering techniques</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-gray-300 pl-4">
                        <h5 className="font-medium text-base">Motion Graphics Designer</h5>
                        <p className="text-gray-600 text-sm">Creative Agency Los Angeles</p>
                        <p className="text-sm text-gray-500 mb-2">2013 - 2017</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Created motion graphics for advertising campaigns</li>
                          <li>• Worked with clients including Nike, Apple, and Google</li>
                          <li>• Specialized in product visualization and brand animations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800">Technical Skills</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h6 className="font-medium mb-2 text-base">3D Software</h6>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>Cinema 4D</li>
                          <li>Blender</li>
                          <li>Maya</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h6 className="font-medium mb-2 text-base">Rendering</h6>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>Redshift</li>
                          <li>Octane</li>
                          <li>Arnold</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h6 className="font-medium mb-2 text-base">Post-Production</h6>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>After Effects</li>
                          <li>Photoshop</li>
                          <li>Premiere Pro</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        {/* Tutorial Gallery */}
        <motion.div 
          className="py-12 bg-gray-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-8">Recent Tutorials</h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {tutorialData.map((tutorial, index) => (
                <motion.article
                  key={index}
                  className={`group cursor-pointer break-inside-avoid mb-6 ${
                    index % 3 === 0 ? 'transform scale-110' : 
                    index % 4 === 0 ? 'transform -rotate-1' : 
                    index % 5 === 0 ? 'transform rotate-1' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="mb-3">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      [{tutorial.tags.join(", ")}]
                    </span>
                  </div>
                  <div className={`relative mb-3 overflow-hidden rounded-lg ${
                    index % 2 === 0 ? 'aspect-[3/4]' : 
                    index % 3 === 0 ? 'aspect-[4/3]' : 
                    'aspect-[16/9]'
                  }`}>
                    <img
                      src={tutorial.image}
                      alt={tutorial.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{tutorial.duration} / {tutorial.month}</span>
                    <span className="font-medium">{tutorial.title}</span>
                  </div>
                </motion.article>
              ))}
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