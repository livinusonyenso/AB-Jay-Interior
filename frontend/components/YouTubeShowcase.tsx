import React, { useState, useRef, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

interface YouTubeShowcaseProps {
  videos: string[]; // Array of YouTube URLs or IDs
  title?: string;
}

const YouTubeShowcase: React.FC<YouTubeShowcaseProps> = ({ 
  videos, 
  title = "Design in Action" 
}) => {
  const [videoList, setVideoList] = useState<YouTubeVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Extract video IDs and fetch thumbnails
  useEffect(() => {
    const extractVideoId = (url: string): string | null => {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : null;
    };

    const formattedVideos = videos.map(url => {
      const id = extractVideoId(url) || url; // If it's already an ID, use it directly
      return {
        id,
        title: `Video ${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      };
    }).filter(video => video.id !== null) as YouTubeVideo[];

    setVideoList(formattedVideos);
  }, [videos]);

  const nextVideo = () => {
    setCurrentIndex(prev => 
      prev >= videoList.length - 1 ? 0 : prev + 1
    );
  };

  const prevVideo = () => {
    setCurrentIndex(prev => 
      prev <= 0 ? videoList.length - 1 : prev - 1
    );
  };

  const playVideo = (id: string) => {
    setIsPlaying(id);
  };

  const closeVideo = () => {
    setIsPlaying(null);
  };

  // Handle swipe for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextVideo();
    } else if (touchEnd - touchStart > 50) {
      prevVideo();
    }
  };

  // Lucide-react icons as inline SVG components
  const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );

  const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );

  const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" fill="white" stroke="white"/>
    </svg>
  );

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10 relative">
          {title}
          <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-14 h-1 bg-red-600 rounded"></span>
        </h2>
        
        <div className="relative flex items-center justify-center mb-8">
          <button 
            className="bg-white rounded-full p-3 shadow-lg hover:bg-red-600 hover:text-white transition-all duration-300 mx-2 hidden md:block"
            onClick={prevVideo}
          >
            <ChevronLeft />
          </button>
          
          <div 
            className="w-full max-w-4xl overflow-hidden rounded-xl shadow-xl"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videoList.map((video, index) => (
              <div 
                key={video.id} 
                className={`transition-transform duration-300 ${index === currentIndex ? 'block' : 'hidden'}`}
              >
                {isPlaying === video.id ? (
                  <div className="relative aspect-video">
                    <button 
                      className="absolute top-3 right-3 z-10 bg-black bg-opacity-70 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl"
                      onClick={closeVideo}
                    >
                      ×
                    </button>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      className="w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div 
                    className="relative aspect-video cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => playVideo(video.id)}
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-50">
                      <div className="bg-red-600 bg-opacity-90 rounded-full p-4 flex items-center justify-center">
                        <PlayIcon />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            className="bg-white rounded-full p-3 shadow-lg hover:bg-red-600 hover:text-white transition-all duration-300 mx-2 hidden md:block"
            onClick={nextVideo}
          >
            <ChevronRight />
          </button>
        </div>
        
        <div className="flex justify-center space-x-3">
          {videoList.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-red-600 scale-110' : 'bg-blue-300'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeShowcase;