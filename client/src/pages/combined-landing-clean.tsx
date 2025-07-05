import { motion, useTransform, useScroll } from "framer-motion";
import { useState } from "react";

export default function CombinedLanding() {
  const { scrollY } = useScroll();

  return (
    <div className="bg-white min-h-screen">
      {/* McCann Hero Section */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        <div className="container mx-auto px-4 h-screen flex items-center">
          <div className="w-full max-w-4xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <div className="mb-4">Dites bonjour</div>
                  <div className="mb-4">
                    <span>aux idées&nbsp;</span>
                    <motion.div 
                      className="home__hero__video inline-block align-middle mx-2"
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
                        transform: useTransform(scrollY, [0, 42, 84, 126, 168, 209, 210, 245, 280, 315, 350, 385, 420], [
                          "translate(0px, 0px) scale(1)",
                          "translate(0px, 0px) scale(1.5)",
                          "translate(0px, 0px) scale(2.5)",
                          "translate(0px, 0px) scale(4)",
                          "translate(0px, 0px) scale(6)",
                          "translate(0px, 0px) scale(10)",
                          "translate(-50%, -50%) scale(10)",
                          "translate(-50%, -50%) scale(10)",
                          "translate(-50%, -50%) scale(10)",
                          "translate(-50%, -70%) scale(10)",
                          "translate(-50%, -100%) scale(10)",
                          "translate(-50%, -150%) scale(10)",
                          "translate(-50%, -200%) scale(10)"
                        ]),
                        position: useTransform(scrollY, [209, 210], ["static", "fixed"]),
                        zIndex: useTransform(scrollY, [209, 210], [1, 9999]),
                        top: useTransform(scrollY, [209, 210], ["auto", "50%"]),
                        left: useTransform(scrollY, [209, 210], ["auto", "50%"]),
                        opacity: useTransform(scrollY, [1000, 1100, 1200], [1, 1, 1]),
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
                          opacity: useTransform(scrollY, [950, 1050, 1150], [1, 1, 1]),
                          border: "2px solid rgba(255, 255, 255, 0.8)",
                          borderRadius: "0"
                        }}
                      />
                    </motion.div>
                    &nbsp;qui
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
                opacity: useTransform(scrollY, [0, 140], [1, 0])
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
      </section>

      {/* Video Full Screen Section */}
      <section className="relative bg-white" style={{ height: "70vh" }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          {/* Additional Scroll Indicator during video animation */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10"
            style={{
              opacity: useTransform(scrollY, [210, 350], [0, 1])
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-sm text-white mb-2"
            >
              Continue scrolling
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
              className="w-6 h-10 border-2 border-white rounded-full mx-auto relative"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1 h-3 bg-white rounded-full absolute left-1/2 top-1 transform -translate-x-1/2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ross Mason Section */}
      <motion.div 
        className="bg-white text-black relative z-20"
        style={{
          transform: useTransform(scrollY, [315, 350, 385, 420, 455, 490], ["translateY(100vh)", "translateY(80vh)", "translateY(60vh)", "translateY(30vh)", "translateY(10vh)", "translateY(0vh)"])
        }}
      >
        {/* About Section - Brian Miller Style */}
        <motion.div 
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-8">
            {/* Header with number */}
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-red-500 text-sm font-medium tracking-wide uppercase mb-4">
                  ABOUT ROSS MASON
                </h2>
              </div>
              <div className="text-red-500 text-2xl font-bold">01</div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              {/* Left Column */}
              <div>
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  3D product designer focused on development.
                </motion.h1>
                
                <motion.p 
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Currently improving users experience and interface design as lead designer director at crafto theme agency.
                </motion.p>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Discover</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Working at the sweet spot between minimalism and sustainability to develop visual solutions that inform and persuade.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prototyping</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We spend enough time to uncover business goals and client needs by understanding market trends and unlocking opportunities.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Creation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Development is heart of our business. Our skilled designers and developers make sure to deliver tried-tested efficient, scalable.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Bottom Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Expertise</h4>
                <p className="text-gray-900 font-medium">Designing and web</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Born in</h4>
                <p className="text-gray-900 font-medium">London, UK</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Date of birth</h4>
                <p className="text-gray-900 font-medium">26 December 1984</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Education</h4>
                <p className="text-gray-900 font-medium">Master of design</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Latest Works Section - Brian Miller Style */}
        <motion.div 
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-8">
            {/* Header with number */}
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-red-500 text-sm font-medium tracking-wide uppercase mb-4">
                  LATEST WORKS
                </h2>
              </div>
              <div className="text-red-500 text-2xl font-bold">02</div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Large image - top left */}
              <motion.div 
                className="md:col-span-2 md:row-span-2 bg-blue-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm">Product Design</div>
                  </div>
                </div>
              </motion.div>

              {/* Small image - top right */}
              <motion.div 
                className="md:col-span-2 bg-gray-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="text-xs">Brand Design</div>
                  </div>
                </div>
              </motion.div>

              {/* Pink accent image */}
              <motion.div 
                className="md:col-span-2 bg-pink-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-2xl mb-1">✋</div>
                    <div className="text-xs">UI/UX Design</div>
                  </div>
                </div>
              </motion.div>

              {/* Green accent image */}
              <motion.div 
                className="bg-green-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-xl mb-1">🌿</div>
                    <div className="text-xs">Nature</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom left image */}
              <motion.div 
                className="bg-orange-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-xl mb-1">📄</div>
                    <div className="text-xs">Print</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom center image */}
              <motion.div 
                className="bg-yellow-100 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-xl mb-1">📱</div>
                    <div className="text-xs">Mobile</div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom right images */}
              <motion.div 
                className="bg-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-xl mb-1">🥚</div>
                    <div className="text-xs">3D Art</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-blue-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-xl mb-1">👕</div>
                    <div className="text-xs">Fashion</div>
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