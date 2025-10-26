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

  // Footer on last page
  doc.setFontSize(8)
  doc.setTextColor(150)
  const footerY = pageHeight - 10
  doc.text('Generated by Military Transition Toolkit', pageWidth / 2, footerY, { align: 'center' })
  doc.text('https://militarytransitiontoolkit.com', pageWidth / 2, footerY + 4, { align: 'center' })
  doc.text('100% Privacy-First • All Data Stored Locally', pageWidth / 2, footerY + 8, { align: 'center' })

  // Save the PDF
  const fileName = `Military_Transition_Plan_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)

  return fileName
}
