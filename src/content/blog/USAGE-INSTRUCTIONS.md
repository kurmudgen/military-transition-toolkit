---
date: "2026-03-10"
---# File Organizer - Usage Instructions

## Overview

The **File Organizer** is an automated system that sorts downloaded content files into the correct subfolders based on filename patterns. This eliminates manual file organization and ensures consistency.

## Quick Start (3 Steps)

### 1. Drop Files in INBOX
Move your downloaded content files to:
```
S:\Military-Toolkit-Content-Library\00-INBOX\
```

### 2. Run the Organizer
Double-click:
```
organize-files.bat
```

### 3. Check Results
Review the summary and check:
```
organize-log.txt
```

That's it! Your files are now organized.

## Detailed Instructions

### Prerequisites

**Python Installation** (one-time setup)
1. Download Python from https://www.python.org/downloads/
2. During installation, **check "Add Python to PATH"**
3. Complete installation
4. Verify: Open Command Prompt and type `python --version`

### Step-by-Step Workflow

#### Step 1: Generate Content in Browser Claude

Generate your content in browser Claude Code sessions. When complete, download the files. They'll typically land in your Downloads folder.

Example downloads:
- `army-11b-infantryman-civilian-career-guide.md`
- `texas-veteran-tax-benefits-2025.md`
- `email-sequence-va-claims-day-03-gathering-evidence.md`

#### Step 2: Move Files to INBOX

Move all downloaded files to the INBOX folder:

**Option A: Drag and Drop**
1. Open File Explorer
2. Navigate to `S:\Military-Toolkit-Content-Library\00-INBOX\`
3. Drag files from Downloads to INBOX

**Option B: Command Line**
```bash
move C:\Users\YourName\Downloads\*.md S:\Military-Toolkit-Content-Library\00-INBOX\
```

#### Step 3: Run the Organizer

**Option A: Double-Click (Recommended)**
1. Navigate to `S:\Military-Toolkit-Content-Library\`
2. Double-click `organize-files.bat`
3. Watch the progress in the command window

**Option B: Command Line**
```bash
cd S:\Military-Toolkit-Content-Library
python organize-files.py
```

#### Step 4: Review Results

The organizer will:
1. Show progress for each file
2. Display a summary of moved, failed, and unmatched files
3. Create a log file: `organize-log.txt`

**Success Output Example:**
```
✅ Successfully moved: 15 file(s)
❌ Failed to move: 0 file(s)
⚠️  Unmatched files: 2 file(s)

📦 Files organized:
  • army-11b-infantryman-civilian-career-guide.md → 01-Blog-Content/Career-Guides/Army-MOS
  • texas-veteran-tax-benefits-2025.md → 01-Blog-Content/State-Guides/Tax-Benefits
  • email-sequence-va-claims-day-03.md → 02-Email-Marketing/VA-Claims-Prep
