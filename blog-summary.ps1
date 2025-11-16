# Blog Organization Summary
$rootFolder = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"

Write-Host "=== Blog Organization Summary ===" -ForegroundColor Cyan
Write-Host ""

# Count root files
$rootFiles = (Get-ChildItem $rootFolder -File | Where-Object { $_.Name -ne "README.md" }).Count
Write-Host "Files remaining in root (unsorted): $rootFiles" -ForegroundColor Yellow
Write-Host ""

# Show organized folders
Write-Host "Organized Folders:" -ForegroundColor Green
Write-Host ""

Get-ChildItem $rootFolder -Directory | ForEach-Object {
    $folderName = $_.Name
    $fullPath = $_.FullName

    # Count files in this folder and subfolders
    $fileCount = (Get-ChildItem $fullPath -File -Recurse).Count

    Write-Host "  $folderName ($fileCount files)" -ForegroundColor White

    # Show subfolders
    Get-ChildItem $fullPath -Directory | ForEach-Object {
        $subFolderName = $_.Name
        $subFileCount = (Get-ChildItem $_.FullName -File -Recurse).Count
        Write-Host "    ├─ $subFolderName ($subFileCount files)" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "Organization complete!" -ForegroundColor Green
