import { jsPDF } from 'jspdf'
import { getProgress, getOverallStats, MILESTONE_CATEGORIES } from './progressTracking'
import { getReminders, getReminderStats, REMINDER_CATEGORIES, formatReminderDate } from './reminders'

export const generateTransitionPlanPDF = () => {
  // Create new PDF document
  const doc = new jsPDF()

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (2 * margin)
  let yPosition = margin

  // Helper function to add new page if needed
  const checkPageBreak = (neededSpace = 20) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Helper function to add wrapped text
  const addWrappedText = (text, fontSize = 10, maxWidth = contentWidth) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach(line => {
      checkPageBreak()
      doc.text(line, margin, yPosition)
      yPosition += fontSize * 0.5
    })
  }

  // Load user data
  const userSetup = JSON.parse(localStorage.getItem('userSetup') || '{}')
  const progress = getProgress()
  const stats = getOverallStats()
  const remindersData = getReminders()
  const reminderStats = getReminderStats()

  // Title
  doc.setFontSize(24)
  doc.setFont(undefined, 'bold')
  doc.text('Military Transition Plan', margin, yPosition)
  yPosition += 15

  // Subtitle - Date Generated
  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')
  doc.setTextColor(100)
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`, margin, yPosition)
  yPosition += 10
  doc.setTextColor(0)

  // Separator line
  doc.setDrawColor(200)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  // SECTION 1: Personal Information
  checkPageBreak(30)
  doc.setFontSize(16)
  doc.setFont(undefined, 'bold')
  doc.text('Personal Information', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont(undefined, 'normal')

  if (userSetup.name) {
    doc.text(`Name: ${userSetup.name}`, margin + 5, yPosition)
    yPosition += 6
  }

  if (userSetup.situation) {
    const situationMap = {
      retirement: '20+ Year Retirement',
      separation: 'Separation (Under 20 Years)',
      medboard: 'MedBoard/IDES',
      planning: 'Already Separated'
    }
    doc.text(`Transition Type: ${situationMap[userSetup.situation] || userSetup.situation}`, margin + 5, yPosition)
    yPosition += 6
  }

  if (userSetup.separationDate) {
    const sepDate = new Date(userSetup.separationDate)
    const today = new Date()
    const daysUntil = Math.ceil((sepDate - today) / (1000 * 60 * 60 * 24))
    doc.text(`Separation Date: ${sepDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`, margin + 5, yPosition)
    yPosition += 6
    if (daysUntil > 0) {
      doc.text(`Days Until Separation: ${daysUntil}`, margin + 5, yPosition)
      yPosition += 6
    }
  }

  yPosition += 5

  // SECTION 2: Progress Summary
  checkPageBreak(40)
  doc.setFontSize(16)
  doc.setFont(undefined, 'bold')
  doc.text('Transition Progress Summary', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont(undefined, 'normal')

  // Overall progress box
  doc.setFillColor(59, 130, 246) // Blue background
  doc.roundedRect(margin, yPosition, contentWidth, 25, 3, 3, 'F')

  doc.setTextColor(255)
  doc.setFontSize(28)
  doc.setFont(undefined, 'bold')
  doc.text(`${stats.overallProgress}%`, margin + 10, yPosition + 18)

  doc.setFontSize(11)
  doc.setFont(undefined, 'normal')
  doc.text('Overall Progress', margin + 50, yPosition + 10)
  doc.text(`${stats.completedItems} of ${stats.totalItems} tasks completed`, margin + 50, yPosition + 18)

  doc.setTextColor(0)
  yPosition += 32

  // Category breakdown
  doc.setFontSize(12)
  doc.setFont(undefined, 'bold')
  doc.text('Progress by Category:', margin, yPosition)
  yPosition += 8

  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')

  Object.entries(MILESTONE_CATEGORIES).forEach(([categoryId, categoryData]) => {
    checkPageBreak(15)
    const categoryProgress = progress.categories[categoryId]
    const completed = categoryProgress.items.filter(i => i.completed).length
    const total = categoryProgress.items.length

    doc.text(`${categoryData.name}:`, margin + 5, yPosition)
    doc.text(`${completed}/${total} (${categoryProgress.progress}%)`, pageWidth - margin - 40, yPosition)

    // Progress bar
    const barWidth = 50
    const barHeight = 4
    const barX = pageWidth - margin - barWidth
    const barY = yPosition - 3

    // Background
    doc.setFillColor(220)
    doc.rect(barX, barY, barWidth, barHeight, 'F')

    // Progress
    const progressWidth = (barWidth * categoryProgress.progress) / 100
    doc.setFillColor(34, 197, 94) // Green
    doc.rect(barX, barY, progressWidth, barHeight, 'F')

    yPosition += 8
  })

  yPosition += 5

  // SECTION 3: Detailed Progress Checklist
  checkPageBreak(30)
  doc.setFontSize(16)
  doc.setFont(undefined, 'bold')
  doc.text('Detailed Progress Checklist', margin, yPosition)
  yPosition += 10

  Object.entries(MILESTONE_CATEGORIES).forEach(([categoryId, categoryData]) => {
    const categoryProgress = progress.categories[categoryId]

    checkPageBreak(20)
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text(`${categoryData.name}`, margin, yPosition)
    yPosition += 7

    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')

    categoryProgress.items.forEach(item => {
      checkPageBreak(8)

      // Checkbox
      doc.rect(margin + 5, yPosition - 3, 3, 3)
      if (item.completed) {
        doc.setFontSize(12)
        doc.text('✓', margin + 5.5, yPosition + 0.5)
        doc.setFontSize(9)
      }

      // Item text
      if (item.completed) {
        doc.setTextColor(150)
      }
      const itemText = item.text + (item.completedDate ? ` (${new Date(item.completedDate).toLocaleDateString()})` : '')
      const wrappedText = doc.splitTextToSize(itemText, contentWidth - 20)
      wrappedText.forEach((line, idx) => {
        if (idx > 0) {
          checkPageBreak(5)
        }
        doc.text(line, margin + 12, yPosition)
        yPosition += 5
      })
      doc.setTextColor(0)
    })

    yPosition += 5
  })

  // SECTION 4: Reminders
  checkPageBreak(30)
  doc.setFontSize(16)
  doc.setFont(undefined, 'bold')
  doc.text('Reminders & Important Dates', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont(undefined, 'normal')
  doc.text(`Total Active Reminders: ${reminderStats.active}`, margin + 5, yPosition)
  yPosition += 6
  doc.text(`Overdue: ${reminderStats.overdue}`, margin + 5, yPosition)
  yPosition += 6
  doc.text(`Due Today: ${reminderStats.today}`, margin + 5, yPosition)
  yPosition += 10

  // Active reminders
  const activeReminders = remindersData.reminders.filter(r => !r.completed).sort((a, b) => new Date(a.date) - new Date(b.date))

  if (activeReminders.length > 0) {
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Upcoming Reminders:', margin, yPosition)
    yPosition += 7

    doc.setFontSize(9)
    doc.setFont(undefined, 'normal')

    activeReminders.slice(0, 20).forEach(reminder => { // Limit to 20 reminders
      checkPageBreak(12)

      const category = REMINDER_CATEGORIES[reminder.category]
      const dateStr = formatReminderDate(reminder.date)

      doc.setFont(undefined, 'bold')
      doc.text(reminder.title, margin + 5, yPosition)
      doc.setFont(undefined, 'normal')
      yPosition += 5

      doc.setTextColor(100)
      doc.text(`${category?.label || 'Event'} • ${dateStr}`, margin + 5, yPosition)

      if (reminder.description) {
        yPosition += 4
        doc.setTextColor(80)
        const descLines = doc.splitTextToSize(reminder.description, contentWidth - 15)
        descLines.slice(0, 2).forEach(line => {
          checkPageBreak(5)
          doc.text(line, margin + 5, yPosition)
          yPosition += 4
        })
      }

      doc.setTextColor(0)
      yPosition += 6
    })
  }

  // SECTION 5: VA Claims (if applicable)
  const vaConditions = JSON.parse(localStorage.getItem('vaClaimsConditions') || '[]')

  if (vaConditions.length > 0) {
    checkPageBreak(30)
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.text('VA Disability Claims', margin, yPosition)
    yPosition += 8

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    doc.text(`Total Conditions: ${vaConditions.length}`, margin + 5, yPosition)
    yPosition += 10

    doc.setFontSize(9)
    vaConditions.slice(0, 30).forEach((condition, idx) => {
      checkPageBreak(8)
      doc.text(`${idx + 1}. ${condition.name || 'Unnamed condition'}`, margin + 5, yPosition)
      if (condition.description) {
        yPosition += 4
        doc.setTextColor(100)
        const descLines = doc.splitTextToSize(condition.description, contentWidth - 15)
        descLines.slice(0, 1).forEach(line => {
          checkPageBreak(5)
          doc.text(line, margin + 5, yPosition)
          yPosition += 4
        })
        doc.setTextColor(0)
      } else {
        yPosition += 5
      }
    })

    yPosition += 5
  }

  // SECTION 6: Resume & Career Preparation
  const resumeData = JSON.parse(localStorage.getItem('resumeData') || '{}')

  if (resumeData && Object.keys(resumeData).length > 0) {
    checkPageBreak(30)
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.text('Resume & Career Preparation', margin, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')

    if (resumeData.contactInfo) {
      doc.text('Resume Created: Yes', margin + 5, yPosition)
      yPosition += 5
    }

    if (resumeData.experience && resumeData.experience.length > 0) {
      doc.text(`Work Experience Entries: ${resumeData.experience.length}`, margin + 5, yPosition)
      yPosition += 5
    }

    if (resumeData.education && resumeData.education.length > 0) {
      doc.text(`Education Entries: ${resumeData.education.length}`, margin + 5, yPosition)
      yPosition += 5
    }

    if (resumeData.skills && resumeData.skills.length > 0) {
      doc.text(`Skills Listed: ${resumeData.skills.length}`, margin + 5, yPosition)
      yPosition += 5
    }

    doc.setTextColor(100)
    doc.text('Use Resume Builder to view full details', margin + 5, yPosition)
    doc.setTextColor(0)
    yPosition += 10
  }

  // SECTION 7: Job Search Activity
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
  const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]')

  if (savedJobs.length > 0 || applications.length > 0) {
    checkPageBreak(30)
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.text('Job Search Activity', margin, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.text(`Saved Jobs: ${savedJobs.length}`, margin + 5, yPosition)
    yPosition += 5
    doc.text(`Applications Submitted: ${applications.length}`, margin + 5, yPosition)
    yPosition += 10

    if (applications.length > 0) {
      const statusCounts = {}
      applications.forEach(app => {
        statusCounts[app.status] = (statusCounts[app.status] || 0) + 1
      })

      doc.setFont(undefined, 'bold')
      doc.text('Application Status:', margin + 5, yPosition)
      doc.setFont(undefined, 'normal')
      yPosition += 5

      Object.entries(statusCounts).forEach(([status, count]) => {
        doc.text(`${status}: ${count}`, margin + 10, yPosition)
        yPosition += 5
      })
      yPosition += 5
    }
  }

  // SECTION 8: State Benefits Research
  const stateComparison = JSON.parse(localStorage.getItem('stateComparison') || '[]')

  if (stateComparison.length > 0) {
    checkPageBreak(20)
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.text('State Benefits Research', margin, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.text(`States Researched: ${stateComparison.join(', ')}`, margin + 5, yPosition)
    yPosition += 5
    doc.setTextColor(100)
    doc.text('See State Benefits Comparison tool for full details', margin + 5, yPosition)
    doc.setTextColor(0)
    yPosition += 10
  }

  // SECTION 9: Next Steps
  checkPageBreak(30)
  doc.setFontSize(16)
  doc.setFont(undefined, 'bold')
  doc.text('Recommended Next Steps', margin, yPosition)
  yPosition += 8

  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')

  // Generate recommendations
  const recommendations = []

  if (stats.overallProgress < 50) {
    recommendations.push('Continue working through your transition checklist')
  }

  if (!resumeData || Object.keys(resumeData).length === 0) {
    recommendations.push('Complete your resume using the Resume Builder')
  }

  if (applications.length === 0) {
    recommendations.push('Start searching and applying for jobs')
  }

  if (vaConditions.length === 0) {
    recommendations.push('Document your conditions in VA Claims Builder')
  }

  if (stateComparison.length === 0) {
    recommendations.push('Research state benefits for your target location')
  }

  if (recommendations.length > 0) {
    recommendations.forEach((rec, idx) => {
      checkPageBreak(8)
      doc.text(`${idx + 1}. ${rec}`, margin + 5, yPosition)
      yPosition += 6
    })
  } else {
    doc.text('Great progress! Keep executing your transition plan.', margin + 5, yPosition)
    yPosition += 6
  }

  yPosition += 10

  // Important Resources
  checkPageBreak(40)
  doc.setFontSize(14)
  doc.setFont(undefined, 'bold')
  doc.text('Important Resources', margin, yPosition)
  yPosition += 8

  doc.setFontSize(9)
  doc.setFont(undefined, 'normal')

  const resources = [
    'Veterans Crisis Line: 988, then press 1',
    'VA Benefits: https://www.va.gov',
    'eBenefits: https://www.ebenefits.va.gov',
    'Military OneSource: https://www.militaryonesource.mil',
    'USAJOBS: https://www.usajobs.gov/Veterans/',
    'CareerOneStop: https://www.careeronestop.org/Veterans/'
  ]

  resources.forEach(resource => {
    checkPageBreak(6)
    doc.text(resource, margin + 5, yPosition)
    yPosition += 5
  })

  // Footer on last page
  doc.setFontSize(8)
  doc.setTextColor(150)
  const ftrY = pageHeight - 10
  doc.text('Generated by Military Transition Toolkit', pageWidth / 2, ftrY, { align: 'center' })
  doc.text('https://militarytransitiontoolkit.com', pageWidth / 2, ftrY + 4, { align: 'center' })
  doc.text('100% Free for Veterans • Secure Cloud Storage', pageWidth / 2, ftrY + 8, { align: 'center' })

  // Save the PDF
  const fileName = `Military_Transition_Plan_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)

  return fileName
}

