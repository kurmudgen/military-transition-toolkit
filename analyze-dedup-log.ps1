$csv = Import-Csv 'C:\Users\Jacob\Documents\military-transition-app\deduplication-log.csv'
$totalSize = ($csv | Measure-Object -Property Size -Sum).Sum

Write-Host "=== DEDUPLICATION RESULTS ===" -ForegroundColor Cyan
Write-Host "Total files deleted: $($csv.Count)"
Write-Host "Total space saved: $([math]::Round($totalSize / 1MB, 2)) MB`n"

Write-Host "=== BREAKDOWN BY FOLDER ===" -ForegroundColor Yellow
$byFolder = $csv | Group-Object {
    $parts = $_.DeletedFrom.Split('\')
    if ($parts.Count -gt 1) { $parts[1] } else { "Unknown" }
} | Sort-Object Count -Descending

$byFolder | Format-Table @{Label="Folder"; Expression={$_.Name}}, @{Label="Files Deleted"; Expression={$_.Count}}
