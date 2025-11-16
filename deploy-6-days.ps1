# 6-Day Blog Deployment Script (Nov 15-20)
# Deploy 5 posts per day: 1 State + 1 VA + 2 Career + 1 How-To

$sourcePath = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"
$destPath = "C:\Users\Jacob\Documents\military-transition-app\content\blog"
$logFile = "S:\blog-deployment-log.txt"

# Initialize log
"=" * 80 | Out-File $logFile
"7-DAY BLOG DEPLOYMENT LOG" | Add-Content $logFile
"Started: $(Get-Date)" | Add-Content $logFile
"=" * 80 | Add-Content $logFile
"" | Add-Content $logFile

# Deployment plan for each day
$deploymentPlan = @(
    @{
        Date = "2025-11-15"
        Posts = @(
            @{ Path = "State-Guides\Best-Cities\ca-best-cities-veterans-2025.md"; Category = "State (CA)" },
            @{ Path = "VA-Disability-Guides\Claims-Process\cp-exam-ptsd-what-to-expect-preparation.md"; Category = "VA (PTSD)" },
            @{ Path = "Career-Guides\Army-MOS\11b-infantry-civilian-career-guide.md"; Category = "Career (Army 11B)" },
            @{ Path = "Career-Guides\Navy-Ratings\hm-hospital-corpsman-civilian-career-guide.md"; Category = "Career (Navy HM)" },
            @{ Path = "Additional-Posts\Career-Transition\federal-resume-veterans-guide.md"; Category = "How-To (Resume)" }
        )
    },
    @{
        Date = "2025-11-16"
        Posts = @(
            @{ Path = "State-Guides\State-Benefits\texas-veteran-benefits-2025.md"; Category = "State (TX)" },
            @{ Path = "VA-Disability-Guides\Claims-Process\cp-exam-tinnitus-hearing-loss-guide.md"; Category = "VA (Tinnitus)" },
            @{ Path = "Career-Guides\Coast-Guard-Ratings\coastguard-it-information-systems-technician-civilian-career-guide.md"; Category = "Career (USCG IT)" },
            @{ Path = "Career-Guides\Marines-MOS\0311-rifleman-civilian-career-guide.md"; Category = "Career (USMC 0311)" },
            @{ Path = "Additional-Posts\How-To-Guides\how-to-apply-federal-jobs-usajobs-guide.md"; Category = "How-To (Federal Jobs)" }
        )
    },
    @{
        Date = "2025-11-17"
        Posts = @(
            @{ Path = "State-Guides\Best-Cities\az-best-cities-veterans-2025.md"; Category = "State (AZ)" },
            @{ Path = "VA-Disability-Guides\Claims-Process\cp-exam-sleep-apnea-dbq-questions.md"; Category = "VA (Sleep Apnea)" },
            @{ Path = "Career-Guides\Air-Force-AFSC\air-force-afsc-1a0x1-civilian-career-guide.md"; Category = "Career (USAF 1A0X1)" },
            @{ Path = "Career-Guides\Navy-Ratings\it-information-systems-technician-civilian-career-guide.md"; Category = "Career (Navy IT)" },
            @{ Path = "Additional-Posts\How-To-Guides\how-to-negotiate-salary-veterans-first-job.md"; Category = "How-To (Salary)" }
        )
    },
    @{
        Date = "2025-11-18"
        Posts = @(
            @{ Path = "State-Guides\Best-Cities\co-best-cities-veterans-2025.md"; Category = "State (CO)" },
            @{ Path = "VA-Disability-Guides\Claims-Process\cp-exam-back-pain-musculoskeletal-guide.md"; Category = "VA (Back Pain)" },
            @{ Path = "Career-Guides\Coast-Guard-Ratings\coast-guard-bm-boatswains-mate-civilian-career-guide.md"; Category = "Career (USCG BM)" },
            @{ Path = "Career-Guides\Marines-MOS\0621-field-radio-operator-civilian-career-guide.md"; Category = "Career (USMC 0621)" },
            @{ Path = "Additional-Posts\Career-Transition\e7-resume-guide.md"; Category = "How-To (E7 Resume)" }
        )
    },
    @{
        Date = "2025-11-19"
        Posts = @(
            @{ Path = "State-Guides\Best-Cities\ga-best-cities-veterans-2025.md"; Category = "State (GA)" },
            @{ Path = "VA-Disability-Guides\Musculoskeletal\va-rating-shoulder-pain-rotator-cuff.md"; Category = "VA (Shoulder)" },
            @{ Path = "Career-Guides\Air-Force-AFSC\air-force-afsc-1a1x1-civilian-career-guide.md"; Category = "Career (USAF 1A1X1)" },
            @{ Path = "Career-Guides\Navy-Ratings\yn-yeoman-civilian-career-guide.md"; Category = "Career (Navy YN)" },
            @{ Path = "Additional-Posts\How-To-Guides\how-to-find-remote-work-veterans.md"; Category = "How-To (Remote Work)" }
        )
    },
    @{
        Date = "2025-11-20"
        Posts = @(
            @{ Path = "State-Guides\Best-Cities\hi-best-cities-veterans-2025.md"; Category = "State (HI)" },
            @{ Path = "VA-Disability-Guides\Musculoskeletal\va-rating-migraines-headaches-guide.md"; Category = "VA (Migraines)" },
            @{ Path = "Career-Guides\Coast-Guard-Ratings\coast-guard-em-electricians-mate-civilian-career-guide.md"; Category = "Career (USCG EM)" },
            @{ Path = "Career-Guides\Navy-Ratings\ls-logistics-specialist-civilian-career-guide.md"; Category = "Career (Navy LS)" },
            @{ Path = "Additional-Posts\How-To-Guides\how-to-dress-civilian-job-interview-veterans.md"; Category = "How-To (Interview)" }
        )
    }
)

Write-Host "=== 6-DAY BLOG DEPLOYMENT SCRIPT ===" -ForegroundColor Cyan
Write-Host ""

foreach ($day in $deploymentPlan) {
    $deployDate = $day.Date
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
    Write-Host "DEPLOYING FOR: $deployDate" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
    Write-Host ""

    $dayLog = @()
    $dayLog += "DATE: $deployDate"
    $dayLog += "=" * 60

    foreach ($post in $day.Posts) {
        $sourceFile = Join-Path $sourcePath $post.Path

        if (Test-Path $sourceFile) {
            $fileName = Split-Path $sourceFile -Leaf
            $destFile = Join-Path $destPath $fileName

            # Copy file
            Copy-Item -Path $sourceFile -Destination $destFile -Force

            # Update date in frontmatter
            $content = Get-Content $destFile -Raw
            $content = $content -replace 'date:\s*"[^"]*"', "date: `"$deployDate`""
            $content = $content -replace 'date:\s*[^\r\n]*', "date: `"$deployDate`""
            $content | Set-Content $destFile -NoNewline

            Write-Host "  ✅ $($post.Category)" -ForegroundColor Green
            Write-Host "     $fileName" -ForegroundColor Gray

            $dayLog += "  ✅ $($post.Category): $fileName"
        } else {
            Write-Host "  ❌ $($post.Category) - FILE NOT FOUND" -ForegroundColor Red
            Write-Host "     $sourceFile" -ForegroundColor Gray
            $dayLog += "  ❌ $($post.Category): FILE NOT FOUND - $sourceFile"
        }
    }

    Write-Host ""

    # Add to log file
    $dayLog | Add-Content $logFile
    "" | Add-Content $logFile
}

Write-Host "=== DEPLOYMENT COMPLETE ===" -ForegroundColor Green
Write-Host "Log file: $logFile" -ForegroundColor White
Write-Host ""
Write-Host "Next step: Review files, then run git commands to deploy" -ForegroundColor Yellow
