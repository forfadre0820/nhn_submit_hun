import { motion, useScroll, useTransform } from "framer-motion";

export default function CombinedLanding() {
  const { scrollY } = useScroll();
  
  return (
    <div className="bg-black text-white font-sans">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-8 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-8">
          <a href="/" className="text-white hover:text-gray-300 transition-colors font-medium">Home</a>
          <a href="/about" className="text-white hover:text-gray-300 transition-colors font-medium">About</a>
          <a href="/work" className="text-white hover:text-gray-300 transition-colors font-medium">Work</a>
          <a href="/contact" className="text-white hover:text-gray-300 transition-colors font-medium">Contact</a>
        </div>
      </motion.nav>

      {/* McCann Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col items-center space-y-6 text-center">
                <div className="text-6xl md:text-8xl font-bold leading-none">
                  <div className="mb-4">Nous donnons vie</div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    aux idées
                    <motion.div 
                      className="relative overflow-hidden home__hero__video js-video"
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
                        transform: useTransform(scrollY, [0, 120, 240, 360, 480, 599, 600], [
                          "translate(0px, 0px) scale(1)",
                          "translate(0px, 0px) scale(1.5)",
                          "translate(0px, 0px) scale(2.5)",
                          "translate(0px, 0px) scale(4)",
                          "translate(0px, 0px) scale(6)",
                          "translate(0px, 0px) scale(10)",
                          "translate(-50%, -50%) scale(10)"
                        ]),
                        position: useTransform(scrollY, [599, 600], ["static", "fixed"]),
                        zIndex: useTransform(scrollY, [599, 600], [1, 9999]),
                        top: useTransform(scrollY, [599, 600], ["auto", "50%"]),
                        left: useTransform(scrollY, [599, 600], ["auto", "50%"]),
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
                          border: "2px solid rgba(255, 255, 255, 0.8)",
                          borderRadius: "0"
                        }}
                      />
                    </motion.div>
                    &nbsp;qui
                  </div>
                  <div className="mb-4">transforment <sup className="text-sm">(vraiment)</sup></div>
                  <div>la vie des gens<span className="text-red-500">.</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="relative bg-white text-black min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold uppercase leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              SELF <em className="italic">taught</em> 3D ARTIST
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <motion.h3 
              className="col-span-3 uppercase font-semibold"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              [PERSONAL STORY]
            </motion.h3>
            <motion.div 
              className="col-span-4 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="mb-4"><strong>Forever learning.</strong></p>
              <p className="mb-4">I remember first opening Cinema 4D back in 2011(-ish) when I was just a little teen. Who would've thought over 10 years later it would've turned into a career? Along the way, I studied Graphic Design, worked as a Motion Designer, a 3D Visualiser, and eventually, turned to the life of a Freelance 3D Artist.</p>
              <p className="mb-4">Over the years, I've had the pleasure to work with some great agencies and clients, learning from some of the greats and slowly but surely honing my craft. Over recent years, I decided to give back to the very community I learnt from - making short tutorials on YouTube, before shifting to Patreon for the more premium and longer-form content.</p>
              <p>I now like to strike a balance between working with great people whilst passing on my knowledge to those just getting into the industry.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <motion.div 
              className="col-span-6 flex flex-col justify-between"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col">
                <h4 className="uppercase font-semibold mb-8">[Services list]</h4>
                <nav className="relative flex flex-col items-start">
                  <motion.button 
                    className="text-2xl md:text-4xl font-bold mb-4 hover:text-gray-600 transition-colors"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    3D DESIGN
                    <span className="absolute left-full text-xs pl-4 top-0">01.</span>
                  </motion.button>
                  <motion.button 
                    className="text-2xl md:text-4xl font-bold mb-4 hover:text-gray-600 transition-colors"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    ART DIRECTION
                    <span className="absolute left-full text-xs pl-4 top-0">02.</span>
                  </motion.button>
                  <motion.button 
                    className="text-2xl md:text-4xl font-bold mb-4 hover:text-gray-600 transition-colors"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    MOTION
                    <span className="absolute left-full text-xs pl-4 top-0">03.</span>
                  </motion.button>
                </nav>
              </div>
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 font-medium">Bring your ideas to life</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pushing beyond reality and creating visuals beyond physicality, 3D allows us to bring ideas to life which would otherwise be impossible to capture.
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <motion.div 
              className="col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <h3 className="uppercase font-semibold mb-4">[Collaboration]</h3>
              <p className="text-lg leading-relaxed mb-4">
                Below is a list of some of my favourite clients and partners that I have worked with. Let's work together to add your name to that list.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <span className="flex uppercase mb-4 font-semibold">[Client List]</span>
              <nav className="space-y-2">
                {['Glossier', 'Louis Poulsen', 'Logitech', 'OneFineStay'].map((client, index) => (
                  <motion.div 
                    key={client}
                    className="flex items-center cursor-pointer hover:text-gray-600 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ transitionDelay: `${1.4 + index * 0.1}s` }}
                  >
                    <div className="mr-2">→</div>
                    {client}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
            >
              <span className="flex uppercase mb-4 font-semibold">[Partners]</span>
              <nav className="space-y-2">
                {['ManvsMachine', 'Frame', 'Steelworks', 'Builders Club'].map((partner, index) => (
                  <motion.div 
                    key={partner}
                    className="flex items-center cursor-pointer hover:text-gray-600 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ transitionDelay: `${1.6 + index * 0.1}s` }}
                  >
                    <div className="mr-2">→</div>
                    {partner}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            viewport={{ once: true }}
          >
            <div className="col-span-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Ready to <em className="italic">work</em> together on <em className="italic">your</em> project?
              </h2>
              <div className="text-lg leading-relaxed mb-8">
                <p>Looking to bring your brand to life? Want to put your product in a surreal environment? Need help learning 3D? Shoot me a message and we'll see what we can do together.</p>
              </div>
              <motion.button 
                className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Let's work together
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}