```

#### Step 5: Handle Unmatched Files

If files don't match any pattern, the organizer will ask:
```
Move unmatched files to Archive? (y/n):
```

- **Type 'y'**: Moves unmatched files to `99-Archive/Unmatched`
- **Type 'n'**: Leaves files in INBOX for manual sorting

## File Naming Patterns

The organizer recognizes these filename patterns:

### Career Guides
| Pattern | Destination |
|---------|-------------|
| `army-11b-*.md`, `army-25b-*.md` | 01-Blog-Content/Career-Guides/Army-MOS |
| `navy-it-*.md`, `navy-bm-*.md` | 01-Blog-Content/Career-Guides/Navy-Ratings |
| `air-force-2a6x1-*.md` | 01-Blog-Content/Career-Guides/Air-Force-AFSC |
| `marines-0311-*.md` | 01-Blog-Content/Career-Guides/Marines-MOS |
| `coast-guard-mk-*.md` | 01-Blog-Content/Career-Guides/Coast-Guard-Ratings |

### State Guides
| Pattern | Destination |
|---------|-------------|
| `*-veteran-tax-benefits-*.md` | 01-Blog-Content/State-Guides/Tax-Benefits |
| `*-healthcare-education-*.md` | 01-Blog-Content/State-Guides/Healthcare-Education |
| `*-best-cities-veterans-*.md` | 01-Blog-Content/State-Guides/Best-Cities |

### VA Disability Guides
| Pattern | Destination |
|---------|-------------|
| `va-disability-rating-ptsd.md` | 01-Blog-Content/VA-Disability-Guides/Mental-Health |
| `va-disability-rating-knee.md` | 01-Blog-Content/VA-Disability-Guides/Musculoskeletal |
| `va-disability-rating-sleep-apnea.md` | 01-Blog-Content/VA-Disability-Guides/Respiratory |

### Email Sequences
| Pattern | Destination |
|---------|-------------|
| `email-sequence-30-day-*.md` | 02-Email-Marketing/30-Day-Onboarding |
| `email-sequence-12-month-*.md` | 02-Email-Marketing/12-Month-Transition |
| `email-sequence-va-claims-*.md` | 02-Email-Marketing/VA-Claims-Prep |
| `email-sequence-resume-*.md` | 02-Email-Marketing/Resume-Building |
| `email-sequence-premium-*.md` | 02-Email-Marketing/Premium-Conversion |

### Training Courses
| Pattern | Destination |
|---------|-------------|
| `course-va-claims-*.md` | 03-Training-Courses/VA-Claims-Masterclass |
| `course-resume-*.md` | 03-Training-Courses/Resume-Masterclass |
| `*-playbook.md` | 03-Training-Courses/MOS-Playbooks |

### Social Media
| Pattern | Destination |
|---------|-------------|
| `linkedin-success-stories-*.md` | 04-Social-Media/LinkedIn/Success-Stories |
| `twitter-career-*.md` | 04-Social-Media/Twitter-Threads/Career-Transition |
| `reddit-detailed-guide-*.md` | 04-Social-Media/Reddit-Posts/Detailed-Guides |
| `facebook-value-bomb-*.md` | 04-Social-Media/Facebook-Groups/Value-Bombs |

### Other Content Types
| Pattern | Destination |
|---------|-------------|
| `vso-contacts-*.csv` | 05-Resource-Databases |
| `youtube-script-*.md` | 06-YouTube-Content/Scripts |
| `podcast-episode-*.md` | 07-Podcast-Content/Scripts |
| `*-workbook.md` | 08-Lead-Magnets/Workbooks |
| `case-study-career-*.md` | 10-Case-Studies/Career-Transition |
| `faq-*.md` | 11-FAQ-Database |
| `webinar-*.md` | 13-Webinar-Content |

**Full pattern list:** See `organize-files.py` for all 100+ patterns

## Tips & Best Practices

### ✅ Do's

1. **Use consistent naming** when generating content
   - Follow the naming conventions above
   - Example: `army-11b-infantryman-civilian-career-guide.md`

2. **Batch process** multiple files at once
   - Drop 10, 50, or 100 files in INBOX
   - Run organizer once to sort them all

3. **Review the log** after each run
   - Check `organize-log.txt` for details
   - Verify files went to correct locations

4. **Keep INBOX empty** after organizing
   - Only unmatched files should remain
   - Deal with unmatched files promptly

5. **Backup before major operations**
   - Make a copy before organizing hundreds of files
   - Test with a few files first

### ❌ Don'ts

1. **Don't edit files in INBOX**
   - INBOX is temporary storage only
   - Edit files in their final destinations

2. **Don't use special characters** in filenames
   - Avoid: `& % $ # @ !`
   - Use: `- _ a-z 0-9`

3. **Don't mix file types**
   - Content files (.md) and data files (.csv) have different patterns
   - Keep naming consistent with file type

4. **Don't manually move organized files**
   - Let the script handle organization
   - Manual moves can break the system

## Troubleshooting

### Problem: "Python is not installed"

**Solution:**
1. Download Python from https://www.python.org/downloads/
2. Run installer and check "Add Python to PATH"
3. Restart Command Prompt
4. Try again

### Problem: Files not organizing

**Check these:**
1. **Filename pattern matches?**
   - Review pattern list above
   - Check for typos in filename
   - Ensure file extension is correct (.md, .csv, etc.)

