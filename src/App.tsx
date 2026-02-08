import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Music, VolumeX, ChevronLeft, Share2, Volume2, PartyPopper, Camera, MessageCircle } from 'lucide-react';

const days = [
  {
    title: 'Rose Day',
    text: 'One rose, many meanings—but every petal whispers your name.',
    gradient: 'from-rose-400 via-pink-300 to-red-400',
    emoji: '🌹',
  },
  {
    title: 'Propose Day',
    text: 'I don\'t need a grand speech, just a brave heart asking, "Is it you and me?"',
    gradient: 'from-purple-400 via-pink-400 to-rose-400',
    emoji: '💍',
  },
  {
    title: 'Chocolate Day',
    text: 'Life\'s sweeter when shared—and somehow, you\'re my favorite flavor.',
    gradient: 'from-amber-300 via-rose-300 to-pink-400',
    emoji: '🍫',
  },
  {
    title: 'Teddy Day',
    text: 'When I can\'t hold you, this little bear stands guard over my feelings.',
    gradient: 'from-pink-300 via-rose-400 to-red-300',
    emoji: '🧸',
  },
  {
    title: 'Promise Day',
    text: 'No drama, no lies—just a quiet promise to choose you, again and again.',
    gradient: 'from-violet-400 via-purple-300 to-pink-300',
    emoji: '🤝',
  },
  {
    title: 'Hug Day',
    text: 'Some hugs don\'t need arms—they just feel like home.',
    gradient: 'from-blue-300 via-purple-300 to-pink-400',
    emoji: '🤗',
  },
  {
    title: 'Kiss Day',
    text: 'One kiss, not rushed, not loud—just enough to say everything.',
    gradient: 'from-red-400 via-pink-400 to-rose-300',
    emoji: '💋',
  },
  {
    title: 'Valentine\'s Day',
    text: 'Today isn\'t about the world—it\'s about me choosing you, without hesitation.',
    gradient: 'from-rose-500 via-red-400 to-pink-500',
    emoji: '❤️',
    final: true,
  },
];

