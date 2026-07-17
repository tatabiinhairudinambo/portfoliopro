import React, { useRef } from 'react';
import { useTransform, motion, useScroll } from 'framer-motion';

export default function StackingCardGallery({ albums, openAlbum }) {
  const container = useRef(null);
  
  // Track progress of the container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className="relative w-full mb-10 pb-[10vh]">
      <div className="text-white w-full">
        {albums.map((album, i) => {
          const targetScale = 1 - (albums.length - i) * 0.05;
          return (
            <Card
              key={`album_${i}`}
              i={i}
              album={album}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              openAlbum={openAlbum}
            />
          );
        })}
      </div>
    </div>
  );
}

const Card = ({
  i,
  album,
  progress,
  range,
  targetScale,
  openAlbum
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const caption = album.media?.[0]?.caption || 'Jelajahi album ini lebih lanjut.';

  return (
    <div
      ref={container}
      className='min-h-[80vh] flex items-center justify-center sticky top-20 py-10 md:py-0'
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 30}px)`,
        }}
        onClick={() => openAlbum(i)}
        className='flex flex-col relative h-auto md:h-[450px] w-full max-w-5xl rounded-3xl bg-dark/90 backdrop-blur-xl border border-white/10 lg:p-10 sm:p-6 p-5 origin-top cursor-pointer group shadow-2xl overflow-hidden'
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h2 className='text-3xl md:text-4xl text-center font-display font-semibold mb-6 md:mb-8 text-white relative z-10 capitalize'>
          {album.title}
        </h2>
        
        <div className='flex flex-col md:flex-row h-full gap-6 md:gap-10 relative z-10'>
          <div className='w-full md:w-[40%] flex flex-col justify-center order-2 md:order-1'>
            <p className='text-white/70 text-base md:text-lg leading-relaxed'>
              {caption}
            </p>
            <span className='flex items-center gap-2 pt-6 text-blue-400 group-hover:text-blue-300 transition-colors font-medium'>
              <span>Lihat Koleksi</span>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='currentColor'
                />
              </svg>
            </span>
          </div>

          <div className='relative w-full md:w-[60%] h-[200px] md:h-full rounded-2xl overflow-hidden order-1 md:order-2 border border-white/5'>
            <motion.div
              className='w-full h-full'
              style={{ scale: imageScale }}
            >
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${album.thumbnail})` }} 
              />
              
              {album.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-blue-500/80 transition-all duration-300">
                    <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4l12 6-12 6z" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