2. **Files in correct location?**
   - Must be in `00-INBOX/` folder
   - Not in a subfolder of INBOX

3. **Permissions issue?**
   - Ensure you have write access to S: drive
   - Run Command Prompt as Administrator if needed

**Still not working?**
- Check `organize-log.txt` for error messages
- Manually move problematic files
- Report the pattern for future improvements

### Problem: Wrong destination

If a file goes to the wrong folder:
1. Move it manually to the correct location
2. Note the filename pattern
3. Consider updating `organize-files.py` patterns

### Problem: Duplicate files

The organizer handles duplicates automatically:
- If file exists at destination, adds timestamp
- Example: `army-11b-guide.md` → `army-11b-guide_20251110_143022.md`
- No files are overwritten

## Customizing Patterns

Want to add your own patterns?

### Edit organize-files.py

1. Open `organize-files.py` in a text editor
2. Find the `PATTERNS` list (around line 30)
3. Add your pattern:

```python
(r'your-pattern-here.*\.md', 'Destination/Folder', 'Description'),
```

**Pattern Examples:**
```python
# Match files starting with "newsletter-"
(r'newsletter-.*\.md', '02-Email-Marketing/Newsletter', 'Newsletter email'),

# Match files with "cheatsheet" in name
(r'.*cheatsheet.*\.md', '08-Lead-Magnets/Cheatsheets', 'Cheat sheet'),

# Match specific MOS codes
(r'.*-68w-.*\.md', '01-Blog-Content/Career-Guides/Army-MOS', 'Army 68W guide'),
```

4. Save the file
5. Test with a sample file

### Regular Expression Resources
- [Regex101](https://regex101.com/) - Test patterns online
- [Regex Cheat Sheet](https://www.rexegg.com/regex-quickstart.html)

## Advanced Usage

### Command Line Options (Future Enhancement)

Currently, the script runs interactively. Future versions may support:
```bash
# Dry run (show what would happen without moving files)
python organize-files.py --dry-run

# Silent mode (no prompts)
python organize-files.py --silent

# Specific folder only
python organize-files.py --folder 01-Blog-Content
```

### Batch Processing from Command Line

Process multiple INBOX folders:
```bash
# Copy files from Downloads
xcopy C:\Users\YourName\Downloads\*.md S:\Military-Toolkit-Content-Library\00-INBOX\ /Y

# Organize
python organize-files.py

# Clean up Downloads
del C:\Users\YourName\Downloads\*.md
```

Save this as `batch-organize.bat` for one-click processing.

## FAQ

**Q: Can I organize files from multiple browser sessions?**
A: Yes! Drop all files in INBOX and run once. The script handles any number of files.

**Q: What if a file matches multiple patterns?**
A: The first matching pattern wins. Patterns are ordered from specific to general.

**Q: Can I undo an organization?**
A: Yes, manually move files back. Or check `organize-log.txt` for the source location.

**Q: Does it work on Mac/Linux?**
A: Yes! Use `python organize-files.py` instead of the .bat file.

**Q: Can it organize subfolders in INBOX?**
A: No, only files directly in INBOX. Move files to root of INBOX first.

**Q: What happens to README.md in INBOX?**
A: It's ignored. Only content files are processed.

## Getting Help

**Check these resources:**
1. This file (USAGE-INSTRUCTIONS.md)
2. Main README (00-README-START-HERE.md)
3. Individual folder README files
4. `organize-log.txt` after each run

**Still stuck?**
- Check the GitHub issues for similar problems
- Review the Python script comments
- Test with simple filenames first

## Summary

**Basic Workflow:**
1. Generate content → Download files
2. Move files to `00-INBOX/`
3. Double-click `organize-files.bat`
4. Review results in `organize-log.txt`
5. Handle any unmatched files

**Remember:**
- Consistent naming = automatic organization
- Batch processing is efficient
- Review logs to verify correctness
- Keep INBOX empty between runs

---

**Last Updated:** 2025-11-10
**Version:** 1.0

*For more information, see 00-README-START-HERE.md*
