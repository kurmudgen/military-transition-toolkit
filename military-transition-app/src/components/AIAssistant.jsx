import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AIMascot from './AIMascot'
import { trackButtonClick } from '../utils/analytics'

/**
 * AI Assistant - Local privacy-first AI helper
 * Uses lightweight model for contextual tips and assistance
 */
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mascotMood, setMascotMood] = useState('happy')
  const [isModelLoading, setIsModelLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const location = useLocation()

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('aiChatHistory')
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (e) {
        console.error('Error loading chat history:', e)
      }
    }
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('aiChatHistory', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Contextual tips based on current page
  const getPageContext = () => {
    const path = location.pathname
    const contexts = {
      '/app': 'home dashboard',
      '/app/progress': 'progress tracking',
      '/app/reminders': 'reminders and appointments',
      '/app/calculator': 'retirement calculator',
      '/app/va-claims': 'VA disability claims',
      '/app/benefits': 'state benefits comparison',
      '/app/appointments': 'medical appointments tracking',
      '/app/profile': 'profile management',
      '/app/resources': 'transition resources',
      '/app/faq': 'frequently asked questions'
    }
    return contexts[path] || 'military transition planning'
  }

  // Contextual quick tips based on page
  const getQuickTips = () => {
    const path = location.pathname
    const tips = {
      '/app': [
        'Start your transition checklist early - 12-18 months before separation is ideal',
        'Complete your profile to enable auto-fill features across the app',
        'Check your progress dashboard regularly to stay on track'
      ],
      '/app/progress': [
        'Break down large tasks into smaller, manageable steps',
        'Check off tasks as you complete them to track your progress',
        'Custom tasks can be added to any category'
      ],
      '/app/calculator': [
        'Use the "Fill from Profile" button to auto-populate your information',
        'Your High-3 pay is the average of your highest 36 months of basic pay',
        'Remember to factor in state taxes when planning your retirement location'
      ],
      '/app/va-claims': [
        'Document everything - keep copies of all medical records',
        'File your claim 180-90 days before separation',
        'Consider working with a VSO for complex claims'
      ],
      '/app/appointments': [
        'Request medical records 6-12 months before separation',
        'Attend all recommended appointments before separating',
        'Keep detailed notes about your conditions and symptoms'
      ]
    }
    return tips[path] || [
      'All your data stays on your device - we have zero access',
      'Export backups regularly from the Settings page',
      'Use the search in Resources to find specific information'
    ]
  }

  // Simple rule-based responses (offline-capable)
  const generateResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! 👋 I'm your Military Transition Assistant. I'm here to help guide you through your transition journey. What can I help you with today?"
    }

    // Page-specific help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      const context = getPageContext()
      return `I can help you with ${context}! I can:\n\n• Answer questions about military transition\n• Provide tips for this page\n• Guide you through using features\n• Explain VA benefits and claims\n• Help with retirement planning\n\nJust ask me anything!`
    }

    // Quick tips
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
      const tips = getQuickTips()
      const randomTip = tips[Math.floor(Math.random() * tips.length)]
      return `💡 Here's a tip: ${randomTip}`
    }

    // VA Claims
    if (lowerMessage.includes('va claim') || lowerMessage.includes('disability')) {
      return "For VA disability claims:\n\n1. File 180-90 days before separation\n2. Document all service-connected conditions\n3. Attend all C&P exams\n4. Keep copies of everything\n5. Consider working with a VSO\n\nThe VA Claims Builder in this app can help you organize your claim!"
    }

    // Retirement
    if (lowerMessage.includes('retire') || lowerMessage.includes('pension')) {
      return "Military retirement pay is calculated as:\n\n• High-3: 2.5% × years of service × high-3 pay\n• BRS: 2.0% × years of service × high-3 pay + TSP matching\n\nUse the Retirement Calculator in this app to see your estimated retirement pay!"
    }

    // Timeline
    if (lowerMessage.includes('timeline') || lowerMessage.includes('when')) {
      return "Recommended transition timeline:\n\n• 18-24 months: Start planning\n• 12 months: Complete TAP/TGPS\n• 180 days: File VA claims\n• 90 days: Job search, finalize plans\n• 30 days: Final out-processing\n\nCheck the Progress Dashboard to track your milestones!"
    }

    // Benefits
    if (lowerMessage.includes('benefit') || lowerMessage.includes('entitlement')) {
      return "Key benefits to explore:\n\n• GI Bill (education)\n• VA Healthcare\n• VA Home Loan\n• Transition Assistance\n• State veteran benefits\n• TRICARE options\n\nCheck the Resources page for detailed information!"
    }

    // Default response with contextual help
    const context = getPageContext()
    return `I'm here to help with ${context}! While I'm a simple assistant, I can provide tips and guidance. Try asking about:\n\n• VA claims\n• Retirement planning\n• Transition timeline\n• Benefits\n• Or say "tip" for helpful advice!`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setMascotMood('helpful')

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, newUserMessage])

    // Show typing indicator
    setIsTyping(true)
    setMascotMood('thinking')

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate response
    const response = await generateResponse(userMessage)

    // Add AI response
    const newAIMessage = {
      id: Date.now() + 1,
      text: response,
      sender: 'ai',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, newAIMessage])
    setIsTyping(false)
    setMascotMood('happy')

    trackButtonClick('AI Assistant - Send Message')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
      setMascotMood('waving')
      setTimeout(() => setMascotMood('happy'), 1000)

      // Send welcome message if this is the first time
      if (messages.length === 0) {
        const welcomeMessage = {
          id: Date.now(),
          text: `Welcome! 👋 I'm your Military Transition Assistant. I'm here to help you navigate your transition journey. All conversations stay private on your device.\n\nTry asking me about VA claims, retirement planning, or just say "help" to see what I can do!`,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
        setMessages([welcomeMessage])
      }
    }
    trackButtonClick('AI Assistant - Toggle')
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
    trackButtonClick('AI Assistant - Minimize')
  }

  const clearHistory = () => {
    if (confirm('Clear all chat history? This cannot be undone.')) {
      setMessages([])
      localStorage.removeItem('aiChatHistory')
      trackButtonClick('AI Assistant - Clear History')
    }
  }

  const quickActions = [
    { label: 'Timeline Help', query: 'Show me the transition timeline' },
    { label: 'VA Claims', query: 'How do I file VA claims?' },
    { label: 'Retirement Info', query: 'Explain retirement pay' },
    { label: 'Quick Tip', query: 'Give me a tip' }
  ]

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-900 flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AIMascot mood={mascotMood} isThinking={isTyping} />
              <div>
                <h3 className="text-white font-bold">Transition Assistant</h3>
                <p className="text-blue-100 text-xs">Always here to help 🎖️</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleMinimize}
                className="text-white hover:bg-white/20 rounded p-2 transition"
                aria-label="Minimize"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={toggleOpen}
                className="text-white hover:bg-white/20 rounded p-2 transition"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900" style={{ height: '400px' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputValue(action.query)
                          setTimeout(handleSendMessage, 100)
                        }}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your transition..."
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
                  >
                    Send
                  </button>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-red-600 mt-2"
                  >
                    Clear history
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
