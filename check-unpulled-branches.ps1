# Check all branches for unpulled content
$branches = @(
    "claude/military-career-blog-posts-011CUyp2Y2UKQbuL3WgvWmAw",
    "claude/seo-blog-posts-military-transition-011CUymwjNDjne1xtesn1Nrg",
    "claude/veteran-benefits-blog-series-011CUynt5RUhFkukGT4wsysP",
    "claude/veteran-benefits-guides-a-m-011CUzbm6dw9Cry4F4t8SWHE",
    "claude/veteran-seo-blog-posts-011CUynuDgLs2vv6ViUQvnyT",
    "claude/write-5-seo-blog-posts-011CUypSwBAwyaRJsSve9gYV",
    "claude/veteran-transition-case-studies-011CV1fff6c7R2nrBQQxyAuM"
)

$unpulledContent = @()

foreach ($branch in $branches) {
    Write-Host "`n=== Checking: $branch ===" -ForegroundColor Cyan

    git checkout "origin/$branch" 2>&1 | Out-Null

    # Get commit message
    $commitMsg = git log --oneline -1
    Write-Host "Latest commit: $commitMsg" -ForegroundColor Yellow

    # Count content files
    $mdFiles = (Get-ChildItem -Path . -Filter "*.md" -Recurse -File | Where-Object {
        $_.FullName -notlike "*\.git\*" -and
        $_.FullName -notlike "*\node_modules\*" -and
        $_.FullName -notlike "*\.claude\*" -and
        ($_.FullName -like "*\content\blog\*" -or $_.FullName -like "*\src\content\blog\*" -or $_.FullName -like "*case-studies*")
    }).Count

    $txtFiles = (Get-ChildItem -Path . -Filter "*.txt" -Recurse -File | Where-Object {
        $_.FullName -notlike "*\.git\*" -and
        $_.FullName -notlike "*\node_modules\*"
    }).Count

    $csvFiles = (Get-ChildItem -Path . -Filter "*.csv" -Recurse -File | Where-Object {
        $_.FullName -notlike "*\.git\*"
    }).Count

    $totalContent = $mdFiles + $txtFiles + $csvFiles

    if ($totalContent -gt 0) {
        Write-Host "  Found: $mdFiles MD, $txtFiles TXT, $csvFiles CSV = $totalContent total" -ForegroundColor Green

        $unpulledContent += [PSCustomObject]@{
            Branch = $branch
            MDFiles = $mdFiles
            TXTFiles = $txtFiles
            CSVFiles = $csvFiles
            Total = $totalContent
            CommitMsg = $commitMsg
        }
    } else {
        Write-Host "  No content files found" -ForegroundColor Gray
    }
}

git checkout main 2>&1 | Out-Null

Write-Host "`n=== SUMMARY ===" -ForegroundColor Green
Write-Host "Branches with unpulled content: $($unpulledContent.Count)"
$unpulledContent | Format-Table -AutoSize

Write-Host "`nTotal unpulled files: $(($unpulledContent | Measure-Object -Property Total -Sum).Sum)"
