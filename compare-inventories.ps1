# Compare GitHub and S: drive blog inventories

$githubFiles = Get-Content 'S:\github-blog-inventory.txt' | Where-Object { $_ -ne '' }
$localFiles = Get-Content 'S:\local-blog-inventory.txt' | Where-Object { $_ -ne '' }

Write-Host "=== Blog Inventory Comparison ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub blog files: $($githubFiles.Count)" -ForegroundColor Yellow
Write-Host "S: drive blog files: $($localFiles.Count)" -ForegroundColor Yellow
Write-Host ""

# Find files in GitHub but not in S: drive
$missing = @()
foreach ($file in $githubFiles) {
    if ($localFiles -notcontains $file) {
        $missing += $file
    }
}

if ($missing.Count -gt 0) {
    Write-Host "⚠️  Files in GitHub but NOT in S: drive:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
    Write-Host ""
    Write-Host "Missing files count: $($missing.Count)" -ForegroundColor Red
} else {
    Write-Host "✅ All GitHub files exist in S: drive" -ForegroundColor Green
}

Write-Host ""
Write-Host "GitHub files list:" -ForegroundColor Cyan
$githubFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }
