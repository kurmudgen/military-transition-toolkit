import { useState, useEffect } from 'react'
import {
  getProfessionalDev,
  addSkill,
  updateSkill,
  deleteSkill,
  addCertification,
  updateCertification,
  deleteCertification,
  addGoal,
  updateGoal,
  deleteGoal,
} from '../services/professionalDevService'

const TABS = ['skills', 'certifications', 'goals']

const SKILL_CATEGORIES = [
  'Technical',
  'Leadership',
  'Communication',
  'Analytical',
  'Operations',
  'Administrative',
  'Medical',
  'Mechanical',
  'Other',
]

export default function ProfessionalDev() {
  const [activeTab, setActiveTab] = useState('skills')
  const [skills, setSkills] = useState([])
  const [certifications, setCertifications] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfessionalDev()
        if (data) {
          setSkills(data.skills || [])
          setCertifications(data.certifications || [])
          setGoals(data.goals || [])
        }
      } catch {
        // Not logged in or table doesn't exist
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleAddSkill(skill) {
    setSaving(true)
    try {
      const result = await addSkill(skill)
      if (result) setSkills(result.skills)
    } catch {
      // Offline fallback — add locally
      setSkills((prev) => [...prev, { ...skill, id: `local-${Date.now()}` }])
    }
    setSaving(false)
  }

  async function handleUpdateSkill(updated) {
    setSaving(true)
    try {
      const result = await updateSkill(updated)
      if (result) setSkills(result.skills)
    } catch {
      setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    }
    setSaving(false)
  }

  async function handleDeleteSkill(id) {
    setSaving(true)
    try {
      const result = await deleteSkill(id)
      if (result) setSkills(result.skills)
    } catch {
      setSkills((prev) => prev.filter((s) => s.id !== id))
    }
    setSaving(false)
  }

  async function handleAddCert(cert) {
    setSaving(true)
    try {
      const result = await addCertification(cert)
      if (result) setCertifications(result.certifications)
    } catch {
      setCertifications((prev) => [...prev, { ...cert, id: `local-${Date.now()}` }])
    }
    setSaving(false)
  }

  async function handleUpdateCert(updated) {
    setSaving(true)
    try {
      const result = await updateCertification(updated)
      if (result) setCertifications(result.certifications)
    } catch {
      setCertifications((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    }
    setSaving(false)
  }

  async function handleDeleteCert(id) {
    setSaving(true)
    try {
      const result = await deleteCertification(id)
      if (result) setCertifications(result.certifications)
    } catch {
      setCertifications((prev) => prev.filter((c) => c.id !== id))
    }
    setSaving(false)
  }

  async function handleAddGoal(goal) {
    setSaving(true)
    try {
      const result = await addGoal(goal)
      if (result) setGoals(result.goals)
    } catch {
      setGoals((prev) => [...prev, { ...goal, id: `local-${Date.now()}` }])
    }
    setSaving(false)
  }

  async function handleUpdateGoal(updated) {
    setSaving(true)
    try {
      const result = await updateGoal(updated)
      if (result) setGoals(result.goals)
    } catch {
      setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)))
    }
    setSaving(false)
  }

  async function handleDeleteGoal(id) {
    setSaving(true)
    try {
      const result = await deleteGoal(id)
      if (result) setGoals(result.goals)
    } catch {
      setGoals((prev) => prev.filter((g) => g.id !== id))
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Development</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Track your skills, certifications, and development goals for your civilian career transition.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard label="Skills" count={skills.length} color="blue" />
        <SummaryCard label="Certifications" count={certifications.length} color="purple" />
        <SummaryCard label="Goals" count={goals.length} color="green" />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'skills' && (
        <SkillsTab
          skills={skills}
          onAdd={handleAddSkill}
          onUpdate={handleUpdateSkill}
          onDelete={handleDeleteSkill}
          saving={saving}
        />
      )}
      {activeTab === 'certifications' && (
        <CertificationsTab
          certifications={certifications}
          onAdd={handleAddCert}
          onUpdate={handleUpdateCert}
          onDelete={handleDeleteCert}
          saving={saving}
        />
      )}
      {activeTab === 'goals' && (
        <GoalsTab
          goals={goals}
          onAdd={handleAddGoal}
          onUpdate={handleUpdateGoal}
          onDelete={handleDeleteGoal}
          saving={saving}
        />
      )}
    </div>
  )
}