function FloatingHearts() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
          }}
          animate={{
            y: -100,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          <Heart size={Math.random() * 20 + 10} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ['#ff6b9d', '#ffd93d', '#6bcf7f', '#a78bfa', '#fb923c'][i % 5],
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 0.5,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [interactiveHeartClicks, setInteractiveHeartClicks] = useState(0);
  const [showShareMessage, setShowShareMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const noMessages = [
    'Nice try.',
    'Be serious.',
    'You know that\'s not happening.',
    'Come on now...',
    'Really?',
    'Stop playing.',
    'You\'re cute when you try.',
    'Not today.',
    'Nope.',
    '😏',
  ];

  const reasons = [
    'Your smile lights up every room',
    'You make ordinary moments feel magical',
    'Your laugh is my favorite sound',
    'You see the best in everyone',
    'You make me want to be better',
    'Your kindness knows no bounds',
    'You\'re beautifully authentic',
    'Every moment with you feels right',
  ];

  const day = days[currentDay];

  useEffect(() => {
    // Create a simple heartbeat sound effect simulation
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleYes = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowConfetti(true);
    
    // Play success sound effect
    playSound();
    
    setTimeout(() => {
      setShowConfetti(false);
      if (currentDay < days.length - 1) {
        setCurrentDay(currentDay + 1);
        setNoAttempts(0);
        setNoButtonPos({ x: 0, y: 0 });
      }
      setIsTransitioning(false);
    }, 1500);
  };

  const handleNoInteraction = () => {
    const maxX = window.innerWidth < 640 ? 100 : 200;
    const maxY = window.innerWidth < 640 ? 80 : 150;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    setNoButtonPos({ x: newX, y: newY });
    setNoAttempts(prev => prev + 1);
  };

  const playSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Valentine\'s Week',
        text: 'Someone made something special for you ❤️',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareMessage(true);
      setTimeout(() => setShowShareMessage(false), 2000);
    }
  };

  const handleBackDay = () => {
    if (currentDay > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentDay(currentDay - 1);
        setNoAttempts(0);
        setNoButtonPos({ x: 0, y: 0 });
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleInteractiveHeart = () => {
    setInteractiveHeartClicks(prev => prev + 1);
    playSound();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        key={currentDay}
        className={`absolute inset-0 bg-gradient-to-br ${day.gradient}`}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Subtle gradient animation overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <FloatingHearts />
      
      {showConfetti && <Confetti />}

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBackDay}
          disabled={currentDay === 0}
          className="p-3 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="flex gap-2">
          {/* Music Toggle */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMusicPlaying(!musicPlaying)}
            className="p-3 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 text-white shadow-lg"
          >
            {musicPlaying ? <Music size={20} /> : <VolumeX size={20} />}
          </motion.button>

          {/* Share Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-3 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 text-white shadow-lg"
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </div>

      {/* Share Message */}
      <AnimatePresence>
        {showShareMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-30 backdrop-blur-xl bg-white/20 px-6 py-3 rounded-full border border-white/30 text-white shadow-lg"
          >
            Link copied! ✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Heart Counter (Easter Egg) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-4 right-4 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleInteractiveHeart}
          className="p-4 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 text-white shadow-lg"
        >
          <Heart size={24} fill={interactiveHeartClicks > 5 ? 'white' : 'none'} />
        </motion.button>
        {interactiveHeartClicks > 10 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap backdrop-blur-xl bg-white/20 px-3 py-1 rounded-full text-white text-xs"
          >
            You found the secret! 💕
          </motion.div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -50, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl"
          >
            {/* Glass Card */}
            <motion.div
              className="relative backdrop-blur-[40px] bg-white/10 rounded-[32px] p-8 md:p-16 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] border border-white/20"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_60px_rgba(255,255,255,0.1)]" />

              {/* Day Counter */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/20 px-6 py-2 rounded-full border border-white/30 shadow-lg"
              >
                <p className="text-white/90 font-medium text-sm tracking-wide">
                  Day {currentDay + 1} of 8
                </p>
              </motion.div>

              {/* Emoji decoration */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-8 -right-4 text-5xl"
              >
                {day.emoji}
              </motion.div>

              {/* Sparkle decoration */}
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-4 -left-4 text-white/30"
              >
                <Sparkles size={32} />
              </motion.div>

              <div className="relative space-y-6">
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-white text-center tracking-tight"
                  style={{ fontFamily: 'SF Pro Display, Poppins, system-ui, sans-serif' }}
                >
                  {day.title}
                </motion.h1>

                {/* Poetic Line */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-3xl text-white/90 text-center leading-relaxed font-light px-2"
                  style={{ fontFamily: 'SF Pro Display, Poppins, system-ui, sans-serif' }}
                >
                  {day.text}
                </motion.p>

                {/* Question Text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl text-white font-medium text-center pt-4"
                  style={{ fontFamily: 'SF Pro Display, Poppins, system-ui, sans-serif' }}
                >
                  {day.final ? 'So... what do you say?' : 'Are we doing it together?'}
                </motion.p>

                {/* Final Day Special Message */}
                {day.final && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="pt-4"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="text-center"
                    >
                      <Heart
                        className="inline-block text-white mb-2"
                        size={48}
                        fill="white"
                      />
                    </motion.div>

                    {/* Reasons Toggle */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReasons(!showReasons)}
                      className="mt-4 mx-auto block px-6 py-2 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 text-white text-sm font-medium"
                    >
                      {showReasons ? 'Hide' : 'Why you? 💭'}
                    </motion.button>

                    {/* Reasons List */}
                    <AnimatePresence>
                      {showReasons && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 space-y-3"
                        >
                          {reasons.map((reason, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="backdrop-blur-xl bg-white/10 px-4 py-3 rounded-2xl border border-white/20 text-white/90 text-sm text-center"
                            >
                              {reason}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                >
                  {/* Yes Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    disabled={isTransitioning}
                    className="relative group px-12 py-5 rounded-[20px] bg-white/90 backdrop-blur-xl text-rose-600 font-semibold text-xl shadow-[0_8px_24px_rgba(255,255,255,0.3)] border border-white/50 overflow-hidden disabled:opacity-50"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <span className="relative flex items-center gap-2">
                      💖 Yes
                    </span>
                  </motion.button>

                  {/* No Button - Only show if not final day */}
                  {!day.final && (
                    <div className="relative touch-none">
                      <motion.button
                        animate={{
                          x: noButtonPos.x,
                          y: noButtonPos.y,
                          scale: noAttempts > 0 ? 0.9 : 1,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        onHoverStart={handleNoInteraction}
                        onClick={handleNoInteraction}
                        onTouchStart={handleNoInteraction}
                        className="px-12 py-5 rounded-[20px] bg-white/10 backdrop-blur-xl text-white/70 font-semibold text-xl border border-white/20 cursor-pointer touch-none"
                      >
                        💔 No
                      </motion.button>

                      {/* Teasing message */}
                      <AnimatePresence>
                        {noAttempts > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/80 text-sm font-medium backdrop-blur-xl bg-white/10 px-3 py-1 rounded-full"
                          >
                            {noMessages[Math.min(noAttempts - 1, noMessages.length - 1)]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Progress Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-2 mt-8"
            >
              {days.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentDay
                      ? 'w-8 bg-white'
                      : index < currentDay
                      ? 'w-2 bg-white/50'
                      : 'w-2 bg-white/20'
                  }`}
                  animate={
                    index === currentDay
                      ? {
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Fun Fact Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-6 text-white/60 text-sm"
            >
              💡 Tap the heart in the corner for a surprise
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;