import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Banner {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  productId?: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  createdAt: string;
  sourceType: 'youtube' | 'file';
}

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^?&]+)/);
  const videoId = match ? match[1] : '';
  return {
    embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=0&controls=0&modestbranding=1&rel=0`,
    videoId,
  };
};

const NewProductsBanner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mockBanners: Banner[] = [
      {
        id: '1',
        title: 'New MacBook Air M4',
        description: 'Experience unprecedented performance with the new M4 chip.',
        videoUrl: 'https://www.youtube.com/watch?v=QWXLUHRIUEk',
        ctaText: 'Shop Now',
        ctaLink: '/products/macbook-pro-m3',
        isActive: true,
        createdAt: '2024-01-15',
        sourceType: 'youtube',
      },
      {
        id: '2',
        title: 'Creator Studio Laptop',
        description: 'Built for creators with 4K OLED display and powerhouse performance.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        ctaText: 'Learn More',
        ctaLink: '/products?category=creator',
        isActive: true,
        createdAt: '2024-01-05',
        sourceType: 'file',
      },
    ];

    setBanners(mockBanners.filter((banner) => banner.isActive));
    setIsLoading(false);
  }, []);

  // For YouTube fallback (simulate switching after 20s)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (banners.length && banners[currentBannerIndex]?.sourceType === 'youtube') {
      timeout = setTimeout(() => {
        goToNextBanner();
      }, 20000); // 20s fallback timer (adjust as needed)
    }
    return () => clearTimeout(timeout);
  }, [currentBannerIndex, banners]);

  const goToNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentBannerIndex];

  if (isLoading || banners.length === 0) return null;

  const { embedUrl } =
    currentBanner.sourceType === 'youtube'
      ? getYouTubeEmbedUrl(currentBanner.videoUrl)
      : { embedUrl: '' };

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Launches</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our newest products and exclusive launches. Be the first to experience cutting-edge technology.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-[500px] md:h-[600px]">
                {currentBanner.sourceType === 'youtube' ? (
                  <iframe
                    src={embedUrl}
                    className="absolute w-full h-full inset-0"
                    style={{ border: 'none' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={currentBanner.videoUrl}
                    autoPlay
                    muted
                    playsInline
                    onEnded={goToNextBanner}
                    className="absolute w-full h-full object-cover inset-0"
                  />
                )}

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/40 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h3 className="text-4xl md:text-5xl font-bold mb-4">
                          {currentBanner.title}
                        </h3>
                        <p className="text-xl text-gray-200 mb-8">
                          {currentBanner.description}
                        </p>
                        <Link
                          to={currentBanner.ctaLink}
                          className="inline-flex items-center justify-center px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors"
                        >
                          {currentBanner.ctaText}
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % banners.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Dots */}
          {banners.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentBannerIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewProductsBanner;