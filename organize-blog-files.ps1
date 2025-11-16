# Organize Blog Files Script
# Moves files from root into appropriate subfolders

$rootFolder = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"
$logFile = "S:\Military-Toolkit-Content-Library\blog-organization-log.txt"

Write-Host "=== Blog File Organization Script ===" -ForegroundColor Cyan
Write-Host ""

# Initialize log
"Blog File Organization - $(Get-Date)" | Out-File $logFile

# Get all files in root directory
$files = Get-ChildItem -Path $rootFolder -File | Where-Object { $_.Name -ne "README.md" }

Write-Host "Found $($files.Count) files to organize" -ForegroundColor Yellow
Write-Host ""

# Define categorization rules
$movedCount = 0
$skippedCount = 0

foreach ($file in $files) {
    $fileName = $file.Name
    $destFolder = $null

    # Marines MOS (4-digit codes starting with 0-9)
    if ($fileName -match '^\d{4}-.*-civilian-career-guide\.md$') {
        $destFolder = "Career-Guides\Marines-MOS"
    }
    # Army MOS (e.g., 11b, 25b, 35f, 68w, 92y)
    elseif ($fileName -match '^\d{2}[a-z]-.*-civilian-career-guide\.md$') {
        $destFolder = "Career-Guides\Army-MOS"
    }
    # Air Force AFSC (e.g., 1a0x1, 1a1x1)
    elseif ($fileName -match '^air-force-afsc-\d[a-z]\d[a-z]\d-.*\.md$') {
        $destFolder = "Career-Guides\Air-Force-AFSC"
    }
    # Navy Ratings (2-letter codes: ab, ac, ad, ae, etc.)
    elseif ($fileName -match '^[a-z]{2,3}-.*-civilian-career-guide\.md$' -and $fileName -notmatch '^coast-guard-') {
        $destFolder = "Career-Guides\Navy-Ratings"
    }
    # Coast Guard ratings
    elseif ($fileName -match '^coast-?guard-.*-civilian-career-guide\.md$') {
        $destFolder = "Career-Guides\Coast-Guard-Ratings"
    }
    # State guides - best cities
    elseif ($fileName -match '^[a-z]{2}-best-cities-veterans-\d{4}\.md$') {
        $destFolder = "State-Guides\Best-Cities"
    }
    # State guides - healthcare/education/jobs
    elseif ($fileName -match '^[a-z]{2}-veteran-healthcare-education-jobs\.md$') {
        $destFolder = "State-Guides\Healthcare-Education-Jobs"
    }
    # State guides - tax benefits
    elseif ($fileName -match '^[a-z]{2}-veteran-tax-benefits-\d{4}\.md$') {
        $destFolder = "State-Guides\Tax-Benefits"
    }
    # State guides - general state benefits
    elseif ($fileName -match '.*-veteran-benefits-\d{4}\.md$') {
        $destFolder = "State-Guides\State-Benefits"
    }
    # State guides - regional comparison
    elseif ($fileName -match '.*-veteran-benefits.*comparison\.md$' -or $fileName -match 'best-states-.*\.md') {
        $destFolder = "State-Guides\Regional-Comparisons"
    }
    # VA Disability - specific conditions
    elseif ($fileName -match '.*-va-rating.*guide\.md$' -or $fileName -match 'va-disability-rating-.*\.md$') {
        $destFolder = "VA-Disability-Guides\Specific-Conditions"
    }
    # VA Disability - general guides
    elseif ($fileName -match 'increase-va-disability.*\.md$' -or $fileName -match 'va-.*-guide\.md$') {
        $destFolder = "VA-Disability-Guides\General-Guides"
    }
    # Career transition guides
    elseif ($fileName -match 'military-.*-transition.*\.md$' -or $fileName -match '.*-resume-guide\.md$' -or $fileName -match 'federal-resume.*\.md$') {
        $destFolder = "Additional-Posts\Career-Transition"
    }
    # Benefits guides (TSP, retirement, etc.)
    elseif ($fileName -match 'tsp-.*\.md$' -or $fileName -match 'military-retirement.*\.md$' -or $fileName -match 'terminal-leave.*\.md$') {
        $destFolder = "Additional-Posts\Benefits-Planning"
    }
    # Lead magnets
    elseif ($fileName -match '^lead-magnet-.*\.md$') {
        $destFolder = "Additional-Posts\Lead-Magnets"
    }
    # Best companies for veterans
    elseif ($fileName -match '^best-companies-.*\.md$') {
        $destFolder = "Additional-Posts\Employer-Guides"
    }
    # Skills/certifications
    elseif ($fileName -match '.*-certifications.*\.md$' -or $fileName -match '.*-salaries-by-.*\.md$' -or $fileName -match 'military-skills-translator.*\.md$') {
        $destFolder = "Additional-Posts\Skills-Certifications"
    }
    # Salary negotiation
    elseif ($fileName -match '.*salary-negotiation.*\.md$') {
        $destFolder = "Additional-Posts\Career-Transition"
    }

    # Move the file if destination determined
    if ($destFolder) {
        $fullDestPath = Join-Path $rootFolder $destFolder

        # Create destination folder if it doesn't exist
        if (-not (Test-Path $fullDestPath)) {
            New-Item -ItemType Directory -Path $fullDestPath -Force | Out-Null
            Write-Host "  Created folder: $destFolder" -ForegroundColor Cyan
        }

        # Move file
        try {
            Move-Item -Path $file.FullName -Destination $fullDestPath -Force
            $movedCount++
            Write-Host "  Moved: $fileName -> $destFolder" -ForegroundColor Green
            "Moved: $fileName -> $destFolder" | Add-Content $logFile
        } catch {
            Write-Host "  ERROR moving $fileName : $($_.Exception.Message)" -ForegroundColor Red
            "ERROR: $fileName - $($_.Exception.Message)" | Add-Content $logFile
        }
    } else {
        $skippedCount++
        Write-Host "  Skipped (no category): $fileName" -ForegroundColor Yellow
        "Skipped (no category): $fileName" | Add-Content $logFile
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "  Files moved: $movedCount" -ForegroundColor Green
Write-Host "  Files skipped: $skippedCount" -ForegroundColor Yellow
Write-Host "  Log file: $logFile" -ForegroundColor White
Write-Host ""

# Summary to log
"" | Add-Content $logFile
"=== SUMMARY ===" | Add-Content $logFile
"Files moved: $movedCount" | Add-Content $logFile
"Files skipped: $skippedCount" | Add-Content $logFile
"Completed: $(Get-Date)" | Add-Content $logFile

Write-Host "Organization complete!" -ForegroundColor Green
