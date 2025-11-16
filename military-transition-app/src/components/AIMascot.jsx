import { useState, useEffect } from 'react'

/**
 * Animated AI Mascot - Clippy-style assistant character
 * Features different expressions and idle animations
 */
export default function AIMascot({ mood = 'happy', isThinking = false }) {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    // Idle animation - occasional bounce
    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const expressions = {
    happy: {
      eyes: '^^',
      mouth: '◡',
      color: 'from-blue-400 to-blue-600'
    },
    thinking: {
      eyes: '◉◉',
      mouth: '○',
      color: 'from-purple-400 to-purple-600'
    },
    helpful: {
      eyes: '◕◕',
      mouth: '‿',
      color: 'from-green-400 to-green-600'
    },
    waving: {
      eyes: '^_^',
      mouth: '▽',
      color: 'from-yellow-400 to-orange-500'
    }
  }

  const currentMood = isThinking ? 'thinking' : mood
  const expression = expressions[currentMood] || expressions.happy

  return (
    <div className={`relative ${bounce ? 'animate-bounce' : ''}`}>
      {/* Main mascot body */}
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${expression.color} shadow-lg flex flex-col items-center justify-center transition-all duration-300`}>
        {/* Eyes */}
        <div className="text-2xl text-white mb-1 tracking-wider">
          {expression.eyes}
        </div>

        {/* Mouth */}
        <div className="text-3xl text-white">
          {expression.mouth}
        </div>

        {/* Thinking indicator */}
        {isThinking && (
          <div className="absolute -top-2 -right-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Waving hand animation */}
      {mood === 'waving' && (
        <div className="absolute -right-4 top-2 text-3xl animate-wave origin-bottom-right">
          👋
        </div>
      )}
    </div>
  )
}