// ─── Summary Card ─────────────────────────────────────────────────

function SummaryCard({ label, count, color }) {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
  }

  return (
    <div className={`rounded-lg p-4 ${colors[color]}`}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm">{label}</p>
    </div>
  )
}

// ─── Skills Tab ───────────────────────────────────────────────────

function SkillsTab({ skills, onAdd, onUpdate, onDelete, saving }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    category: 'Technical',
    proficiency: 3,
    militaryAcquired: true,
    notes: '',
  })

  function resetForm() {
    setForm({ name: '', category: 'Technical', proficiency: 3, militaryAcquired: true, notes: '' })
    setEditingId(null)
    setShowForm(false)
  }

  function startEdit(skill) {
    setForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      militaryAcquired: skill.militaryAcquired,
      notes: skill.notes,
    })
    setEditingId(skill.id)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editingId) {
      await onUpdate({ ...form, id: editingId })
    } else {
      await onAdd(form)
    }
    resetForm()
  }

  const proficiencyLabels = ['', 'Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert']

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills Inventory</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Skill
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                placeholder="e.g., Project Management"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Proficiency: {proficiencyLabels[form.proficiency]}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.militaryAcquired}
              onChange={(e) => setForm({ ...form, militaryAcquired: e.target.checked })}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Acquired during military service</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              placeholder="Optional notes..."
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={resetForm} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      )}

      {/* Skills List */}
      {skills.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No skills added yet. Start building your skills inventory.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{skill.name}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">{skill.category}</span>
                  {skill.militaryAcquired && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">Military</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 w-6 rounded-full ${
                        level <= skill.proficiency ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{proficiencyLabels[skill.proficiency]}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => startEdit(skill)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                <button onClick={() => onDelete(skill.id)} className="text-sm text-red-600 dark:text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Certifications Tab ───────────────────────────────────────────

function CertificationsTab({ certifications, onAdd, onUpdate, onDelete, saving }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    dateEarned: '',
    expirationDate: '',
    status: 'active',
    credentialId: '',
    notes: '',
  })

  function resetForm() {
    setForm({ name: '', issuer: '', dateEarned: '', expirationDate: '', status: 'active', credentialId: '', notes: '' })
    setEditingId(null)
    setShowForm(false)
  }

  function startEdit(cert) {
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      dateEarned: cert.dateEarned,
      expirationDate: cert.expirationDate,
      status: cert.status,
      credentialId: cert.credentialId,
      notes: cert.notes,
    })
    setEditingId(cert.id)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editingId) {
      await onUpdate({ ...form, id: editingId })
    } else {
      await onAdd(form)
    }
    resetForm()
  }

  const statusColors = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    expired: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    'in-progress': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    planned: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Certification
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certification Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                placeholder="e.g., CompTIA Security+"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuing Organization</label>
              <input
                type="text"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                placeholder="e.g., CompTIA"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Earned</label>
              <input
                type="date"
                value={form.dateEarned}
                onChange={(e) => setForm({ ...form, dateEarned: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiration Date</label>
              <input
                type="date"
                value={form.expirationDate}
                onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="in-progress">In Progress</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credential ID</label>
            <input
              type="text"
              value={form.credentialId}
              onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              placeholder="Optional"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={resetForm} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Certification'}
            </button>
          </div>
        </form>
      )}

      {certifications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No certifications added yet. Track your military and civilian credentials.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{cert.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded capitalize ${statusColors[cert.status]}`}>{cert.status.replace('-', ' ')}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {cert.issuer && `${cert.issuer} · `}
                  {cert.dateEarned && `Earned ${cert.dateEarned}`}
                  {cert.expirationDate && ` · Expires ${cert.expirationDate}`}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => startEdit(cert)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                <button onClick={() => onDelete(cert.id)} className="text-sm text-red-600 dark:text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Goals Tab ────────────────────────────────────────────────────

function GoalsTab({ goals, onAdd, onUpdate, onDelete, saving }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    targetDate: '',
    status: 'not-started',
    priority: 'medium',
    steps: [],
  })
  const [newStep, setNewStep] = useState('')

  function resetForm() {
    setForm({ title: '', description: '', targetDate: '', status: 'not-started', priority: 'medium', steps: [] })
    setNewStep('')
    setEditingId(null)
    setShowForm(false)
  }

  function startEdit(goal) {
    setForm({
      title: goal.title,
      description: goal.description,
      targetDate: goal.targetDate,
      status: goal.status,
      priority: goal.priority,
      steps: goal.steps || [],
    })
    setEditingId(goal.id)
    setShowForm(true)
  }

  function addStep() {
    if (!newStep.trim()) return
    setForm({
      ...form,
      steps: [...form.steps, { id: `step-${Date.now()}`, text: newStep.trim(), completed: false }],
    })
    setNewStep('')
  }

  function removeStep(stepId) {
    setForm({ ...form, steps: form.steps.filter((s) => s.id !== stepId) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editingId) {
      await onUpdate({ ...form, id: editingId })
    } else {
      await onAdd(form)
    }
    resetForm()
  }

  async function toggleStep(goal, stepId) {
    const updatedSteps = goal.steps.map((s) =>
      s.id === stepId ? { ...s, completed: !s.completed } : s
    )
    const allDone = updatedSteps.every((s) => s.completed)
    await onUpdate({
      ...goal,
      steps: updatedSteps,
      status: allDone ? 'completed' : goal.status === 'not-started' ? 'in-progress' : goal.status,
    })
  }

  const statusColors = {
    'not-started': 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
    'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  }

  const priorityColors = {
    low: 'text-gray-500 dark:text-gray-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-red-600 dark:text-red-400',
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Development Goals</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Goal
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              placeholder="e.g., Earn PMP Certification"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              placeholder="Describe what you want to achieve..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Date</label>
              <input
                type="date"
                value={form.targetDate}
                onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          {/* Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Steps</label>
            {form.steps.length > 0 && (
              <ul className="space-y-1 mb-2">
                {form.steps.map((step) => (
                  <li key={step.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex-1">- {step.text}</span>
                    <button type="button" onClick={() => removeStep(step.id)} className="text-red-500 text-xs hover:underline">remove</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addStep() } }}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                placeholder="Add a step..."
              />
              <button type="button" onClick={addStep} className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-500">
                Add
              </button>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={resetForm} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : editingId ? 'Update Goal' : 'Add Goal'}
            </button>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No goals set yet. Define your career development goals to stay on track.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const completedSteps = (goal.steps || []).filter((s) => s.completed).length
            const totalSteps = (goal.steps || []).length

            return (
              <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{goal.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded capitalize ${statusColors[goal.status]}`}>
                        {goal.status.replace('-', ' ')}
                      </span>
                      <span className={`text-xs ${priorityColors[goal.priority]}`}>
                        {goal.priority} priority
                      </span>
                    </div>
                    {goal.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{goal.description}</p>
                    )}
                    {goal.targetDate && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Target: {goal.targetDate}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => startEdit(goal)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                    <button onClick={() => onDelete(goal.id)} className="text-sm text-red-600 dark:text-red-400 hover:underline">Delete</button>
                  </div>
                </div>

                {/* Steps */}
                {totalSteps > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{completedSteps}/{totalSteps} steps</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-green-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0}%` }}
                      />
                    </div>
                    <ul className="space-y-1">
                      {goal.steps.map((step) => (
                        <li key={step.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => toggleStep(goal, step.id)}
                            className="rounded border-gray-300 text-green-600"
                          />
                          <span className={`text-sm ${step.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {step.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
