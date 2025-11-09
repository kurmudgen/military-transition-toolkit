import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { RESOURCE_DATABASE, RESOURCE_CATEGORIES, RESOURCE_TYPES, AVAILABLE_TAGS } from '../data/resourcesDatabase'
import {
  getResourceRatings,
  saveResourceRating as saveRatingDB,
  getCustomResources,
  createCustomResource,
  updateCustomResource,
  deleteCustomResource
} from '../services/resourceService'

export default function Resources({ publicMode = false }) {
  const [resources, setResources] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [showOnlyOfficial, setShowOnlyOfficial] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingResource, setEditingResource] = useState(null)
  const [userRatings, setUserRatings] = useState({})
  const [expandedCategories, setExpandedCategories] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'career',
    type: 'website',
    tags: []
  })

  // Database loading/saving states
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    trackPageView('/app/resources')
    loadResources()
  }, [publicMode])

  const loadResources = async () => {
    // PUBLIC MODE: Only show official database resources
    if (publicMode) {
      setResources(RESOURCE_DATABASE)
      setLoading(false)
      return
    }

    // AUTHENTICATED MODE: Load from database
    try {
      setLoading(true)
      setError(null)

      const [customResources, ratings] = await Promise.all([
        getCustomResources(),
        getResourceRatings()
      ])

      // Merge official database with custom resources from database
      setResources([...RESOURCE_DATABASE, ...(customResources || [])])
      setUserRatings(ratings || {})

      console.log('✓ Resources loaded from database')
    } catch (err) {
      console.error('Error loading resources:', err)
      setError('Failed to load resources. Please refresh the page.')
      setResources(RESOURCE_DATABASE)
    } finally {
      setLoading(false)
    }
  }

  const saveUserRating = async (resourceId, rating) => {
    try {
      setSaving(true)
      setError(null)

      await saveRatingDB(resourceId, rating)
      setUserRatings({ ...userRatings, [resourceId]: rating })

      trackButtonClick('Rate Resource')
      console.log('✓ Rating saved to database')
    } catch (err) {
      console.error('Error saving rating:', err)
      setError('Failed to save rating.')
    } finally {
      setSaving(false)
    }
  }

  const handleAddResource = async () => {
    if (!formData.title || !formData.url) return

    try {
      setSaving(true)
      setError(null)

      const newResource = await createCustomResource({
        title: formData.title,
        url: formData.url,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        tags: formData.tags
      })

      setResources([...resources, { ...newResource, official: false, avgRating: 0 }])
      trackButtonClick('Add Custom Resource')
      closeModal()

      console.log('✓ Custom resource added to database')
    } catch (err) {
      console.error('Error adding resource:', err)
      setError('Failed to add resource.')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateResource = async () => {
    if (!editingResource || !formData.title || !formData.url) return

    try {
      setSaving(true)
      setError(null)

      await updateCustomResource(editingResource.id, {
        title: formData.title,
        url: formData.url,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        tags: formData.tags
      })

      const updated = resources.map(r =>
        r.id === editingResource.id ? { ...r, ...formData } : r
      )

      setResources(updated)
      trackButtonClick('Update Resource')
      closeModal()

      console.log('✓ Custom resource updated in database')
    } catch (err) {
      console.error('Error updating resource:', err)
      setError('Failed to update resource.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteResource = async (resourceId) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return

    try {
      setSaving(true)
      setError(null)

      await deleteCustomResource(resourceId)
      setResources(resources.filter(r => r.id !== resourceId))

      trackButtonClick('Delete Resource')
      console.log('✓ Custom resource deleted from database')
    } catch (err) {
      console.error('Error deleting resource:', err)
      setError('Failed to delete resource.')
    } finally {
      setSaving(false)
    }
  }

  const openAddModal = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'career',
      type: 'website',
      tags: []
    })
    setEditingResource(null)
    setShowAddModal(true)
  }

  const openEditModal = (resource) => {
    setFormData({
      title: resource.title,
      url: resource.url,
      description: resource.description,
      category: resource.category,
      type: resource.type || 'website',
      tags: resource.tags || []
    })
    setEditingResource(resource)
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingResource(null)
    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'career',
      type: 'website',
      tags: []
    })
  }

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const toggleFormTag = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
  }

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }

  const isCategoryExpanded = (categoryKey) => {
    // First time loading, all categories are collapsed
    return expandedCategories[categoryKey] === true
  }

  // Filter resources
  let filteredResources = resources

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredResources = filteredResources.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (selectedCategory !== 'all') {
    filteredResources = filteredResources.filter(r => r.category === selectedCategory)
  }

  // Type filter
  if (selectedType !== 'all') {
    filteredResources = filteredResources.filter(r => r.type === selectedType)
  }

  // Tag filter
  if (selectedTags.length > 0) {
    filteredResources = filteredResources.filter(r =>
      selectedTags.some(tag => r.tags?.includes(tag))
    )
  }

  // Official filter
  if (showOnlyOfficial) {
    filteredResources = filteredResources.filter(r => r.official)
  }

  // Rating filter
  if (minRating > 0) {
    filteredResources = filteredResources.filter(r => r.avgRating >= minRating)
  }

  // Group by category
  const groupedResources = {}
  filteredResources.forEach(resource => {
    if (!groupedResources[resource.category]) {
      groupedResources[resource.category] = []
    }
    groupedResources[resource.category].push(resource)
  })

  // Get display rating (user rating or average rating)
  const getDisplayRating = (resource) => {
    return userRatings[resource.id] || resource.avgRating || 0
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-slate-600'}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* PUBLIC MODE: Free Features Notice */}
        {publicMode && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Resource Library</h2>
              <p className="text-xl text-blue-100 mb-6">
                Core resources always free - no account needed
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Resource Library
          </h1>
          <p className="mt-2 text-slate-300">
            60+ curated veteran transition resources with advanced filtering and ratings
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-xl rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Search & Filters</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, tags, or keywords..."
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {Object.entries(RESOURCE_CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {Object.entries(RESOURCE_TYPES).map(([key, type]) => (
                <option key={key} value={key}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Any Rating</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.0}>4.0+ Stars</option>
              <option value={3.5}>3.5+ Stars</option>
            </select>
          </div>

          {/* Official Only Toggle */}
          <div className="flex items-end">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyOfficial}
                onChange={(e) => setShowOnlyOfficial(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-600 rounded focus:ring-blue-500 bg-slate-700"
              />
              <span className="ml-2 text-sm text-slate-300">
                Official resources only
              </span>
            </label>
          </div>
        </div>

        {/* Popular Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Filter by Tags:
          </label>
          <div className="flex flex-wrap gap-2">
            {['job-search', 'training', 'gi-bill', 'disability', 'mental-health', 'counseling', 'home-loans', 'transition'].map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 text-xs rounded-full bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800"
              >
                Clear Tags
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          {!publicMode && (
            <button
              onClick={openAddModal}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              + Add Custom Resource
            </button>
          )}
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedType('all')
              setSelectedTags([])
              setShowOnlyOfficial(false)
              setMinRating(0)
            }}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg transition-colors border border-slate-600"
          >
            Reset All Filters
          </button>
        </div>

        <div className="mt-4 text-sm text-slate-400">
          Showing {filteredResources.length} of {resources.length} resources
        </div>
        </div>

        {/* VSO Resources Section */}
        <div id="vso-resources" className="mb-8 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-blue-700 rounded-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-5xl">🤝</span>
            <div>
              <h2 className="text-3xl font-bold text-white">Veterans Service Organizations (VSOs)</h2>
              <p className="text-blue-200 text-lg mt-1">
                VSOs provide <strong>FREE</strong> assistance with VA claims, benefits applications, and appeals at no cost
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg">
            <p className="text-green-300 font-bold text-center text-lg">
              ✓ ALL VSO services are completely FREE. Never pay anyone to help with VA claims.
            </p>
          </div>

          <p className="text-slate-300 mb-8 text-lg leading-relaxed">
            These accredited organizations have trained representatives who can help you navigate the VA system,
            file claims, gather evidence, and represent you in appeals. All services are provided at no charge to veterans.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* DAV */}
            <a
              href="https://www.dav.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Disabled American Veterans (DAV)
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: Disabled veterans, claims & appeals</p>
              <p className="text-slate-300 text-sm mb-4">
                VA claims assistance, transportation services, career counseling. Strong track record with disability claims.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit DAV.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* VFW */}
            <a
              href="https://www.vfw.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Veterans of Foreign Wars (VFW)
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: Combat veterans, service-connected disabilities</p>
              <p className="text-slate-300 text-sm mb-4">
                Claims assistance, financial grants, mental health support. Strong support for combat veterans.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit VFW.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* American Legion */}
            <a
              href="https://www.legion.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                American Legion
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: All veterans, strong local presence</p>
              <p className="text-slate-300 text-sm mb-4">
                Claims representation, education assistance, employment help. Local posts nationwide.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit Legion.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* AMVETS */}
            <a
              href="https://www.amvets.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                AMVETS
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: Post-9/11 veterans, career services</p>
              <p className="text-slate-300 text-sm mb-4">
                Claims filing, benefits counseling, career transition support. Strong focus on employment.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit AMVETS.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* WWP */}
            <a
              href="https://www.woundedwarriorproject.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Wounded Warrior Project
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: Post-9/11 combat wounded veterans</p>
              <p className="text-slate-300 text-sm mb-4">
                Mental health services, career counseling, long-term support programs for wounded veterans.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit WWP.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* IAVA */}
            <a
              href="https://iava.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Iraq and Afghanistan Veterans of America (IAVA)
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: OIF/OEF veterans</p>
              <p className="text-slate-300 text-sm mb-4">
                Benefits navigation, community support, advocacy for Iraq and Afghanistan veterans.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit IAVA.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* VVA */}
            <a
              href="https://vva.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Vietnam Veterans of America (VVA)
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: Vietnam-era veterans</p>
              <p className="text-slate-300 text-sm mb-4">
                Claims assistance, Agent Orange support, benefits help specifically for Vietnam veterans.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit VVA.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>

            {/* MOPH */}
            <a
              href="https://www.purpleheart.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Military Order of the Purple Heart
              </h3>
              <p className="text-sm text-green-400 font-semibold mb-3">Best for: Purple Heart recipients</p>
              <p className="text-slate-300 text-sm mb-4">
                Claims for combat-wounded veterans, service officer network specialized in combat injuries.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold">
                Visit PurpleHeart.org
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Resources Display */}
        {Object.keys(groupedResources).length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No resources found
            </h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedType('all')
                setSelectedTags([])
                setShowOnlyOfficial(false)
                setMinRating(0)
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedResources).map(([categoryKey, categoryResources]) => {
              const category = RESOURCE_CATEGORIES[categoryKey]
              const isExpanded = isCategoryExpanded(categoryKey)
              return (
                <div key={categoryKey} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-slate-300">{isExpanded ? '▼' : '▶'}</span>
                      <span className="text-3xl">{category.icon}</span>
                      <h2 className="text-2xl font-bold text-white">
                        {category.name}
                      </h2>
                      <span className="text-sm font-normal text-slate-400">
                        ({categoryResources.length})
                      </span>
                    </div>
                  </button>

                {isExpanded && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {categoryResources.map(resource => {
                    const resourceType = RESOURCE_TYPES[resource.type || 'website']
                    const displayRating = getDisplayRating(resource)

                    return (
                      <div
                        key={resource.id}
                        className="bg-slate-700/50 rounded-lg border border-slate-600 p-5 hover:border-blue-500 transition-all"
                      >
                        {/* Header with badges */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-lg mb-1">
                              {resource.title}
                            </h3>
                            <div className="flex flex-wrap gap-1 mb-2">
                              <span className="px-2 py-0.5 bg-slate-600 text-slate-200 text-xs font-medium rounded">
                                {resourceType.icon} {resourceType.label}
                              </span>
                              {resource.official && (
                                <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs font-semibold rounded border border-green-700">
                                  Official
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 text-sm mb-3">
                          {resource.description}
                        </p>

                        {/* Tags */}
                        {resource.tags && resource.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {resource.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-xs rounded border border-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {resource.tags.length > 3 && (
                              <span className="px-2 py-0.5 text-slate-400 text-xs">
                                +{resource.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex text-sm">
                            {renderStars(Math.round(displayRating))}
                          </div>
                          <span className="text-xs text-slate-400">
                            {displayRating.toFixed(1)}
                          </span>
                        </div>

                        {/* User Rating */}
                        <div className="mb-4 p-2 bg-slate-600/50 rounded border border-slate-600">
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Your Rating:
                          </label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => saveUserRating(resource.id, star)}
                                className={`text-lg ${
                                  (userRatings[resource.id] || 0) >= star
                                    ? 'text-yellow-500'
                                    : 'text-slate-500 hover:text-yellow-400'
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackButtonClick('Open Resource Link')}
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                          >
                            Visit
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>

                          {!resource.official && resource.id.startsWith('custom-') && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => openEditModal(resource)}
                                className="p-2 bg-slate-600 hover:bg-slate-500 text-slate-200 rounded-lg transition-all"
                                aria-label="Edit resource"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteResource(resource.id)}
                                className="p-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition-all border border-red-800"
                                aria-label="Delete resource"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      )
                    })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

        {/* Add/Edit Resource Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white">
                  {editingResource ? 'Edit Resource' : 'Add Custom Resource'}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Veteran Job Board"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    URL *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this resource..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    {Object.entries(RESOURCE_CATEGORIES).map(([key, cat]) => (
                      <option key={key} value={key}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    {Object.entries(RESOURCE_TYPES).map(([key, type]) => (
                      <option key={key} value={key}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Tags (select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-700 border border-slate-600 rounded-lg">
                    {AVAILABLE_TAGS.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleFormTag(tag)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-700 flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-lg transition-all border border-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={editingResource ? handleUpdateResource : handleAddResource}
                  disabled={!formData.title || !formData.url}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingResource ? 'Update Resource' : 'Add Resource'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
