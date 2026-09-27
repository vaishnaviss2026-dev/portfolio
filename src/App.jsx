import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Video, Scissors, Film, Mail } from 'lucide-react';
import './index.css';
import ThinkingDots from './ThinkingDots';

// Minimal Spotlight Card Component (Inspired by Reactbits)
const SpotlightCard = ({ children, className = '' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        backgroundColor: 'var(--card-bg)'
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(227, 58, 36, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// Blur Text Component
const BlurText = ({ text, delay = 0, className = '' }) => {
  return (
    <motion.h1
      initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
      className={className}
      style={{ fontSize: '5rem', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1 }}
    >
      {text}
    </motion.h1>
  );
};

// Shiny Text Component
const ShinyText = ({ text, className = '' }) => {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 100%)',
        backgroundSize: '200% auto',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        display: 'inline-block'
      }}
      animate={{ backgroundPosition: ['200% center', '-200% center'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      {text}
    </motion.span>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const longProjects = [
    { title: "Neon Nights", category: "Music Video", icon: <Play size={24} color="var(--accent)" /> },
    { title: "Corporate Horizon", category: "Brand Documentary", icon: <Film size={24} color="var(--accent)" /> },
  ];

  const shortProjects = [
    { title: "Velocity", category: "TikTok Edit", icon: <Video size={24} color="var(--accent)" /> },
    { title: "Echoes", category: "Instagram Reel", icon: <Scissors size={24} color="var(--accent)" /> },
    { title: "Vibe Check", category: "YouTube Short", icon: <Play size={24} color="var(--accent)" /> },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <ThinkingDots />
      {/* Hero Section */}
      <section className="hero">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div style={{ width: '100%', height: '100%', backgroundImage: 'radial-gradient(circle at center, var(--accent) 0%, transparent 20%)', backgroundSize: '100px 100px' }} />
        </motion.div>
        
        <div className="z-10 container flex flex-col items-center">
          <BlurText text="CRAFTING" delay={0.2} />
          <BlurText text="VISUAL STORIES" delay={0.4} />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="hero-subtitle mt-8 flex items-center gap-4"
          >
            Video Editor <span style={{ color: 'var(--accent)' }}>•</span> Colorist <span style={{ color: 'var(--accent)' }}>•</span> Motion Designer
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-12"
          >
            <ShinyText text="SCROLL TO VIEW REEL" className="text-sm tracking-[5px] uppercase font-bold" />
          </motion.div>
        </div>
      </section>

      {/* Long Form Videos */}
      <section className="section container">
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Long Form Works</h2>
        <div className="project-grid">
          {longProjects.map((project, i) => (
            <SpotlightCard key={i} className="video-card video-card-long">
              <div className="absolute top-6 left-6 z-10 bg-black/50 p-3 rounded-full backdrop-blur-md">
                {project.icon}
              </div>
              <h3 className="relative z-10">{project.title}</h3>
              <p className="relative z-10">{project.category}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Short Form Videos (9:16) */}
      <section className="section container" style={{ paddingTop: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Shorts & Reels</h2>
        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {shortProjects.map((project, i) => (
            <SpotlightCard key={i} className="video-card video-card-short">
              <div className="absolute top-6 left-6 z-10 bg-black/50 p-3 rounded-full backdrop-blur-md">
                {project.icon}
              </div>
              <h3 className="relative z-10">{project.title}</h3>
              <p className="relative z-10">{project.category}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title mb-4">Let's Work Together</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Available for freelance opportunities. Let's create something extraordinary that captivates your audience.
          </p>
          <button className="contact-btn flex items-center gap-2 mx-auto mt-8">
            <Mail size={20} />
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