/**
 * Export Resume as PDF - Professional Format
 */
export const generateResumePDF = (resumeData, template = 'chronological') => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (2 * margin)
  let yPosition = margin

  // Helper: Check if we need a new page
  const checkPageBreak = (space = 20) => {
    if (yPosition + space > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Helper: Add section header with underline
  const addSectionHeader = (title) => {
    checkPageBreak(15)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(30, 70, 120) // Professional blue
    doc.text(title.toUpperCase(), margin, yPosition)
    yPosition += 2

    // Underline
    doc.setDrawColor(30, 70, 120)
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    doc.setTextColor(0, 0, 0) // Reset to black
    yPosition += 6
  }

  // Helper: Add bullet point
  const addBullet = (text, indent = 5) => {
    checkPageBreak(10)
    const lines = doc.splitTextToSize(text, contentWidth - indent - 5)

    // Draw bullet
    doc.circle(margin + indent, yPosition - 1.5, 0.8, 'F')

    // Add text
    lines.forEach((line, idx) => {
      if (idx > 0) checkPageBreak(6)
      doc.text(line, margin + indent + 4, yPosition)
      yPosition += 5
    })
  }

  // ==================== HEADER - NAME & CONTACT ====================
  if (resumeData.contactInfo) {
    const c = resumeData.contactInfo
    const fullName = `${c.firstName || ''} ${c.lastName || ''}`.trim()

    if (fullName) {
      doc.setFontSize(24)
      doc.setFont(undefined, 'bold')
      doc.setTextColor(0, 0, 0)
      doc.text(fullName, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 7
    }

    // Contact info line 1: Email | Phone | Location
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    const contactLine1 = [c.email, c.phone].filter(Boolean)
    const locationLine = [c.city, c.state].filter(Boolean).join(', ')
    if (locationLine) contactLine1.push(locationLine)

    if (contactLine1.length > 0) {
      doc.text(contactLine1.join(' | '), pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 5
    }

    // Contact info line 2: LinkedIn | Website
    const contactLine2 = []
    if (c.linkedIn) contactLine2.push(c.linkedIn)
    if (c.website) contactLine2.push(c.website)

    if (contactLine2.length > 0) {
      doc.setTextColor(30, 70, 120) // Blue for links
      doc.text(contactLine2.join(' | '), pageWidth / 2, yPosition, { align: 'center' })
      doc.setTextColor(0, 0, 0) // Reset to black
      yPosition += 5
    }

    yPosition += 3
    doc.setDrawColor(180, 180, 180)
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8
  }

  // ==================== PROFESSIONAL SUMMARY ====================
  if (resumeData.summary && resumeData.summary.trim()) {
    addSectionHeader('Professional Summary')

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    const summaryLines = doc.splitTextToSize(resumeData.summary.trim(), contentWidth)
    summaryLines.forEach(line => {
      checkPageBreak(6)
      doc.text(line, margin, yPosition)
      yPosition += 5
    })
    yPosition += 5
  }

  // ==================== MILITARY SERVICE ====================
  if (resumeData.militaryService) {
    const ms = resumeData.militaryService
    if (ms.branch || ms.rank || ms.mos) {
      addSectionHeader('Military Service')

      doc.setFontSize(11)
      doc.setFont(undefined, 'bold')
      const serviceHeader = [ms.branch, ms.rank].filter(Boolean).join(', ')
      if (serviceHeader) {
        doc.text(serviceHeader, margin, yPosition)
        yPosition += 5
      }

      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      const serviceDetails = []
      if (ms.mos) serviceDetails.push(`MOS: ${ms.mos}`)
      if (ms.yearsOfService) serviceDetails.push(`${ms.yearsOfService} years of service`)

      if (serviceDetails.length > 0) {
        doc.text(serviceDetails.join(' | '), margin, yPosition)
        yPosition += 5
      }

      if (ms.honorableDischarge) {
        doc.setFont(undefined, 'italic')
        doc.text('Honorable Discharge', margin, yPosition)
        doc.setFont(undefined, 'normal')
        yPosition += 5
      }

      yPosition += 3
    }
  }

  // ==================== PROFESSIONAL EXPERIENCE ====================
  if (resumeData.experience && resumeData.experience.length > 0) {
    addSectionHeader('Professional Experience')

    resumeData.experience.forEach((exp, idx) => {
      checkPageBreak(25)

      // Job title (bold, slightly larger)
      doc.setFontSize(12)
      doc.setFont(undefined, 'bold')
      doc.text(exp.title || 'Position Title', margin, yPosition)
      yPosition += 6

      // Company and dates
      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      const company = exp.organization || exp.company || ''
      const location = exp.location || ''
      const dateRange = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`

      if (company) {
        doc.setFont(undefined, 'bold')
        doc.text(company, margin, yPosition)
        doc.setFont(undefined, 'normal')
      }

      if (location || dateRange) {
        doc.setTextColor(80, 80, 80) // Gray for dates
        doc.text(dateRange, pageWidth - margin, yPosition, { align: 'right' })
        doc.setTextColor(0, 0, 0)
      }
      yPosition += 5

      if (location) {
        doc.setTextColor(80, 80, 80)
        doc.setFont(undefined, 'italic')
        doc.text(location, margin, yPosition)
        doc.setFont(undefined, 'normal')
        doc.setTextColor(0, 0, 0)
        yPosition += 5
      }

      // Accomplishments/Responsibilities
      if (exp.accomplishments && exp.accomplishments.length > 0) {
        yPosition += 2
        exp.accomplishments.forEach(acc => {
          const accomplishmentText = typeof acc === 'string' ? acc : (acc.description || '')
          if (accomplishmentText.trim()) {
            addBullet(accomplishmentText.trim(), 3)
          }
        })
      }

      // Space between jobs
      if (idx < resumeData.experience.length - 1) {
        yPosition += 4
      }
    })
    yPosition += 5
  }

  // ==================== EDUCATION ====================
  if (resumeData.education && resumeData.education.length > 0) {
    addSectionHeader('Education')

    resumeData.education.forEach((edu, idx) => {
      checkPageBreak(20)

      // Degree
      doc.setFontSize(11)
      doc.setFont(undefined, 'bold')
      doc.text(edu.degree || 'Degree', margin, yPosition)
      yPosition += 5

      // School and date
      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      doc.text(edu.school || '', margin, yPosition)

      const gradDate = edu.graduationDate || edu.graduationYear || ''
      if (gradDate) {
        doc.text(gradDate, pageWidth - margin, yPosition, { align: 'right' })
      }
      yPosition += 5

      // Location
      if (edu.location) {
        doc.setTextColor(80, 80, 80)
        doc.setFont(undefined, 'italic')
        doc.text(edu.location, margin, yPosition)
        doc.setFont(undefined, 'normal')
        doc.setTextColor(0, 0, 0)
        yPosition += 5
      }

      // GPA / Honors
      const extras = []
      if (edu.gpa) extras.push(`GPA: ${edu.gpa}`)
      if (edu.honors) extras.push(edu.honors)

      if (extras.length > 0) {
        doc.text(extras.join(' | '), margin, yPosition)
        yPosition += 5
      }

      if (idx < resumeData.education.length - 1) {
        yPosition += 3
      }
    })
    yPosition += 5
  }

  // ==================== SKILLS ====================
  if (resumeData.skills && resumeData.skills.length > 0) {
    addSectionHeader('Skills')

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    const skillsText = resumeData.skills.join(' • ')
    const skillsLines = doc.splitTextToSize(skillsText, contentWidth)
    skillsLines.forEach(line => {
      checkPageBreak(6)
      doc.text(line, margin, yPosition)
      yPosition += 5
    })
    yPosition += 5
  }

  // ==================== CERTIFICATIONS ====================
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    addSectionHeader('Certifications')

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')

    resumeData.certifications.forEach(cert => {
      checkPageBreak(12)

      // Certification name and issuer
      const certLine = [cert.name, cert.issuer].filter(Boolean).join(' - ')
      if (certLine) {
        doc.setFont(undefined, 'bold')
        doc.text(certLine, margin, yPosition)
        doc.setFont(undefined, 'normal')
        yPosition += 5
      }

      // Date info
      const dates = []
      if (cert.date) dates.push(`Issued: ${cert.date}`)
      if (cert.expirationDate) dates.push(`Expires: ${cert.expirationDate}`)

      if (dates.length > 0) {
        doc.setFontSize(9)
        doc.setTextColor(80, 80, 80)
        doc.text(dates.join(' | '), margin, yPosition)
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        yPosition += 5
      }

      yPosition += 2
    })
  }

  // ==================== GENERATE FILENAME ====================
  let fileName = 'Resume.pdf'
  if (resumeData.contactInfo) {
    const firstName = (resumeData.contactInfo.firstName || '').trim()
    const lastName = (resumeData.contactInfo.lastName || '').trim()

    if (firstName || lastName) {
      fileName = `${firstName}_${lastName}_Resume.pdf`.replace(/\s+/g, '_')
    }
  }

  // Save the PDF
  doc.save(fileName)
  return fileName
}
