import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { AmbientBackground } from "./components/AmbientBackground";
import { ScrollAnimation } from "./components/ScrollAnimation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageSquare, ArrowRight, ArrowDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const queryClient = new QueryClient();

const projects = [
  { id: 1, title: "Velour", category: "Fashion", image: "/velour.png" },
  { id: 2, title: "Apex Capital", category: "Fintech", image: "/apex.png" },
  { id: 3, title: "Noir Perfumes", category: "Fragrance", image: "/noir.png" },
  { id: 4, title: "Orion Studios", category: "Production", image: "/orion.png" },
  { id: 5, title: "Lumina Health", category: "Wellness", image: "/lumina.png" },
  { id: 6, title: "Vanta Labs", category: "Technology", image: "/vanta.png" },
];

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div ref={containerRef} className="relative w-full text-gray-200">
      <CustomCursor />
      <AmbientBackground />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center z-10 px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-8">
              Boutique Digital Studio
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-wide leading-tight mb-6">
              CINEMATIC <br/>
              <span className="italic text-gray-400">EXPERIENCES</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light mb-12">
              We build websites that feel like art. Immersive, dark, and unforgettable. 
              The intersection of cinema and code.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300"
            >
              Start a Project <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gray-500"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      <ScrollAnimation />

      {/* Services Section */}
      <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8"
        >
          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase text-purple-400 mb-6">Services</h2>
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Digital <br/> <span className="italic text-gray-500">Craftsmanship</span>
            </h3>
          </div>
          <div className="space-y-12">
            {[
              { title: "Web Design", desc: "High-end, cinematic interfaces that command attention and define categories." },
              { title: "Development", desc: "Flawless execution with modern stacks. Fast, accessible, and perfectly responsive." },
              { title: "Branding", desc: "Visual identities that resonate. Logos, typography, and color systems with depth." },
              { title: "Animations", desc: "Scroll-triggered narratives, WebGL elements, and buttery smooth transitions." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group border-b border-gray-800 pb-8 hover:border-purple-500/50 transition-colors duration-500"
              >
                <h4 className="text-2xl font-serif mb-4 group-hover:text-purple-300 transition-colors duration-500">{s.title}</h4>
                <p className="text-gray-400 font-light">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-red-400 mb-6">Showcase</h2>
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
            Selected <span className="italic text-gray-500">Works</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.2 }}
              className={`relative group ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="overflow-hidden glass-card aspect-[4/3] mb-6 relative group-hover:glow-purple transition-all duration-700 rounded-sm">
                <motion.img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white tracking-widest text-sm uppercase">View Project</span>
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <h4 className="font-serif text-2xl group-hover:text-white text-gray-300 transition-colors">{p.title}</h4>
                <span className="text-xs uppercase tracking-widest text-gray-500">{p.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 px-4 md:px-12 relative z-10 flex items-center justify-center bg-black/50 border-y border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-300">
            We don't build templates. We craft bespoke digital environments for brands that refuse to blend in. <span className="text-white">Based in Colombia, working globally.</span>
          </h3>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs tracking-[0.3em] uppercase text-blue-400 mb-6">Contact</h2>
            <h3 className="font-serif text-5xl md:text-7xl mb-12">
              Let's <br/> <span className="italic text-gray-500">Create.</span>
            </h3>
            
            <div className="space-y-8 text-gray-400 font-light">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Email</p>
                <a href="mailto:hello@galanwebstudios.com" className="text-xl hover:text-white transition-colors">hello@galanwebstudios.com</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Phone</p>
                <a href="tel:+573232809090" className="text-xl hover:text-white transition-colors">+57 3232809090</a>
              </div>
              <div className="pt-8">
                <a 
                  href="https://wa.me/573232809090" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#20bd5a] hover:glow-purple transition-all duration-300"
                >
                  <FaWhatsapp size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 rounded-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input type="text" className="w-full glass-input p-4 text-white placeholder-gray-600" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input type="email" className="w-full glass-input p-4 text-white placeholder-gray-600" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Project Type</label>
                <select className="w-full glass-input p-4 text-white bg-transparent appearance-none">
                  <option value="web-design" className="bg-[#0a0a0a]">Web Design</option>
                  <option value="ecommerce" className="bg-[#0a0a0a]">E-Commerce</option>
                  <option value="branding" className="bg-[#0a0a0a]">Branding</option>
                  <option value="other" className="bg-[#0a0a0a]">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea rows={4} className="w-full glass-input p-4 text-white placeholder-gray-600 resize-none" placeholder="Tell us about your vision..."></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-200 hover:glow-purple transition-all duration-300 mt-4 flex items-center justify-center gap-3"
              >
                Send Message <MessageSquare size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center relative z-10">
        <p className="text-xs uppercase tracking-widest text-gray-600">
          &copy; {new Date().getFullYear()} GaLan Web Studios. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;