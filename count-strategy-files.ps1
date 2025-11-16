$files = Get-ChildItem 'S:\Military-Toolkit-Content-Library\15-Strategic-Plans\strategy' -Recurse -File -Filter '*.md'
$totalSize = ($files | Measure-Object -Property Length -Sum).Sum
$totalLines = 0

foreach ($file in $files) {
    $lines = (Get-Content $file.FullName | Measure-Object -Line).Lines
    $totalLines += $lines
}

Write-Host "=== STRATEGIC PLANS COPY COMPLETE ===" -ForegroundColor Green
Write-Host ""
Write-Host "Total files: $($files.Count)"
Write-Host "Total size: $([math]::Round($totalSize / 1KB, 2)) KB"
Write-Host "Total lines: $totalLines"
Write-Host ""
Write-Host "Files copied:" -ForegroundColor Cyan
$files | Select-Object Name, @{Name="Size (KB)";Expression={[math]::Round($_.Length / 1KB, 2)}} | Format-Table -AutoSize
