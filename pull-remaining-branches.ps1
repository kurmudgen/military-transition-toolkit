# Pull remaining branches with blog content
$branches = @(
    @{Name="claude/military-career-blog-posts-011CUyp2Y2UKQbuL3WgvWmAw"; Folder="01-Blog-Posts"},
    @{Name="claude/seo-blog-posts-military-transition-011CUymwjNDjne1xtesn1Nrg"; Folder="01-Blog-Posts"},
    @{Name="claude/veteran-benefits-blog-series-011CUynt5RUhFkukGT4wsysP"; Folder="01-Blog-Posts"},
    @{Name="claude/veteran-benefits-guides-a-m-011CUzbm6dw9Cry4F4t8SWHE"; Folder="08-State-Veterans-Benefits-Guides"},
    @{Name="claude/veteran-seo-blog-posts-011CUynuDgLs2vv6ViUQvnyT"; Folder="01-Blog-Posts"},
    @{Name="claude/write-5-seo-blog-posts-011CUypSwBAwyaRJsSve9gYV"; Folder="01-Blog-Posts"}
)

$totalNewFiles = 0
$existingDestination = "S:\Military-Toolkit-Content-Library"

foreach ($branchInfo in $branches) {
    $branch = $branchInfo.Name
    $destFolder = Join-Path $existingDestination $branchInfo.Folder

    Write-Host "`n=== Processing: $branch ===" -ForegroundColor Cyan

    git checkout "origin/$branch" 2>&1 | Out-Null

    # Find new content files
    $contentFiles = @()

    # Check src/content/blog
    if (Test-Path "src\content\blog") {
        $contentFiles += Get-ChildItem "src\content\blog" -Filter "*.md" -File
    }

    # Check content/blog
    if (Test-Path "content\blog") {
        $contentFiles += Get-ChildItem "content\blog" -Filter "*.md" -File
    }

    Write-Host "Found $($contentFiles.Count) content files" -ForegroundColor Yellow

    if ($contentFiles.Count -gt 0) {
        # Copy files that don't already exist in destination
        $newFiles = 0
        foreach ($file in $contentFiles) {
            $destPath = Join-Path $destFolder $file.Name
            if (-not (Test-Path $destPath)) {
                Copy-Item -Path $file.FullName -Destination $destPath -Force
                $newFiles++
            }
        }

        Write-Host "  Copied $newFiles new files to $($branchInfo.Folder)" -ForegroundColor Green
        $totalNewFiles += $newFiles
    }
}

git checkout main 2>&1 | Out-Null

Write-Host "`n=== COMPLETE ===" -ForegroundColor Green
Write-Host "Total new files copied: $totalNewFiles"
