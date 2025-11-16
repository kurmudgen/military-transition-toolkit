# Pull all unpulled branches to S: drive INBOX
$inbox = "S:\Military-Toolkit-Content-Library\00-INBOX"
$repo = "C:\Users\Jacob\Documents\military-transition-app"

# List of all branches to check
$branches = @(
    "claude/create-b2b-partnership-materials-011CV1fmnfhXGCzGAFWFRhk9",
    "claude/generate-250-veteran-seo-posts-011CV1fonQdBSujgFP6mMSuX",
    "claude/veteran-benefits-guides-states-n-z-011CV1eeJm6ZC7z6gM3npUub",
    "claude/veteran-podcast-scripts-100-011CV1fQdhr6REupTWEG2wNx",
    "claude/military-career-blog-posts-011CUyp2Y2UKQbuL3WgvWmAw",
    "claude/veteran-benefits-blog-series-011CUynt5RUhFkukGT4wsysP",
    "claude/veteran-resource-databases-011CUzbZymdwi532xqTUXcDQ",
    "claude/veteran-resource-databases-011CV1cxatVGkGSAQnv93apY",
    "claude/veteran-seo-blog-posts-011CUynuDgLs2vv6ViUQvnyT",
    "claude/write-5-seo-blog-posts-011CUypSwBAwyaRJsSve9gYV"
)

$totalFiles = 0

foreach ($branch in $branches) {
    Write-Host "`n=== Processing: $branch ===" -ForegroundColor Cyan

    # Checkout branch
    git checkout "origin/$branch" 2>&1 | Out-Null

    # Count files (exclude git files and node_modules)
    $files = Get-ChildItem -Path $repo -File -Recurse | Where-Object {
        $_.FullName -notlike "*\.git\*" -and
        $_.FullName -notlike "*\node_modules\*" -and
        $_.FullName -notlike "*\.claude\*" -and
        ($_.Extension -eq ".md" -or $_.Extension -eq ".csv" -or $_.Extension -eq ".txt")
    }

    $fileCount = $files.Count
    Write-Host "Found $fileCount content files" -ForegroundColor Yellow

    if ($fileCount -gt 0) {
        # Copy files to INBOX
        foreach ($file in $files) {
            $relativePath = $file.FullName.Replace($repo + "\", "")

            # Skip if it's in standard src/ directories
            if ($relativePath -like "src\*" -or $relativePath -like "public\*") {
                continue
            }

            # Determine destination
            if ($relativePath -like "content\blog\*") {
                # Skip - already in repo
                continue
            } elseif ($file.DirectoryName -ne $repo) {
                # File is in a subdirectory - preserve structure
                $subDir = Split-Path $relativePath -Parent
                $destDir = Join-Path $inbox $subDir

                if (-not (Test-Path $destDir)) {
                    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
                }

                $destPath = Join-Path $destDir $file.Name
            } else {
                # File is in root - copy directly to INBOX
                $destPath = Join-Path $inbox $file.Name
            }

            # Check if file already exists
            if (-not (Test-Path $destPath)) {
                Copy-Item -Path $file.FullName -Destination $destPath -Force
                Write-Host "  Copied: $($file.Name)" -ForegroundColor Green
                $totalFiles++
            } else {
                Write-Host "  Exists: $($file.Name)" -ForegroundColor Gray
            }
        }
    }
}

# Return to main branch
git checkout main 2>&1 | Out-Null

Write-Host "`n=== COMPLETE ===" -ForegroundColor Green
Write-Host "Total new files copied to INBOX: $totalFiles"
