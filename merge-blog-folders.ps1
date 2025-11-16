# Merge blog folders and remove duplicates
# Combines 01-Blog-Content and 01-Blog-Posts into one folder

$sourceFolder = "S:\Military-Toolkit-Content-Library\01-Blog-Content"
$destFolder = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"
$logFile = "S:\Military-Toolkit-Content-Library\blog-merge-log.txt"

Write-Host "=== Blog Folder Merge Script ===" -ForegroundColor Cyan
Write-Host ""

# Initialize log
"Blog Folder Merge - $(Get-Date)" | Out-File $logFile

# Step 1: Copy files from 01-Blog-Content to 01-Blog-Posts
Write-Host "Step 1: Copying files from 01-Blog-Content to 01-Blog-Posts..." -ForegroundColor Yellow
$sourceFiles = Get-ChildItem -Path $sourceFolder -File -Recurse
$copiedCount = 0

foreach ($file in $sourceFiles) {
    $relativePath = $file.FullName.Substring($sourceFolder.Length)
    $destPath = Join-Path $destFolder $relativePath

    # Create directory if needed
    $destDir = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    # Copy file
    Copy-Item -Path $file.FullName -Destination $destPath -Force
    $copiedCount++
    Write-Host "  Copied: $($file.Name)" -ForegroundColor Green
    "Copied: $($file.FullName) -> $destPath" | Add-Content $logFile
}

Write-Host "  Total files copied: $copiedCount" -ForegroundColor Cyan
Write-Host ""

# Step 2: Find and remove duplicate files in 01-Blog-Posts
Write-Host "Step 2: Scanning for duplicate files (by hash)..." -ForegroundColor Yellow

$allFiles = Get-ChildItem -Path $destFolder -File -Recurse
$filesByHash = @{}
$duplicates = @()

Write-Host "  Calculating file hashes for $($allFiles.Count) files..." -ForegroundColor Gray

foreach ($file in $allFiles) {
    $hash = (Get-FileHash -Path $file.FullName -Algorithm MD5).Hash

    if ($filesByHash.ContainsKey($hash)) {
        # Duplicate found
        $duplicates += [PSCustomObject]@{
            Original = $filesByHash[$hash]
            Duplicate = $file.FullName
            Hash = $hash
            Size = $file.Length
        }
    } else {
        $filesByHash[$hash] = $file.FullName
    }
}

Write-Host ""
if ($duplicates.Count -gt 0) {
    Write-Host "  Found $($duplicates.Count) duplicate file(s):" -ForegroundColor Yellow

    foreach ($dup in $duplicates) {
        Write-Host "    Duplicate: $($dup.Duplicate)" -ForegroundColor Red
        Write-Host "      Same as: $($dup.Original)" -ForegroundColor Gray
        Write-Host "      Hash: $($dup.Hash), Size: $($dup.Size) bytes" -ForegroundColor Gray

        # Log duplicate
        "DUPLICATE FOUND:" | Add-Content $logFile
        "  File: $($dup.Duplicate)" | Add-Content $logFile
        "  Same as: $($dup.Original)" | Add-Content $logFile
        "  Hash: $($dup.Hash)" | Add-Content $logFile
        "" | Add-Content $logFile

        # Remove duplicate
        Remove-Item -Path $dup.Duplicate -Force
        Write-Host "      DELETED duplicate file" -ForegroundColor Green
        "  DELETED: $($dup.Duplicate)" | Add-Content $logFile
    }

    Write-Host ""
    Write-Host "  Removed $($duplicates.Count) duplicate file(s)" -ForegroundColor Cyan
} else {
    Write-Host "  No duplicate files found!" -ForegroundColor Green
    "No duplicates found" | Add-Content $logFile
}

Write-Host ""

# Step 3: Summary
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "  Files in 01-Blog-Posts: $($filesByHash.Count)" -ForegroundColor White
Write-Host "  Files copied from 01-Blog-Content: $copiedCount" -ForegroundColor White
Write-Host "  Duplicates removed: $($duplicates.Count)" -ForegroundColor White
Write-Host "  Log file: $logFile" -ForegroundColor White
Write-Host ""

# Summary to log
"" | Add-Content $logFile
"=== SUMMARY ===" | Add-Content $logFile
"Total unique files: $($filesByHash.Count)" | Add-Content $logFile
"Files copied: $copiedCount" | Add-Content $logFile
"Duplicates removed: $($duplicates.Count)" | Add-Content $logFile
"Completed: $(Get-Date)" | Add-Content $logFile

Write-Host "Merge complete! Check log at: $logFile" -ForegroundColor Green
