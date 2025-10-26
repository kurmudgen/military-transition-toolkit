import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'

// Default curated resources
const DEFAULT_RESOURCES = [
  // Career & Employment
  { id: 'career-1', category: 'career', title: 'CareerOneStop for Veterans', url: 'https://www.careeronestop.org/Veterans/', description: 'DOL employment resources - job search, training, career exploration', official: true },
  { id: 'career-2', category: 'career', title: 'SkillBridge', url: 'https://www.skillbridge.osd.mil', description: 'Industry training opportunities during final 180 days of service', official: true },
  { id: 'career-3', category: 'career', title: 'LinkedIn for Veterans', url: 'https://www.linkedinforgood.linkedin.com/programs/veterans', description: 'Free premium LinkedIn access for transitioning service members', official: true },
  { id: 'career-4', category: 'career', title: 'USAJOBS Veterans', url: 'https://www.usajobs.gov/Veterans/', description: 'Federal job opportunities with veterans preference', official: true },
  { id: 'career-5', category: 'career', title: 'My Next Move for Veterans', url: 'https://www.mynextmove.org/vets', description: 'Career exploration tool matching military skills to civilian careers', official: true },

  // Education
  { id: 'edu-1', category: 'education', title: 'GI Bill Overview', url: 'https://www.va.gov/education/', description: 'Complete guide to GI Bill benefits - Post-9/11, Montgomery, and more', official: true },
  { id: 'edu-2', category: 'education', title: 'GI Bill Comparison Tool', url: 'https://www.benefits.va.gov/gibill/comparison_tool.asp', description: 'Compare education benefits and school costs across institutions', official: true },
  { id: 'edu-3', category: 'education', title: 'COOL - Credentialing', url: 'https://www.cool.osd.mil', description: 'Civilian credentialing opportunities based on military training', official: true },

  // VA Benefits
  { id: 'benefits-1', category: 'benefits', title: 'VA.gov', url: 'https://www.va.gov', description: 'Main VA benefits portal - healthcare, disability, pensions, and more', official: true },
  { id: 'benefits-2', category: 'benefits', title: 'eBenefits', url: 'https://www.ebenefits.va.gov', description: 'Manage your VA benefits online - claims, letters, dependents', official: true },
  { id: 'benefits-3', category: 'benefits', title: 'VA Disability Compensation', url: 'https://www.benefits.va.gov/compensation/', description: 'Information about disability ratings, benefits, and compensation', official: true },
  { id: 'benefits-4', category: 'benefits', title: 'My HealtheVet', url: 'https://www.myhealth.va.gov', description: 'Access VA health records, appointments, prescriptions, and messaging', official: true },

  // Mental Health
  { id: 'mental-1', category: 'mental', title: 'Veterans Crisis Line', url: 'https://www.veteranscrisisline.net', description: '24/7 confidential support - call 988 then press 1', official: true },
  { id: 'mental-2', category: 'mental', title: 'Military OneSource', url: 'https://www.militaryonesource.mil', description: '24/7 support for service members and families - free counseling, resources', official: true },
  { id: 'mental-3', category: 'mental', title: 'VA Mental Health Services', url: 'https://www.mentalhealth.va.gov', description: 'Comprehensive mental health care and support services', official: true },

  // Housing & Financial
  { id: 'housing-1', category: 'housing', title: 'VA Home Loans', url: 'https://www.benefits.va.gov/homeloans/', description: 'VA-backed home loans with no down payment requirement', official: true },
  { id: 'housing-2', category: 'housing', title: 'Thrift Savings Plan (TSP)', url: 'https://www.tsp.gov', description: 'Manage your TSP account, contributions, and retirement planning', official: true },
  { id: 'housing-3', category: 'housing', title: 'Military OneSource Financial', url: 'https://www.militaryonesource.mil/financial-legal/', description: 'Free financial counseling and planning services', official: true },
]

const RESOURCE_CATEGORIES = {
  career: { name: 'Career & Employment', icon: '💼', color: 'blue' },
  education: { name: 'Education & Training', icon: '🎓', color: 'green' },
  benefits: { name: 'VA Benefits & Healthcare', icon: '🏥', color: 'red' },
  mental: { name: 'Mental Health & Wellness', icon: '❤️', color: 'pink' },
  housing: { name: 'Housing & Financial', icon: '🏠', color: 'purple' }
}

export default function Resources() {
  const [resources, setResources] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingResource, setEditingResource] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'career'
  })

  useEffect(() => {
    document.title = 'Resource Library - Military Transition Toolkit'
    trackPageView('Resources Library')
    loadResources()
  }, [])

  const loadResources = () => {
    const stored = localStorage.getItem('transitionResources')
    if (stored) {
      try {
        setResources(JSON.parse(stored))
      } catch (e) {
        setResources(DEFAULT_RESOURCES)
        localStorage.setItem('transitionResources', JSON.stringify(DEFAULT_RESOURCES))
      }
    } else {
      setResources(DEFAULT_RESOURCES)
      localStorage.setItem('transitionResources', JSON.stringify(DEFAULT_RESOURCES))
    }
  }

  const saveResources = (updatedResources) => {
    setResources(updatedResources)
    localStorage.setItem('transitionResources', JSON.stringify(updatedResources))
  }

  const handleAddResource = () => {
    if (!formData.title || !formData.url) return

    const newResource = {
      id: `custom-${Date.now()}`,
      ...formData,
      official: false
    }

    const updated = [...resources, newResource]
    saveResources(updated)
    trackButtonClick('Add Custom Resource')
    closeModal()
  }

  const handleUpdateResource = () => {
    if (!editingResource || !formData.title || !formData.url) return

    const updated = resources.map(r =>
      r.id === editingResource.id ? { ...r, ...formData } : r
    )
    saveResources(updated)
    trackButtonClick('Update Resource')
    closeModal()
  }

  const handleDeleteResource = (resourceId) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      const updated = resources.filter(r => r.id !== resourceId)
      saveResources(updated)
      trackButtonClick('Delete Resource')
    }
  }

  const openAddModal = () => {
    setFormData({ title: '', url: '', description: '', category: 'career' })
    setEditingResource(null)
    setShowAddModal(true)
  }

  const openEditModal = (resource) => {
    setFormData({
      title: resource.title,
      url: resource.url,
      description: resource.description,
      category: resource.category
    })
    setEditingResource(resource)
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingResource(null)
    setFormData({ title: '', url: '', description: '', category: 'career' })
  }

  // Filter resources
  let filteredResources = resources

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredResources = filteredResources.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory !== 'all') {
    filteredResources = filteredResources.filter(r => r.category === selectedCategory)
  }

  // Group by category for display
  const groupedResources = {}
  filteredResources.forEach(resource => {
    if (!groupedResources[resource.category]) {
      groupedResources[resource.category] = []
    }
    groupedResources[resource.category].push(resource)
  })

  return (
    <div className="px-4 py-6 sm:px-0 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Resource Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Curated veteran transition resources with search and filter
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          {/* Search */}
          <div className="flex-1 w-full md:max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Add Resource Button */}
          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Resource
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Categories
          </button>
          {Object.entries(RESOURCE_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600 dark:text-gray-400">
        Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      {/* Resources by Category */}
      {Object.keys(groupedResources).length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-7xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No resources found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filters
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedResources).map(([categoryKey, categoryResources]) => {
            const category = RESOURCE_CATEGORIES[categoryKey]
            return (
              <div key={categoryKey} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">{category.icon}</span>
                  {category.name}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({categoryResources.length})
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryResources.map(resource => (
                    <div
                      key={resource.id}
                      className="bg-gray-50 dark:bg-gray-750 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg flex-1">
                          {resource.title}
                        </h3>
                        {resource.official && (
                          <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex-shrink-0">
                            Official
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {resource.description}
                      </p>

                      <div className="flex gap-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackButtonClick('Open Resource Link')}
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        >
                          Visit Site
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>

                        {!resource.official && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => openEditModal(resource)}
                              className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all"
                              aria-label="Edit resource"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteResource(resource.id)}
                              className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-all"
                              aria-label="Delete resource"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingResource ? 'Edit Resource' : 'Add Custom Resource'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Veteran Job Board"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this resource..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(RESOURCE_CATEGORIES).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, category: key })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.category === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {cat.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t-2 border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={editingResource ? handleUpdateResource : handleAddResource}
                disabled={!formData.title || !formData.url}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingResource ? 'Update Resource' : 'Add Resource'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
