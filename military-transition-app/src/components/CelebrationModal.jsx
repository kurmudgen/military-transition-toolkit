import { useEffect, useState } from 'react'

/**
 * Full-screen celebration overlay for level ups, missions, milestones.
 * CSS-only confetti (no heavy libraries).
 * Auto-dismisses after 5 seconds or on click.
 */
export default function CelebrationModal({ celebration, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState([])

  useEffect(() => {
    if (celebration) {
      // Generate confetti
      const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 2,
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'][
          Math.floor(Math.random() * 6)
        ],
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
      }))
      setConfettiPieces(pieces)
      setVisible(true)

      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onDismiss, 300)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [celebration, onDismiss])

  if (!celebration) return null

  const bgColor =
    celebration.type === 'level_up'
      ? 'from-blue-600 to-purple-600'
      : celebration.type === 'mission'
        ? 'from-green-600 to-teal-600'
        : celebration.type === 'milestone'
          ? 'from-yellow-600 to-orange-600'
          : 'from-blue-500 to-blue-600'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => { setVisible(false); setTimeout(onDismiss, 300) }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className="absolute animate-confetti-fall"
            style={{
              left: `${p.left}%`,
              top: '-10px',
              width: `${p.size}px`,
              height: `${p.size * 0.6}px`,
              backgroundColor: p.color,
              borderRadius: '1px',
              transform: `rotate(${p.rotation}deg)`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 bg-gradient-to-br ${bgColor} rounded-2xl p-8 text-center text-white max-w-sm mx-4 shadow-2xl transform transition-transform duration-300 ${
          visible ? 'scale-100' : 'scale-90'
        }`}
      >
        {celebration.badge && (
          <div className="text-5xl mb-3">{celebration.badge}</div>
        )}
        <h2 className="text-2xl font-bold mb-2">{celebration.title}</h2>
        <p className="text-white/90 mb-4">{celebration.description}</p>
        <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
          +{celebration.xpGained} XP
        </div>
        {celebration.newRank && (
          <p className="mt-3 text-sm text-white/80">
            New Rank: {celebration.newRank.rank} — {celebration.newRank.title}
          </p>
        )}
        <p className="mt-4 text-xs text-white/50">Click anywhere to continue</p>
      </div>

      {/* Confetti animation keyframes injected via style tag */}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  )
}
