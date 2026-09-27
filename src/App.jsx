import React from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Film, Scissors, Sparkles, Mail, ArrowRight, MonitorPlay } from 'lucide-react';
import './index.css';
import ThinkingDots from './ThinkingDots';

import heroImg from './assets/hero.png';

const Marquee = ({ items, className = '' }) => {
  return (
    <div className={`marquee-container ${className}`}>
      <div className="marquee-content">
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="marquee-item">
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DynamicBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030303] pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', backgroundColor: '#030303', pointerEvents: 'none' }}>
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(227, 58, 36, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <motion.div
        animate={{
          x: [0, -120, 120, 0],
          y: [0, -80, 80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(150, 20, 20, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />
      <motion.div
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', top: '40%', left: '40%', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(227, 58, 36, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <div 
        style={{ 
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      ></div>
    </div>
  );
};

const WorkCard = ({ title, category, ratio, icon }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="work-card"
  >
    <div className={`work-card-img ${ratio} bg-zinc-900`}>
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {icon}
      </div>
      <div className="play-button">
        <Play fill="white" size={24} />
      </div>
    </div>
    <div className="work-card-content">
      <h3 className="work-card-title">{title}</h3>
      <p className="work-card-category">{category}</p>
    </div>
  </motion.div>
);

const LogoImg = ({ src, color, size = 32 }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: color,
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center'
  }} />
);

const App = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const videoTools = [
    { name: "Premiere Pro", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/adobepremierepro.svg" color="#EA77FF" size={28} /> },
    { name: "After Effects", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@9.0.0/icons/adobeaftereffects.svg" color="#9999FF" size={28} /> },
    { name: "DaVinci Resolve", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/davinciresolve.svg" color="#ff7a59" size={28} /> },
    { name: "Final Cut Pro", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/finalcutpro.svg" color="#ffffff" size={28} /> },
  ];

  const aiTools = [
    { name: "Midjourney", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/midjourney.svg" color="#ffffff" size={28} /> },
    { name: "RunwayML", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/runway.svg" color="#ffffff" size={28} /> },
    { name: "OpenAI", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" color="#00a67e" size={28} /> },
    { name: "ElevenLabs", icon: <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/elevenlabs.svg" color="#ffffff" size={28} /> },
  ];

  return (
    <>
      <ThinkingDots />
      <DynamicBackground />
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="nav-logo">VS.</div>
          <div className="nav-links">
            <span className="nav-link" onClick={() => scrollTo('home')}>Home</span>
            <span className="nav-link" onClick={() => scrollTo('about')}>About</span>
            <span className="nav-link" onClick={() => scrollTo('work')}>Work</span>
            <span className="nav-link" onClick={() => scrollTo('contact')}>Contact</span>
          </div>
        </div>
      </nav>

      <main id="home">
        <section className="hero container">
          <div className="hero-bg-glow"></div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Crafting <br />
              <span style={{ color: 'var(--accent)' }}>Visual Stories.</span>
            </h1>
            <p className="hero-tagline">"I fix it in post so you don't have to."</p>
            <p className="hero-desc">
              Hi, I'm Vaishnavi Shrivastava. I'm a video editor and creative professional specializing in motion graphics, short-form and long-form content, and AI-powered visuals. Let's make something amazing together.
            </p>
            <button className="contact-btn" onClick={() => scrollTo('work')}>
              View My Work <ArrowRight size={20} />
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image-container"
          >
            <img src={heroImg} alt="Vaishnavi" className="hero-image" />
          </motion.div>
        </section>

        <section id="about" className="section container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            I am passionate about visual storytelling. With a strong foundation in video editing and a deep interest in modern AI tools, I blend traditional editing techniques with cutting-edge technology to create engaging and dynamic content. My approach is centered on rhythm, pacing, and visual impact.
          </p>
        </section>

        <div id="work">
          <Marquee items={videoTools} />

          <section className="section container">
            <h2 className="section-title">Motion Graphics</h2>
            <div className="grid-2">
              <WorkCard title="Neon Dreams" category="Animation & Motion" ratio="ratio-16-9" icon={<Video size={48} />} />
              <WorkCard title="Cyberpunk HUD" category="UI Animation" ratio="ratio-16-9" icon={<Film size={48} />} />
            </div>
          </section>

          <section className="section container">
            <h2 className="section-title">Short-Form</h2>
            <p className="section-subtitle">High-retention edits for Instagram Reels and YouTube Shorts.</p>
            <div className="grid-4">
              <WorkCard title="Vlog Style edit" category="Reels" ratio="ratio-9-16" icon={<Scissors size={48} />} />
              <WorkCard title="Dynamic Captions" category="TikTok" ratio="ratio-9-16" icon={<Scissors size={48} />} />
              <WorkCard title="Gaming Highlight" category="Shorts" ratio="ratio-9-16" icon={<Play size={48} />} />
              <WorkCard title="Product Showcase" category="Reels" ratio="ratio-9-16" icon={<Scissors size={48} />} />
            </div>
          </section>

          <section className="section container">
            <h2 className="section-title">Long-Form</h2>
            <p className="section-subtitle">Documentaries, YouTube videos, and podcasts.</p>
            <div className="grid-2">
              <WorkCard title="Tech Review 2026" category="YouTube Video" ratio="ratio-16-9" icon={<Film size={48} />} />
              <WorkCard title="Creative Podcast" category="Multi-cam Edit" ratio="ratio-16-9" icon={<Film size={48} />} />
            </div>
          </section>

          <Marquee items={aiTools} />

          <section className="section container">
            <h2 className="section-title">AI Creative Work</h2>
            <p className="section-subtitle">Exploring the boundaries of AI generation and enhancement.</p>
            <div className="grid-3">
              <WorkCard title="Surreal Landscapes" category="AI Generation" ratio="ratio-1-1" icon={<Sparkles size={48} />} />
              <WorkCard title="Avatar Animation" category="AI Video" ratio="ratio-1-1" icon={<Sparkles size={48} />} />
              <WorkCard title="Upscaled Classics" category="AI Enhancement" ratio="ratio-1-1" icon={<Sparkles size={48} />} />
            </div>
          </section>
        </div>

        <section id="contact" className="section container" style={{ textAlign: 'center', padding: '12rem 0' }}>
          <h2 className="section-title">Ready to create?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Available for freelance opportunities. Let's make something extraordinary.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <button className="contact-btn">
              <Mail size={20} /> Book a Call
            </button>
          </div>
          <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
            vaishnavi.edit@example.com
          </p>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <LogoImg src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/whatsapp.svg" color="#25D366" size={32} />
      </a>
    </>
  );
};

export default App;
