# Advanced Blog File Organization Script
# Intelligently categorizes remaining unsorted files

$rootFolder = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"
$logFile = "S:\Military-Toolkit-Content-Library\advanced-organization-log.txt"

Write-Host "=== Advanced Blog File Organization ===" -ForegroundColor Cyan
Write-Host ""

# Initialize log
"Advanced Blog File Organization - $(Get-Date)" | Out-File $logFile
"" | Add-Content $logFile

# Get all files in root directory (excluding README.md)
$files = Get-ChildItem -Path $rootFolder -File | Where-Object { $_.Name -ne "README.md" }

Write-Host "Found $($files.Count) files to categorize" -ForegroundColor Yellow
Write-Host ""

$movedCount = 0
$skippedCount = 0
$foldersCreated = @()

function Create-FolderIfNeeded {
    param($path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        $script:foldersCreated += $path.Replace("$rootFolder\", "")
        Write-Host "  Created: $($path.Replace($rootFolder + '\', ''))" -ForegroundColor Cyan
    }
}

function Move-FileToCategory {
    param($file, $category, $reason)

    $fullDestPath = Join-Path $rootFolder $category
    Create-FolderIfNeeded $fullDestPath

    try {
        Move-Item -Path $file.FullName -Destination $fullDestPath -Force
        $script:movedCount++
        Write-Host "  $($file.Name)" -ForegroundColor Green
        Write-Host "    -> $category" -ForegroundColor Gray
        Write-Host "    Reason: $reason" -ForegroundColor DarkGray

        "Moved: $($file.Name)" | Add-Content $logFile
        "  -> $category" | Add-Content $logFile
        "  Reason: $reason" | Add-Content $logFile
        "" | Add-Content $logFile
        return $true
    } catch {
        Write-Host "  ERROR: $($file.Name) - $($_.Exception.Message)" -ForegroundColor Red
        "ERROR: $($file.Name) - $($_.Exception.Message)" | Add-Content $logFile
        return $false
    }
}

Write-Host "Categorizing files..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    $fileName = $file.Name.ToLower()
    $moved = $false

    # ========================================
    # CAREER-GUIDES PATTERNS
    # ========================================

    # MOS-to-Civilian-Career pattern (e.g., "11b-to-executive-protection", "68w-to-nurse")
    if ($fileName -match '\d{2}[a-z]-to-.*\.md$' -or $fileName -match '\d{4}-to-.*\.md$') {
        $moved = Move-FileToCategory $file "Career-Guides\MOS-to-Civilian-Career" "MOS transition path"
    }
    # Industry-Transitions pattern (e.g., "military-to-cybersecurity", "transition-military-healthcare")
    elseif ($fileName -match 'military-to-.*\.md$' -or $fileName -match 'transition-.*-military-.*\.md$' -or $fileName -match 'how-to-transition-military-.*\.md$') {
        $moved = Move-FileToCategory $file "Career-Guides\Industry-Transitions" "Industry transition guide"
    }
    # Career-Path-Guides pattern
    elseif ($fileName -match 'career-path.*\.md$' -or $fileName -match 'career-options.*\.md$' -or $fileName -match 'jobs-for-.*\.md$') {
        $moved = Move-FileToCategory $file "Career-Guides\Career-Path-Guides" "Career path exploration"
    }
    # Skill-Translation pattern
    elseif ($fileName -match 'translate.*\.md$' -or $fileName -match 'skills-to-civilian.*\.md$' -or $fileName -match 'military-resume.*\.md$' -or $fileName -match 'how-to-translate.*\.md$') {
        $moved = Move-FileToCategory $file "Career-Guides\Skill-Translation" "Skills translation guide"
    }

    # ========================================
    # STATE-GUIDES PATTERNS
    # ========================================

    # State-Comparisons pattern (e.g., "california-vs-texas", "best-states-for")
    elseif ($fileName -match '.*-vs-.*-veterans.*\.md$' -or $fileName -match 'best-.*-states.*veterans.*\.md$' -or $fileName -match '.*comparison.*veterans.*\.md$') {
        $moved = Move-FileToCategory $file "State-Guides\State-Comparisons" "State comparison analysis"
    }
    # Relocation-Guides pattern
    elseif ($fileName -match 'relocat.*\.md$' -or $fileName -match 'moving-to-.*\.md$' -or $fileName -match 'pcs-.*\.md$') {
        $moved = Move-FileToCategory $file "State-Guides\Relocation-Guides" "Relocation guide"
    }
    # State-Specific-Jobs pattern
    elseif ($fileName -match '.*-state.*-jobs.*\.md$' -or $fileName -match '.*jobs-in-.*\.md$') {
        $moved = Move-FileToCategory $file "State-Guides\State-Specific-Jobs" "State employment guide"
    }
    # Cost-of-Living pattern
    elseif ($fileName -match 'cost-of-living.*\.md$' -or $fileName -match 'affordability.*\.md$' -or $fileName -match 'housing-costs.*\.md$') {
        $moved = Move-FileToCategory $file "State-Guides\Cost-of-Living" "Cost of living analysis"
    }
    # Hidden benefits by state
    elseif ($fileName -match '.*-hidden.*benefits.*\.md$') {
        $moved = Move-FileToCategory $file "State-Guides\State-Benefits" "Hidden state benefits"
    }

    # ========================================
    # VA-DISABILITY-GUIDES PATTERNS
    # ========================================

    # Secondary-Conditions pattern
    elseif ($fileName -match 'secondary-to-.*\.md$' -or $fileName -match '.*-secondary-.*\.md$' -or $fileName -match 'nexus-.*\.md$' -or $fileName -match 'claiming-.*-secondary.*\.md$') {
        $moved = Move-FileToCategory $file "VA-Disability-Guides\Secondary-Conditions" "Secondary condition guide"
    }
    # Claims-Process pattern
    elseif ($fileName -match 'how-to-.*-claim.*\.md$' -or $fileName -match '.*-appeal.*\.md$' -or $fileName -match '.*denied.*claim.*\.md$' -or $fileName -match 'cp-exam-.*\.md$' -or $fileName -match 'common-reasons.*denied.*\.md$') {
        $moved = Move-FileToCategory $file "VA-Disability-Guides\Claims-Process" "Claims filing/appeals process"
    }
    # Rating-Increases pattern
    elseif ($fileName -match 'increase.*rating.*\.md$' -or $fileName -match 'higher-rating.*\.md$' -or $fileName -match '.*-to-100.*rating.*\.md$') {
        $moved = Move-FileToCategory $file "VA-Disability-Guides\Rating-Increases" "Rating increase strategy"
    }
    # Specific condition ratings
    elseif ($fileName -match 'va-rating-.*\.md$' -or $fileName -match '.*-va-rating.*\.md$') {
        # Try to categorize by condition type
        if ($fileName -match 'back|spine|knee|shoulder|neck|joint|muscle|foot|ankle|hip') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Musculoskeletal" "Musculoskeletal condition"
        }
        elseif ($fileName -match 'ptsd|depression|anxiety|mental|stress|cognitive') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Mental-Health" "Mental health condition"
        }
        elseif ($fileName -match 'sleep|apnea|breathing|asthma|lung') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Respiratory" "Respiratory condition"
        }
        elseif ($fileName -match 'heart|blood|pressure|hypertension|cardiac') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Cardiovascular" "Cardiovascular condition"
        }
        elseif ($fileName -match 'ibs|gerd|stomach|digestive|bowel') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Gastrointestinal" "Gastrointestinal condition"
        }
        elseif ($fileName -match 'tinnitus|hearing|vision|eye') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Sensory" "Sensory condition"
        }
        else {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Specific-Conditions" "Specific VA condition"
        }
    }
    # Secondary conditions guide
    elseif ($fileName -match 'va-secondary-conditions.*\.md$') {
        $moved = Move-FileToCategory $file "VA-Disability-Guides\Secondary-Conditions" "Secondary conditions overview"
    }

    # ========================================
    # ADDITIONAL-POSTS PATTERNS
    # ========================================

    # Timelines-Checklists pattern (e.g., "12-months-before", "90-day-checklist")
    elseif ($fileName -match '\d+-(month|day|week).*\.md$' -or $fileName -match '.*-timeline.*\.md$' -or $fileName -match '.*checklist.*\.md$' -or $fileName -match 'first-.*-(day|week|month|year).*\.md$') {
        $moved = Move-FileToCategory $file "Additional-Posts\Timelines-Checklists" "Timeline/checklist guide"
    }
    # How-To-Guides pattern
    elseif ($fileName -match '^how-to-.*\.md$') {
        # Further categorize how-to guides
        if ($fileName -match 'how-to-.*-claim.*' -or $fileName -match 'how-to-appeal.*' -or $fileName -match 'how-to-.*-va-.*') {
            $moved = Move-FileToCategory $file "VA-Disability-Guides\Claims-Process" "VA claims how-to"
        }
        elseif ($fileName -match 'how-to-transition.*' -or $fileName -match 'how-to-become.*') {
            $moved = Move-FileToCategory $file "Career-Guides\Industry-Transitions" "Career transition how-to"
        }
        elseif ($fileName -match 'how-to-use-.*-benefit.*' -or $fileName -match 'how-to-.*-gi-bill.*' -or $fileName -match 'how-to-.*-va-loan.*') {
            $moved = Move-FileToCategory $file "Additional-Posts\Benefits-Planning" "Benefits usage guide"
        }
        else {
            $moved = Move-FileToCategory $file "Additional-Posts\How-To-Guides" "General how-to guide"
        }
    }
    # Resources-Tools pattern
    elseif ($fileName -match 'resources.*\.md$' -or $fileName -match 'database.*\.md$' -or $fileName -match 'list-of-.*\.md$' -or $fileName -match '.*\.csv$') {
        $moved = Move-FileToCategory $file "Additional-Posts\Resources-Tools" "Resource/tool list"
    }
    # Email-Sequences pattern
    elseif ($fileName -match 'email-.*\.txt$' -or $fileName -match '.*-sequence.*\.txt$' -or $fileName -match 'drip-.*\.txt$') {
        $moved = Move-FileToCategory $file "Additional-Posts\Email-Sequences" "Email marketing content"
    }
    # Success-Stories pattern
    elseif ($fileName -match 'success.*story.*\.md$' -or $fileName -match 'case-study.*\.md$' -or $fileName -match 'testimonial.*\.md$') {
        $moved = Move-FileToCategory $file "Additional-Posts\Success-Stories" "Success story/case study"
    }
    # Salary/compensation analysis
    elseif ($fileName -match '.*-salaries-.*\.md$' -and $fileName -notmatch 'certifications') {
        $moved = Move-FileToCategory $file "Additional-Posts\Skills-Certifications" "Salary analysis"
    }
    # General transition content
    elseif ($fileName -match 'transition.*\.md$' -or $fileName -match 'civilian-.*\.md$' -or $fileName -match 'veteran-.*\.md$') {
        $moved = Move-FileToCategory $file "Additional-Posts\General-Transition" "General transition content"
    }

    # Skip if not categorized
    if (-not $moved) {
        $skippedCount++
        Write-Host "  Skipped: $($file.Name)" -ForegroundColor Yellow
        "Skipped: $($file.Name) - No matching pattern" | Add-Content $logFile
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "  Files moved: $movedCount" -ForegroundColor Green
Write-Host "  Files skipped: $skippedCount" -ForegroundColor Yellow
Write-Host ""

if ($foldersCreated.Count -gt 0) {
    Write-Host "=== New Folders Created ===" -ForegroundColor Cyan
    $foldersCreated | Sort-Object -Unique | ForEach-Object {
        Write-Host "  $_" -ForegroundColor White
    }
    Write-Host ""
}

# Summary to log
"" | Add-Content $logFile
"=== SUMMARY ===" | Add-Content $logFile
"Files moved: $movedCount" | Add-Content $logFile
"Files skipped: $skippedCount" | Add-Content $logFile
"New folders created: $($foldersCreated.Count)" | Add-Content $logFile
"" | Add-Content $logFile
"Folders created:" | Add-Content $logFile
$foldersCreated | Sort-Object -Unique | ForEach-Object {
    "  $_" | Add-Content $logFile
}
"" | Add-Content $logFile
"Completed: $(Get-Date)" | Add-Content $logFile

Write-Host "Advanced organization complete!" -ForegroundColor Green
Write-Host "Log file: $logFile" -ForegroundColor White
