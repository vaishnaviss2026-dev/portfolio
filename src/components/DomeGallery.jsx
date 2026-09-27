import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const DomeGallery = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px', overflow: 'hidden' }}>
      
      {/* Navigation */}
      <button onClick={handlePrev} style={{ position: 'absolute', left: '5%', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ChevronLeft size={24} />
      </button>

      <div style={{ position: 'relative', width: '280px', height: '400px', transformStyle: 'preserve-3d' }}>
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const offset = (i - currentIndex + items.length) % items.length;
            
            const isActive = offset === 0;
            const isPrev = offset === items.length - 1;
            const isNext = offset === 1;
            
            if (!isActive && !isPrev && !isNext) return null;

            let x = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 1;
            let rotateY = 0;
            
            if (isPrev) { x = -200; scale = 0.8; opacity = 0.5; zIndex = 1; rotateY = 15; }
            if (isNext) { x = 200; scale = 0.8; opacity = 0.5; zIndex = 1; rotateY = -15; }
            if (isActive) { x = 0; scale = 1; opacity = 1; zIndex = 5; rotateY = 0; }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: x > 0 ? 300 : -300 }}
                animate={{ opacity, x, scale, zIndex, rotateY }}
                exit={{ opacity: 0, x: x > 0 ? -300 : 300 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  backgroundColor: '#111',
                  overflow: 'hidden',
                  cursor: isActive ? 'pointer' : 'pointer',
                  boxShadow: isActive ? '0 20px 40px rgba(227, 58, 36, 0.3)' : '0 10px 20px rgba(0,0,0,0.5)'
                }}
                onClick={() => {
                  if (isActive && item.videoSrc) setActiveVideo(item.videoSrc);
                  if (isNext) handleNext();
                  if (isPrev) handlePrev();
                }}
              >
                {/* Background/Poster */}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: item.color || '#222', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: item.poster ? `url(${item.poster})` : 'none', opacity: isActive ? 1 : 0.6 }} />
                
                {/* Play Button for active item */}
                {item.videoSrc && isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(227, 58, 36, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(227,58,36,0.5)' }}>
                      <Play fill="white" size={24} />
                    </div>
                  </motion.div>
                )}
                
                {/* Text Content */}
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '2rem 1.5rem 1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                  <h3 style={{ color: 'white', margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.9rem' }}>{item.category}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button onClick={handleNext} style={{ position: 'absolute', right: '5%', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ChevronRight size={24} />
      </button>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <button 
              onClick={() => setActiveVideo(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <motion.video 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={activeVideo} 
              controls 
              autoPlay 
              style={{ maxWidth: '90%', maxHeight: '85vh', borderRadius: '12px', outline: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
